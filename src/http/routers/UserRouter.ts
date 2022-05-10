import { BaseRouter } from '@/core/BaseRouter'
import { Container } from '@/container/Container'
import { CreateUserController } from '@/http/controllers/CreateUserController'
import { HTTPMethod } from '@/http/types/HTTPMethod'

@Container.injectable()
export class UserRouter extends BaseRouter {
  constructor(
    @Container.inject(CreateUserController)
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
