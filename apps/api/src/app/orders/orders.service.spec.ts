import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService as Service } from './orders.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateOrderRequest, DeliveryTypeEnum } from '@interfaces';
import { configService } from '../config/config.service';
import { Discount, Order } from '@models';
import { orders } from '../../../../seeder/src/constants/orders.constant';
jest.setTimeout(30000);

describe('Orders Service', () => {
  let service: Service;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([Order, Discount]),
      ],
      providers: [Service],
    }).compile();

    service = module.get<Service>(Service);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should call the database and return a list of orders', async () => {
      const response = await service.findAll();
      expect(response.length).toBeGreaterThanOrEqual(orders.length);
      expect(response).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            orderId: orders[0].orderId,
          }),
        ])
      );
    });
  });

  describe('findOne()', () => {
    it('should call the db and return an the correct order', async () => {
      const orderId = orders[0].orderId;
      const response = await service.findOne(orderId);
      expect(response).toEqual(
        expect.objectContaining({
          orderId: orders[0].orderId,
        })
      );
    });

    it('should call the db and thrown an EntityNotFoundError', async () => {
      const orderId = '123e4567-e89b-12d3-a456-426614174000'; //Inexistent UUID
      const response = service.findOne(orderId);
      await expect(response).rejects.toThrow(EntityNotFoundError);
    });
  });

  describe('create()', () => {
    it('should call the db and return a created order', async () => {
      const createOrderRequest: CreateOrderRequest = {
        email: 'mock',
        items: [],
        total: 0,
        subtotal: 0,
        deliveryType: DeliveryTypeEnum.homeDelivery,
      };

      const response = await service.create(createOrderRequest);
      expect(response).toEqual(expect.objectContaining(createOrderRequest));
    });
  });

  it('should call the db and throw an EntityNotFoundError', async () => {
    const createOrderRequest: CreateOrderRequest = {
      email: 'mock',
      items: [],
      total: 0,
      subtotal: 0,
      deliveryType: DeliveryTypeEnum.homeDelivery,
      discountId: '123e4567-e89b-12d3-a456-426614174000',
    };

    const response = service.create(createOrderRequest);
    await expect(response).rejects.toThrow(EntityNotFoundError);
  });
});
