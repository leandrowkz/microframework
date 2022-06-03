import schedule from 'node-schedule'
import { Config } from '@/config/Config'
import { BaseApp } from '@/core/BaseApp'
import { BaseJob } from '@/core/BaseJob'
import { Container } from '@/container/Container'
import { Inject, Injectable } from '@/container/Injection'
import { SyncUserData } from '@/worker/jobs/SyncUserData'
import { SimulateError } from '@/worker/jobs/SimulateError'

@Injectable()
export class AppWorker extends BaseApp {
  private scheduler

  constructor(
    @Inject(SyncUserData)
    private jobSyncUserData: SyncUserData,

    @Inject(SimulateError)
    private jobSimulateError: SimulateError,
  ) {
    super()
    this.scheduler = schedule
  }

  async start () {
    await this.connectDB()
    const config = Container.resolve<Config>(Config)
    const { name } = config.worker

    await this.scheduleJobs()

    console.debug(`Worker ${name} started.`)
  }

  async scheduleJobs () {
    this.scheduler.scheduleJob('*/1 * * * *', () => this.dispatchJob(this.jobSyncUserData))
    this.scheduler.scheduleJob('*/1 * * * *', () => this.dispatchJob(this.jobSimulateError))
  }

  async dispatchJob(job: BaseJob<unknown>) {
    try {
      job.handle()
    } catch (e) {
      const error = JSON.stringify(e, Object.getOwnPropertyNames(e))

      console.error(`Error dispatching job: ${error}`)
    }
  }
}
