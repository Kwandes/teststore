/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Test, TestingModule } from '@nestjs/testing';
import { Console } from 'console';
import { of } from 'rxjs';
import { discounts } from './discounts.constant';
import { DiscountsController as Controller } from './discounts.controller';
import { DiscountsService as Service } from './discounts.service';

describe('Discount Controller', () => {
  // Reference variables used for spying
  let app: TestingModule;
  let controller: Controller;
  let service: Service;

  const discountId = '78c0a432-59f8-4a6c-b89d-57030a6628d9'; // Corresponds to discount[0]

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [Controller],
      providers: [
        // Mock of the service and its methods
        {
          provide: Service,
          useFactory: () => ({
            findAll: jest.fn().mockReturnValue(discounts), // an observale of discount list
            findOneByCode: jest.fn().mockReturnValue(discounts[0]), // a promise turned into a singular discount item
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

      await controller.getAll();
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(service.findAll).toHaveBeenCalledWith();
    });

    it('should call findAll and receive a list of discounts"', async () => {
        jest.spyOn(service, 'findAll');
  
        const response = await controller.getAll();
        console.log(response)
        expect(response).toEqual(discounts);
      });
    
  });
  
  describe('get()', ()=>{
      it('should call findOne 1 time',async () => {
        jest.spyOn(service, 'findOneByCode');

        await controller.get(discountId);
        expect(service.findOneByCode).toHaveBeenCalledTimes(1);
        expect(service.findOneByCode).toHaveBeenCalledWith(discountId);
      });
      
      it('should call findOne and receive a single discount"', async () => {
        jest.spyOn(service, 'findOneByCode');
  
        const response = await controller.get(discountId);
        expect(response).toEqual(discounts[0]);
      });



  });
 
});
