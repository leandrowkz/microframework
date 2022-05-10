import { Container } from '@/container/Container'
import { BaseMongoRepository } from '@/core/BaseMongoRepository'
import { CreateUserRepositoryInterface } from '@/domain/user/types/CreateUserRepositoryInterface'
import { User } from '@/domain/user/types/User'
import { UserMongoAdapter } from '@/domain/user/adapters/UserMongoAdapter'

@Container.injectable()
export class CreateUserMongoRepository extends BaseMongoRepository<User> implements CreateUserRepositoryInterface {
  collectionName = 'Users'
  
  constructor(
    @Container.inject(UserMongoAdapter)
    private adapter: UserMongoAdapter,
  ) {
    super()
  }

  async create(user: User): Promise<User> {
    const created = await super.insertOne(user)

    return this.adapter.transform(created)
  }
}