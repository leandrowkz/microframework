import express, { Express } from 'express'
import { BaseApp } from '@/core/BaseApp'
import { BaseRouter } from '@/core/BaseRouter'
import { Config } from '@/config/Config'
import { Container } from '@/container/Container'
import { UserRouter } from '@/http/routers/UserRouter'

export class AppServer extends BaseApp {
  async start () {
    const server = express()
    const config = Container.resolve<Config>(Config)
    const { port, name } = config.api

    await this.connectDB()
    await this.setupMiddlewares(server)
    await this.setupRouters(server)

    server.listen(port, () => console.debug(`API ${name} running on port ${port}`))
  }

  private async setupMiddlewares(server: Express) {
    server.use(express.json({ limit: '100kb' }))
  }

  private async setupRouters(server: Express) {
    const routers = [
      UserRouter,
    ]

    for (const routerResource of routers) {
      const router = Container.resolve<BaseRouter>(routerResource)
      server.use(router.getRouter())
    }
  }
}
