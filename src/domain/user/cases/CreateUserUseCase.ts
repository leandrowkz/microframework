import { BaseUseCase } from '@/core/BaseUseCase'
import { User } from '@/domain/user/types/User'
import { Container } from '@/container/Container'
import { CreateUserRepositoryInterface } from '@/domain/user/types/CreateUserRepositoryInterface'
import { UserDataAdapter } from '@/domain/user/adapters/UserDataAdapter'
import { HashPasswordHelper } from '@/domain/user/helpers/HashPasswordHelper'
import { UserCreatedEvent } from '@/domain/user/events/UserCreatedEvent'
import { CreateUserMongoRepository } from '../infra/CreateUserMongoRepository'

@Container.injectable()
export class CreateUserUseCase extends BaseUseCase<Partial<User>, User> {
  constructor(
    @Container.inject(CreateUserMongoRepository)
    private createUserRepository: CreateUserRepositoryInterface,

    @Container.inject(UserDataAdapter)
    private adapter: UserDataAdapter,

    @Container.inject(HashPasswordHelper)
    private hashPassword: HashPasswordHelper,

    @Container.inject(UserCreatedEvent)
    private userCreated: UserCreatedEvent,
  ) {
    super()
  }

  async execute(input: Partial<User>): Promise<User> {
    const user = this.adapter.transform(input)
    user.password = await this.hashPassword.run(user.password)

    await this.userCreated.dispatch(user)

    return this.createUserRepository.create(user)
  }
}