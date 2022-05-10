import { DBDriver } from '@/database/types/DBDriver'

export interface ConfigInterface {
  environment: string;

  api: {
    port: number,
    name: string,
  };

  worker: {
    name: string,
  };

  db: {
    driver: DBDriver,
    
    mongo: {
      uri: string,
      database: string,
    };

    mysql: {
      host: string,
      port: number,
      database: string,
      username: string,
      password: string,
    };
  };

  kafka: {
    enabled: boolean,
    brokers: string[],
    groupId: string,
    clientId: string,
  };
}