import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { AppContext, RunStatuses } from '../types'
import { Run, RunModel } from '../entities/Run'
import { isAuthenticated } from '../utils/auth'

@Resolver()
export class PlayResolvers {
  @Mutation(() => Run)
  async startRun(@Ctx() { req }: AppContext): Promise<Run> {
    try {
      const user = await isAuthenticated(req.userId, req.tokenVersion)
      const currentActiveRun = await RunModel.findOne({ userId: user.id, status: RunStatuses.active })
      if (currentActiveRun) throw new Error('active round exists')
      const run = await RunModel.create({ userId: user.id })
      console.log('typeof run', typeof run)
      return run
    } catch (error) {
      throw error
    }
  }

  @Mutation(() => Run)
  async endRun(@Ctx() { req }: AppContext, @Arg('runId') runId: string): Promise<Boolean> {
    try {
      const user = await isAuthenticated(req.userId, req.tokenVersion)
      const run = await RunModel.findById(runId)
      if (!run) throw new Error('run not found')
      if (String(run.userId) !== user.id) throw new Error('not your run')
      run.status = RunStatuses.cancelled
      await run.save()
      return true
    } catch (error) {
      throw error
    }
  }
}
