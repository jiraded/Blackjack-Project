import { Ctx, Query, Resolver, FieldResolver, Root, ResolverInterface } from 'type-graphql'
import { Run, RunModel } from '../entities/Run'
import { User, UserModel } from '../entities/User'
import { AppContext, Roles } from '../types'
import { isAuthenticated } from '../utils/auth'

@Resolver(() => User)
export class UserResolvers {
  @FieldResolver()
  async runs(@Root() user: User): Promise<Run[]> {
    try {
      const runs = await RunModel.find({ userId: user._id })
      return runs
    } catch (error) {
      throw error
    }
  }

  @Query(() => [User], { nullable: 'items' })
  async players(@Ctx() { req }: AppContext): Promise<User[]> {
    try {
      const user = await isAuthenticated(req.userId, req.tokenVersion)
      const isAdmin = user.roles?.includes(Roles.admin)
      if (!isAdmin) throw new Error('not authorized !')
      return UserModel.find({ roles: Roles.player }).sort({ createdAt: -1 })
    } catch (error) {
      throw error
    }
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: AppContext): Promise<User | null> {
    try {
      const { userId, tokenVersion } = req
      const user = await isAuthenticated(userId, tokenVersion)
      return user
    } catch (error) {
      throw error
    }
  }
}
