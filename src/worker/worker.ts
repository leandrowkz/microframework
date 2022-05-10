import 'reflect-metadata'
import { App, AppType } from '@/core/App'

const worker = new App(AppType.Worker)
worker.start()