import { Discount, Order } from '@models';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config.service';
import { SeedService } from './seed.service';
import { DiscountsSeederService } from './services/discounts.service';
import { OrdersSeederService } from './services/orders.service';

@Module({})
export class SeedModule {
  public static register(): DynamicModule {
    return {
      module: SeedModule,
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([Discount, Order]),
      ],
      providers: [
        Logger,
        SeedService,
        DiscountsSeederService,
        OrdersSeederService,
      ],
      exports: [SeedService],
    };
  }
}
