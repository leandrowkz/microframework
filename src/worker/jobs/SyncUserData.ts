import { BaseJob } from '@/core/BaseJob'
import { User } from '@/domain/user/types/User'

export class SyncUserData extends BaseJob<User> {
  async handle() {
    const date = new Date
    console.debug(`Executing job SyncUserData at ${date.toISOString()}...`)
  }
}
