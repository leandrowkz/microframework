import { Config } from '@/config/Config'
import { CreateUserMongoRepository } from '@/domain/user/infra/CreateUserMongoRepository'
import { UserRouter } from '@/http/routers/UserRouter'
import { CreateUserController } from '@/http/controllers/CreateUserController'
import { CreateUserUseCase } from '@/domain/user/cases/CreateUserUseCase'

export const Resources = {
  Config: Config,
  CreateUserRepository: CreateUserMongoRepository,
  CreateUserController: CreateUserController,
  CreateUserUseCase: CreateUserUseCase,
  UserRouter: UserRouter,
}
