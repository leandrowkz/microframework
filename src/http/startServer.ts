import 'reflect-metadata'
import { AppServer } from '@/http/AppServer'

const api = new AppServer()
api.start()
