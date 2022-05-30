import 'reflect-metadata'
import { AppWorker } from '@/worker/AppWorker'

const worker = new AppWorker()
worker.start()
