import { Config } from '@/config/Config'
import { CreateUserMongoRepository } from '@/domain/user/infra/CreateUserMongoRepository'
import { UserRouter } from '@/http/routers/UserRouter'
import { CreateUserController } from '@/http/controllers/CreateUserController'
import { CreateUserUseCase } from '@/domain/user/cases/CreateUserUseCase'
import { MongoClient } from '@/database/clients/MongoClient'
import { UserMongoAdapter } from '@/domain/user/adapters/UserMongoAdapter'

export const Resources = {
  Config: Config,
  MongoClient: MongoClient,
  UserMongoAdapter: UserMongoAdapter,
  CreateUserRepository: CreateUserMongoRepository,
  CreateUserController: CreateUserController,
  CreateUserUseCase: CreateUserUseCase,
  UserRouter: UserRouter,
}
