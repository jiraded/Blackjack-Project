import { UserModel } from '../entities/User'

export const isAuthenticated = async (userId?: string, tokenVersion?: number) => {
  try {
    if (!userId || tokenVersion === undefined) throw new Error('not logged in')
    const user = await UserModel.findById(userId)
    if (!user) throw new Error('Not authenticated !')
    if (user.tokenVersion !== tokenVersion) throw new Error('Not authenticated !')
    return user
  } catch (error) {
    throw error
  }
}
