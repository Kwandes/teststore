import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService as Service } from './orders.service';
import { Repository } from 'typeorm';
import { IDiscount, IOrder } from '@interfaces';
import { configService } from '../config/config.service';

jest.setTimeout(30000);

describe('Orders Service', () => {
  let service: Service;
  let ordersRepo: Repository<IOrder>;
  let discountsRepo: Repository<IDiscount>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig())],
      providers: [Service],
    }).compile();

    service = module.get<Service>(Service);
    ordersRepo = module.get<Repository<IOrder>>(Repository);
    discountsRepo = module.get<Repository<IDiscount>>(Repository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should call the database and return a list of orders', async () => {
      /*
      const response = await service.findAll();
      console.log('RESPONSE', response);
      */
    });
  });

  describe('findOne()', () => {});

  describe('create()', () => {});
});
