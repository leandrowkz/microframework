import { inject, injectable } from 'tsyringe'
import { createConnection } from 'mysql2'
import { Config } from '@/config/Config'

@injectable()
export class MySQLClient {
  constructor(
    @inject(Config)
    config: Config,
  ) {
    const { host, port, username, password, database } = config.db.mysql

    return createConnection({
      host,
      port,
      user: username,
      password,
      database,
    })
  }
}