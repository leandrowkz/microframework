import { Request } from 'express'
import { BaseController } from '@/core/BaseController'
import { Inject, Injectable } from '@/container/Injection'
import { CreateUserUseCase } from '@/domain/user/cases/CreateUserUseCase'
import { UserDataAdapter } from '@/domain/user/adapters/UserDataAdapter'
import { User } from '@/domain/user/types/User'

@Injectable()
export class CreateUserController extends BaseController<User> {
  constructor(
    @Inject(UserDataAdapter)
    private adapter: UserDataAdapter,

    @Inject(CreateUserUseCase)
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
