import { Config } from '@/config/Config'
import { Container } from '@/container/Container'
import { MongoClient } from '@/database/clients/MongoClient'
import { DBDriver } from '@/database/types/DBDriver'

export abstract class BaseApp {
  private config: Config

  constructor() {
    this.config = Container.resolve<Config>(Config)
  }

  protected async connectDB() {
    try {
      const { enabled, driver } = this.config.db
      console.debug(`Attempting to connect on database ${driver}...`)

      if (!enabled) {
        console.debug('Database connection not enabled. Skipping.')
        return
      }

      switch (driver) {
        case DBDriver.Mongo:
          const db = Container.resolve<MongoClient>(MongoClient)
          await db.connect()

          Container.register(MongoClient, { useValue: db })
          break

        case DBDriver.MySQL:
          throw Error('MySQL implementation is not ready.')

        default:
          throw Error('Invalid database driver.')
      }

      console.debug('Database connected.')
    } catch (e) {
      const error = e as Error
      const message = JSON.stringify(error, Object.getOwnPropertyNames(error))
      const errorMessage = `Failed to connect on mongoDB: ${message}`

      console.error(errorMessage)
      throw Error(errorMessage)
    }
  }

  abstract start(): Promise<void>
}
