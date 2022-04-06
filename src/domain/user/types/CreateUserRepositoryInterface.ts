import { User } from '@/domain/user/types/User'

export interface CreateUserRepositoryInterface {
  create(user: User): User | Promise<User>
}