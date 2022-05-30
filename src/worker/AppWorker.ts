import { Config } from '@/config/Config'
import { BaseApp } from '@/core/BaseApp'
import { Container } from '@/container/Container'

export class AppWorker extends BaseApp {
  async start () {
    await this.connectDB()
    const config = Container.resolve<Config>(Config)
    const { name } = config.worker

    setInterval(() => console.debug(`Worker ${name} ack polling`))
  }
}
