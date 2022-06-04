/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom, of } from 'rxjs';
import { products } from './products.constant';
import { ProductsController as Controller } from './products.controller';
import { ProductsService as Service } from './products.service';

describe('Products Controller', () => {
  // Reference variables used for spying
  let app: TestingModule;
  let controller: Controller;
  let service: Service;

  const productId = '1'; // Corresponds to products[0]

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [Controller],
      providers: [
        // Mock of the service and its methods
        {
          provide: Service,
          useFactory: () => ({
            findAll: jest.fn().mockReturnValue(of(products)),
            findOne: jest.fn().mockReturnValue(of(products[productId])),
          }),
        },
      ],
    }).compile();
    // Set the references
    controller = app.get<Controller>(Controller);
    service = app.get<Service>(Service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll()', () => {
    it('should call findAll 1 time"', async () => {
      jest.spyOn(service, 'findAll');

      await firstValueFrom(controller.getAll());
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(service.findAll).toHaveBeenCalledWith();
    });

    it('should call findAll and receive a list of products"', async () => {
      jest.spyOn(service, 'findAll');

      const response = await firstValueFrom(controller.getAll());
      expect(response).toEqual(products);
    });
  });

  describe('getOne()', () => {
    it('should call findOne 1 time"', async () => {
      jest.spyOn(service, 'findOne');

      await firstValueFrom(controller.get(productId));
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(productId);
    });

    it('should call findOne and receive a single product"', async () => {
      jest.spyOn(service, 'findAll');

      const response = await firstValueFrom(controller.get(productId));
      expect(response).toEqual(products[productId]);
    });
  });
});
