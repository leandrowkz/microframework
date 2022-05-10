import 'dotenv/config'
import { ConfigInterface } from '@/config/ConfigInterface'
import { DBDriver } from '@/database/types/DBDriver'

export class Config implements ConfigInterface {
  environment = process.env.ENVIRONMENT || 'development'

  api = {
    port: 8000,
    name: 'beauty-api',
  }

  worker = {
    name: 'beauty-worker',
  }

  db = {
    driver: DBDriver.Mongo,

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