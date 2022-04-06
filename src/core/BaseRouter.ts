import { Request, Response, Router, NextFunction } from 'express'
import { APIResponse } from '@/http/types/APIResponse'
import { RouteOptions } from '@/http/types/RouteOptions'

export abstract class BaseRouter {
  protected router!: Router

  protected abstract setupRoutes(): Promise<void>

  constructor() {
    this.router = Router()
  }

  public getRouter(): Router {
    return this.router
  }

  protected registerRoute(payload: RouteOptions) {
    const { path, method, middlewares, handler } = payload

    async function dispatch (req: Request, res: Response, next: NextFunction) {
      const result = await handler.handleRequest(req, res, next) as APIResponse<unknown>
      res.status(result.code).send(result)
    }

    if (middlewares) {
      this.router[method](path, middlewares, dispatch)
      return
    }

    this.router[method](path, dispatch)
  }
}
