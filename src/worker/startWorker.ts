import 'reflect-metadata'
import { AppWorker } from '@/worker/AppWorker'
import { Container } from '@/container/Container'
import { BaseApp } from '@/core/BaseApp'

const worker = Container.resolve<BaseApp>(AppWorker)
worker.start()
