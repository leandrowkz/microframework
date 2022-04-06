import { DBDriver } from '@/core/types/DBDriver';

export interface ConfigInterface {
  environment: string;

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