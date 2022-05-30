import Joi from 'joi'
import { Injectable } from '@/container/Injection'
import { BaseValidator } from '@/core/BaseValidator'
import { User } from '@/domain/user/types/User'

@Injectable()
export class CreateUserValidator extends BaseValidator<User> {
  constructor () {
    super()
    this.defineSchema({
      id: Joi.string().allow(null).optional(),
      createdAt: Joi.date().optional(),
      updatedAt: Joi.date().optional(),
      deletedAt: Joi.date().optional(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    })
  }
}
