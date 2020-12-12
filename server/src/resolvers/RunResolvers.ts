import { Arg, Ctx, Mutation, Query, Resolver, FieldResolver, Root } from 'type-graphql'
import { AppContext } from '../types'
import { Run, RunModel } from '../entities/Run'
import { isAuthenticated } from '../utils/auth'
import { User, UserModel } from '../entities/User'

@Resolver(() => Run)
export class RunResolvers {
  @FieldResolver()
  async user(@Root() run: Run): Promise<User | null> {
    try {
      const user = await UserModel.findById(run.userId)
      return user
    } catch (error) {
      throw error
    }
  }

  @Query(() => [Run])
  async userRuns(@Ctx() { req }: AppContext): Promise<Run[]> {
    try {
      const user = await isAuthenticated(req.userId, req.tokenVersion)
      const runs = await RunModel.find({ userId: user._id })
      return runs
    } catch (error) {
      throw error
    }
  }
}
