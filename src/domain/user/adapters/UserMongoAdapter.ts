import { injectable } from 'tsyringe'
import { WithId } from 'mongodb'
import { BaseAdapter } from '@/core/BaseAdapter'
import { User } from '@/domain/user/types/User'

@injectable()
export class UserMongoAdapter extends BaseAdapter<WithId<User>, User> {

  transform(mongoUser: WithId<User>): User {
    return {
      id: String(mongoUser._id),
      name: mongoUser.name,
      email: mongoUser.email,
      password: '*************',
      createdAt: mongoUser.createdAt,
      updatedAt: mongoUser.updatedAt,
      deletedAt: mongoUser.deletedAt,
    }
  }
}
