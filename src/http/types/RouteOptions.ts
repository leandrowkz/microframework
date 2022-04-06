import { BaseController } from '@/core/BaseController'
import { HTTPMethod } from '@/http/types/HTTPMethod'

export interface RouteOptions {
  path: string,
  method: HTTPMethod,
  middlewares?: any[],
  handler: BaseController<unknown>,
}
