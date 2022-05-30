import { MongoClient as MongoDBClient } from 'mongodb'
import { Config } from '@/config/Config'
import { Inject, Injectable } from '@/container/Injection'

@Injectable()
export class MongoClient extends MongoDBClient {
  constructor(
    @Inject(Config)
    config: Config,
  ) {
    super(config.db.mongo.uri)
  }
}
