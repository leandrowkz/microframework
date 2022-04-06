import { inject } from 'tsyringe'
import { MongoClient as MongoDBClient } from 'mongodb'
import { Config } from '@/config/Config'

export class MongoClient extends MongoDBClient {
  constructor(
    @inject(Config)
    config: Config,
  ) {
    super(config.db.mongo.uri)
  }
}