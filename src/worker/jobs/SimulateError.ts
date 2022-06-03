import { BaseJob } from '@/core/BaseJob'

export class SimulateError extends BaseJob<void> {
  async handle() {
    const date = new Date
    throw Error(`Throwing error on job SimulateError at ${date.toISOString()}...`)
  }
}
