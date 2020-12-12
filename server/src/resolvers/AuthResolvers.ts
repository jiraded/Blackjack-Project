import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { User, UserModel } from '../entities/User'
import bcryptjs from 'bcryptjs'
import { createToken, sendToken, deleteToken } from '../utils/token'
import { AppContext } from '../types'
import { isAuthenticated } from '../utils/auth'

@Resolver()
export class AuthResolvers {
  @Mutation(() => User, { nullable: true })
  async signup(@Ctx() { res }: AppContext, @Arg('username') username: string, @Arg('password') password: string): Promise<User | null> {
    try {
      const hashedPassword = await bcryptjs.hash(password, 10)
      const user = await UserModel.create({ username, password: hashedPassword, tokenVersion: 0 })
      const token = createToken(user._id, user.tokenVersion)
      sendToken(res, token)
      return user
    } catch (error) {
      throw error
    }
  }

  @Mutation(() => User, { nullable: true })
  async signin(@Ctx() { res }: AppContext, @Arg('username') username: string, @Arg('password') password: string): Promise<User | null> {
    try {
      const user = await UserModel.findOne({ username })
      if (!user) throw new Error('username not found !')
      const isPasswordValid = await bcryptjs.compare(password, user.password)
      if (!isPasswordValid) throw new Error('password is invalid !')
      const token = createToken(user._id, user.tokenVersion)
      sendToken(res, token)
      return user
    } catch (error) {
      throw error
    }
  }

  @Mutation(() => Boolean)
  async signout(@Ctx() { req, res }: AppContext): Promise<Boolean> {
    try {
      const { userId, tokenVersion } = req
      if (!userId || tokenVersion === undefined) throw new Error('Who are you !')
      const user = await isAuthenticated(userId, tokenVersion)
      user.tokenVersion++
      await user.save()
      await deleteToken(res)
      return true
    } catch (error) {
      throw error
    }
  }
}
