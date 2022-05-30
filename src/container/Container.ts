import { container } from 'tsyringe'
import { TOKENS } from '@/container/Tokens'
import { CreateUserMongoRepository } from '@/domain/user/infra/CreateUserMongoRepository'

export const Container = container.createChildContainer()

Container.registerSingleton(TOKENS.CreateUserRepository, CreateUserMongoRepository)

