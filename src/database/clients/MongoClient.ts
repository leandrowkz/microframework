import { MongoClient as MongoDBClient } from 'mongodb'
import { Config } from '@/config/Config'
import { Container } from '@/container/Container'

@Container.injectable()
export class MongoClient extends MongoDBClient {
  constructor(
    @Container.inject(Config)
    config: Config,
  ) {
    super(config.db.mongo.uri)
  }
}