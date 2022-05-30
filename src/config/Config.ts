import 'dotenv/config'
import { ConfigInterface } from '@/config/ConfigInterface'
import { DBDriver } from '@/database/types/DBDriver'

export class Config implements ConfigInterface {
  environment = process.env.ENVIRONMENT || 'development'

  api = {
    port: Number(process.env.API_PORT) || 8000,
    name: process.env.API_NAME || 'app-api',
  }

  worker = {
    name: process.env.WORKER_NAME || 'app-worker',
  }

  db = {
    driver: process.env.DATABASE_DRIVER as DBDriver || DBDriver.Default,
    enabled: process.env.DATABASE_ENABLED === 'true' || false,

    mongo: {
      uri: process.env.MONGO_URI || '',
      database: process.env.MONGO_DATABASE || '',
    },

    mysql: {
      host: process.env.MYSQL_HOST || '',
      port: Number(process.env.MYSQL_PORT) || 3306,
      username: process.env.MYSQL_USERNAME || '',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || '',
    },
  }

  kafka = {
    enabled: process.env.KAFKA_ENABLED === 'true' || false,
    brokers: process.env.KAFKA_BROKERS ? process.env.KAFKA_BROKERS.split(';') : [''],
    groupId: process.env.KAFKA_GROUP_ID || '',
    clientId: process.env.KAFKA_CLIENT_ID || '',
  }
}
