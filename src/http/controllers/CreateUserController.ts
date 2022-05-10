import { Request } from 'express'
import { Container } from '@/container/Container'
import { BaseController } from '@/core/BaseController'
import { CreateUserUseCase } from '@/domain/user/cases/CreateUserUseCase'
import { User } from '@/domain/user/types/User'
import { UserDataAdapter } from '@/domain/user/adapters/UserDataAdapter'

@Container.injectable()
export class CreateUserController extends BaseController<User> {
  constructor(
    @Container.inject(UserDataAdapter)
    private adapter: UserDataAdapter,

    @Container.inject(CreateUserUseCase)
    private createUserUseCase: CreateUserUseCase,
  ) {
    super()
  }

  async handleRequest(req: Request) {
    try {
      const parsed = this.adapter.transform(req.body)
      const user = await this.createUserUseCase.execute(parsed)

      return this.responseSuccess(user)
    } catch (e) {
      return this.responseError(e as Error)
    }
  }
}
