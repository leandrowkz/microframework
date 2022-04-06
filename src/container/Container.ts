import { container, DependencyContainer } from 'tsyringe'
import { CreateUserMongoRepository } from '@/domain/user/infra/CreateUserMongoRepository'

export class Container {
  static tokens = {
    CreateUserRepository: Symbol('CreateUserRepository'),
  }

  static getContainer(): DependencyContainer {
    return container
  }

  static registerResources(): void {
    container.register(Container.tokens.CreateUserRepository, CreateUserMongoRepository)
  }
}