import { injectable } from 'tsyringe'
import { BaseAdapter } from '@/core/BaseAdapter'
import { User } from '@/domain/user/types/User'

@injectable()
export class UserDataAdapter extends BaseAdapter<Partial<User>, User> {
  
  transform(dataUser: Partial<User>): User {
    return {
      id: dataUser.id || null,
      name: dataUser.name || '',
      email: dataUser.email || '',
      password: dataUser.password || '',
      createdAt: dataUser.createdAt || new Date,
      updatedAt: dataUser.updatedAt || new Date,
      deletedAt: dataUser.deletedAt || null,
    }
  }
}