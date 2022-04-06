import { Request, Response, NextFunction } from 'express'
import { APIResponse } from '@/http/types/APIResponse'
import { APIResponseStatus } from '@/http/types/APIResponseStatus'

export abstract class BaseController<Resource> {
  
  abstract handleRequest(req: Request, res: Response, next: NextFunction): Promise<APIResponse<Resource>>;

  protected responseSuccess(data: Resource): APIResponse<Resource> {
    return {
      code: 200,
      status: APIResponseStatus.Success,
      data: data,
    }
  }

  protected responseError(error: Error): APIResponse<Resource> {
    return {
      code: 400,
      status: APIResponseStatus.Error,
      message: error.message || `${error}`,
      stack: error.stack || '',
    }
  }

  protected responseQueued(): APIResponse<Resource> {
    return {
      code: 202,
      status: APIResponseStatus.Queued,
      message: 'Resource queued.',
    }
  }
}
