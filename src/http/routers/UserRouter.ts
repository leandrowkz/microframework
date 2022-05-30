import { BaseRouter } from '@/core/BaseRouter'
import { Inject, Injectable } from '@/container/Injection'
import { CreateUserController } from '@/http/controllers/CreateUserController'
import { HTTPMethod } from '@/http/types/HTTPMethod'
import { CreateUserValidator } from '@/domain/user/validators/CreateUserValidator'

@Injectable()
export class UserRouter extends BaseRouter {
  constructor(
    @Inject(CreateUserController)
    private createUserController: CreateUserController,

    @Inject(CreateUserValidator)
    private createUserValidator: CreateUserValidator,
  ) {
    super()
    this.setupRoutes()
  }

  async setupRoutes() {
    this.registerRoute({
      path: '/v1/users',
      method: HTTPMethod.Post,
      handler: this.createUserController,
      middlewares: [
        this.createUserValidator.middleware(),
      ]
    })
  }
}
