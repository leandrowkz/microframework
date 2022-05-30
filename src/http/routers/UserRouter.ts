import { BaseRouter } from '@/core/BaseRouter'
import { Inject, Injectable } from '@/container/Injection'
import { CreateUserController } from '@/http/controllers/CreateUserController'
import { HTTPMethod } from '@/http/types/HTTPMethod'

@Injectable()
export class UserRouter extends BaseRouter {
  constructor(
    @Inject(CreateUserController)
    private createUserController: CreateUserController,
  ) {
    super()
    this.setupRoutes()
  }

  async setupRoutes() {
    this.registerRoute({
      path: '/v1/users',
      method: HTTPMethod.Post,
      handler: this.createUserController,
    })
  }
}
