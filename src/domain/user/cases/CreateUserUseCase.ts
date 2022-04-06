import { injectable, inject } from 'tsyringe'
import { BaseUseCase } from '@/core/BaseUseCase'
import { User } from '@/domain/user/types/User'
import { Container } from '@/container/Container'
import { CreateUserRepositoryInterface } from '@/domain/user/types/CreateUserRepositoryInterface'
import { UserDataAdapter } from '@/domain/user/adapters/UserDataAdapter'
import { HashPasswordHelper } from '@/domain/user/helpers/HashPasswordHelper'
import { UserCreatedEvent } from '@/domain/user/events/UserCreatedEvent'

@injectable()
export class CreateUserUseCase extends BaseUseCase<Partial<User>, User> {
  constructor(
    @inject(Container.tokens.CreateUserRepository)
    private createUserRepository: CreateUserRepositoryInterface,

    @inject(UserDataAdapter)
    private adapter: UserDataAdapter,

    @inject(HashPasswordHelper)
    private hashPassword: HashPasswordHelper,

    @inject(UserCreatedEvent)
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