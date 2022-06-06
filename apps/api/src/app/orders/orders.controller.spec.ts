/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController as Controller } from './orders.controller';
import { OrdersService as Service } from './orders.service';
import { CreateOrderRequest, IOrder } from '@interfaces';
import { DeliveryTypeEnum, DiscountTypeEnum } from '@interfaces';

const orders: IOrder[] = [
  {
    orderId: 'a46d3500-993e-40e7-ab13-3b943519bd15',
    email: 'fiveItems@discountAmount.home',
    items: [1, 1, 2, 3, 4],
    total: 314.18,
    subtotal: 224.18,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: {
      discountId: '78c0a432-59f8-4a6c-b89d-57030a6628d9',
      code: 'discount-100',
      amount: 100,
      type: DiscountTypeEnum.amount,
      remainingUses: 100,
      startsAt: new Date('1977-12-26'),
      expiresAt: null,
      isEnabled: true,
    },
  },
  {
    orderId: 'abcd3500-993e-40e7-ab13-deef3519334c',
    email: 'threeItems@discountAmount.none',
    items: [4, 5, 6],
    total: 500,
    subtotal: 222.22,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: null,
  },
];

const createOrderRequest: CreateOrderRequest = {
  email: 'threeItems@discountAmount.none',
  items: [4, 5, 6],
  total: 500,
  subtotal: 222.22,
  deliveryType: DeliveryTypeEnum.homeDelivery,
};

describe('Orders Controller', () => {
  // Reference variables used for spying
  let app: TestingModule;
  let controller: Controller;
  let service: Service;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [Controller],
      providers: [
        // Mock of the service and its methods
        {
          provide: Service,
          useFactory: () => ({
            findAll: jest.fn().mockReturnValue(orders),
            findOne: jest.fn().mockReturnValue(orders[0]),
            create: jest.fn().mockReturnValue(orders[1]),
          }),
        },
      ],
    }).compile();
    // Set the references
    controller = app.get<Controller>(Controller);
    service = app.get<Service>(Service);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll()', () => {
    it('should call findAll 1 time"', async () => {
      jest.spyOn(service, 'findAll');

      await controller.getAll();
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(service.findAll).toHaveBeenCalledWith();
    });

    it('should call findAll and receive a list of orders"', async () => {
      jest.spyOn(service, 'findAll');

      const response = await controller.getAll();
      expect(response).toEqual(orders);
    });
  });

  describe('get()', () => {
    it('should call findOne 1 time"', async () => {
      jest.spyOn(service, 'findOne');

      await controller.get('a46d3500-993e-40e7-ab13-3b943519bd15');
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(
        'a46d3500-993e-40e7-ab13-3b943519bd15'
      );
    });

    it('should call findOne and receive a single order"', async () => {
      jest.spyOn(service, 'findAll');

      const response = await controller.get(
        'a46d3500-993e-40e7-ab13-3b943519bd15'
      );
      expect(response).toEqual(orders[0]);
    });
  });

  describe('create()', () => {
    it('should call create 1 time with the request object as value', async () => {
      jest.spyOn(service, 'create');

      await controller.create(createOrderRequest);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(createOrderRequest);
    });

    it('should call create 1 time with the null as value', async () => {
      jest.spyOn(service, 'create');

      await controller.create(null);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(null);
    });

    it('should call create and return a created order', async () => {
      jest.spyOn(service, 'create');

      const response = await controller.create(createOrderRequest);
      expect(response).toEqual(orders[1]);
    });
  });
});
