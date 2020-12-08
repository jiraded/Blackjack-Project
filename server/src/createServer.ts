import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UserModel } from './entities/User'
import { AppContext, Token } from './types'
import { createToken, sendToken, verifyToken } from './utils/token'
import { TypegooseMiddleware } from './utils/typegoose-middleware'

import { AuthResolvers } from './resolvers/AuthResolvers'
import { UserResolvers } from './resolvers/UserResolvers'
import { CardResolvers } from './resolvers/CardResolvers'
import { PlayResolvers } from './resolvers/PlayResolvers'
import { RunResolvers } from './resolvers/RunResolvers'

const refreshTokenTimeout = 4 * 60 * 60 /* 4 hr */

export default async () => {
  const schema = await buildSchema({
    resolvers: [AuthResolvers, UserResolvers, CardResolvers, PlayResolvers, RunResolvers],
    emitSchemaFile: { path: './src/schema.graphql' },
    globalMiddlewares: [TypegooseMiddleware],
    validate: false,
  })
  return new ApolloServer({
    schema,
    context: async ({ req, res }: AppContext) => {
      const { TOKEN_NAME } = process.env
      const token = req.cookies[TOKEN_NAME!]
      try {
        const decodedToken = verifyToken(token) as Token | null
        if (decodedToken) {
          if (Date.now() / 1000 - decodedToken.iat > refreshTokenTimeout) {
            const { userId, tokenVersion } = decodedToken
            const user = await UserModel.findById(userId)
            if (!user) throw new Error('user not found !')
            if (user.tokenVersion !== tokenVersion) throw new Error('who are u ?')
            user.tokenVersion++
            const updatedUser = await user.save()
            if (!updatedUser) throw new Error('database error')
            const token = createToken(updatedUser.id, updatedUser.tokenVersion)
            decodedToken.userId = updatedUser.id
            decodedToken.tokenVersion = updatedUser.tokenVersion
            sendToken(res, token)
          }
          req.userId = decodedToken.userId
          req.tokenVersion = decodedToken.tokenVersion
        }
      } catch (error) {
        req.userId = undefined
        req.tokenVersion = undefined
      }
      return { req, res }
    },
  })
}
