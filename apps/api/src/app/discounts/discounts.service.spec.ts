import { Discount } from '@models';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityNotFoundError } from 'typeorm';
import { configService } from '../config/config.service';
import { discounts } from './discounts.constants';
import { DiscountsService as Service } from './discounts.service';
jest.setTimeout(30000);

describe('Discounts Service', () => {
  let service: Service;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([Discount, Discount]),
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
    it('should call the database and return a list of discounts', async () => {
      const response = await service.findAll();
      expect(response.length).toBeGreaterThanOrEqual(discounts.length);
      expect(response).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            discountId: discounts[0].discountId,
          }),
        ])
      );
    });
  });

  describe('findOne()', () => {
    it('should call the db and return an the correct discount', async () => {
      const discountId = discounts[0].discountId;
      const response = await service.findOne(discountId);
      expect(response).toEqual(
        expect.objectContaining({
          discountId: discounts[0].discountId,
        })
      );
    });

    it('should call the db and thrown an EntityNotFoundError', async () => {
      const discountId = '123e4567-e89b-12d3-a456-426614174000'; //Inexistent UUID
      const response = service.findOne(discountId);
      await expect(response).rejects.toThrow(EntityNotFoundError);
    });
  });

  describe('findOneByCode()', () => {
    it('should call the db and return an the correct discount', async () => {
      const discountCode = discounts[0].code;
      const response = await service.findOneByCode(discountCode);
      expect(response).toEqual(
        expect.objectContaining({
          discountId: discounts[0].discountId,
        })
      );
    });

    it('should call the db and thrown an EntityNotFoundError', async () => {
      const discountCode = 'invalid code'; //Inexistent code
      const response = service.findOneByCode(discountCode);
      await expect(response).rejects.toThrow(EntityNotFoundError);
    });
  });
});
