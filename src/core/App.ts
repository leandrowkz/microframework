import express from 'express'
import { Config } from '@/config/Config'
import { Container } from '@/container/Container'
import { Resources } from '@/container/Resources'
import { UserRouter } from '@/http/routers/UserRouter'
import { MongoClient } from '@/database/clients/MongoClient'

export enum AppType {
  Api = 'api',
  Worker = 'worker'
}

export class App {
  private type: AppType

  constructor(type: AppType) {
    this.type = type
  }

  async start() {
    this.connectDB()
    this.registerResources()

    switch (this.type) {
      case AppType.Api:
        await this.startServer()
        break

      case AppType.Worker:
        this.startWorker()
        break

      default:
        throw Error('App type is not set.')
    }
  }

  private registerResources() {
    const tokens = Object.keys(Resources)

    tokens.forEach(token => {
      Container.register({
        token,
        // @ts-ignore
        resource: Resources[token],
      })
    })
  }

  private async connectDB() {
    try {
      const db = Container.resolve<MongoClient>(MongoClient)
      await db.connect()

      Container.register({ token: MongoClient, resource: db, singleton: true })

      console.log(`Connected on mongodb`)
    } catch (e) {
      console.error(`Failed to connect on mongoDB: ${e}`)
    }
  }

  private async startServer() {
    const server = express()
    const config = Container.resolve<Config>(Config)
    const router = Container.resolve<UserRouter>(UserRouter)
    const { port, name } = config.api

    server.use(express.json({ limit: '100kb' }))
    server.use(router.getRouter())

    server.listen(port, () => console.debug(`API ${name} running on port ${port}`))
  }

  private startWorker() {
    const config = Container.resolve<Config>(Config)
    const { name } = config.worker

    setInterval(() => console.debug(`Worker ${name} ack polling`))
  }
}
