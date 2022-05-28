import { Discount, Order } from '@models';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public ensureValues(keys: string[]): ConfigService {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort(): string | undefined {
    return this.getValue('PORT', true);
  }

  public isProduction(): boolean {
    const mode = this.getValue('MODE', false);
    return mode !== 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      synchronize: true,

      host: this.getValue('POSTGRES_HOST', false) || 'localhost',
      port: parseInt(this.getValue('POSTGRES_PORT', false) || '', 10) || 5432,
      username: this.getValue('POSTGRES_USER', false) || 'root',
      password: this.getValue('POSTGRES_PASSWORD', false) || 'root',
      database: this.getValue('POSTGRES_DATABASE', false) || 'teststore',

      entities: [Order, Discount],
    };
  }

  private getValue(key: string, throwOnMissing: boolean): string | undefined {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }
}

// commented out so the app uses defaults for DB connection instead.
// you can provide required environment variables in the array passed to the ensureValues() method.
const configService = new ConfigService(process.env).ensureValues([]);

export { configService };
