import { BaseUseCase } from '@/core/BaseUseCase'
import { Inject, Injectable } from '@/container/Injection'
import { TOKENS } from '@/container/Tokens'
import { User } from '@/domain/user/types/User'
import { CreateUserRepositoryInterface } from '@/domain/user/types/CreateUserRepositoryInterface'
import { UserDataAdapter } from '@/domain/user/adapters/UserDataAdapter'
import { HashPasswordHelper } from '@/domain/user/helpers/HashPasswordHelper'
import { UserCreatedEvent } from '@/domain/user/events/UserCreatedEvent'

@Injectable()
export class CreateUserUseCase extends BaseUseCase<Partial<User>, User> {
  constructor(
    @Inject(TOKENS.CreateUserRepository)
    private createUserRepository: CreateUserRepositoryInterface,

    @Inject(UserDataAdapter)
    private adapter: UserDataAdapter,

    @Inject(HashPasswordHelper)
    private hashPassword: HashPasswordHelper,

    @Inject(UserCreatedEvent)
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
