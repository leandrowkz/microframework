/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi, { ValidationOptions, ValidationErrorItem, ObjectSchema } from 'joi'
import { Request, Response, NextFunction } from 'express'
import { APIResponse } from '@/http/types/APIResponse'
import { APIResponseStatus } from '@/http/types/APIResponseStatus'

export abstract class BaseValidator<Entity> {
  private schema!: ObjectSchema<Entity>

  getSchema() {
    return this.schema
  }

  defineSchema(schema: Record<keyof Entity, any>) {
    this.schema = Joi.object<Entity>(schema)
  } 

  validate(data: Record<string, any>) {
    return this.schema.validate(data, { allowUnknown: true })
  }

  middleware(options: ValidationOptions = {}) {
    return  (req: Request, res: Response, next: NextFunction) => {
      const defaultOptions = {
        abortEarly: false,
        stripUnknown: { objects: true },
        ...options,
      }
  
      const { error } = this.schema.validate(req.body, defaultOptions)
  
      if (error) {
        const errors = error.details.map((item: ValidationErrorItem) => item.message)

        const response: APIResponse<Error> = {
          code: 422,
          status: APIResponseStatus.Error,
          message: 'Error validating body request.',
          errors: errors,
        }
  
        return res.status(response.code).json(response)
      }
  
      return next()
    }
  }
}
