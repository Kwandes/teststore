import { DiscountTypeEnum } from '@interfaces';
import { Discount } from '@models';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { configService } from '../src/app/config/config.service';
import { EntityNotFoundExceptionFilter } from '../src/app/shared/filters/entity-not-found-exception.filter';
import { discounts } from './discounts.constant';

jest.setTimeout(30000);

describe('Discounts controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([Discount]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new EntityNotFoundExceptionFilter());
    // ensure that the requests contain valid data
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        // Strip data of properties without decorators
        whitelist: true,

        // Throw an error if non-whitelisted values are provided
        forbidNonWhitelisted: true,

        // Throw an error if unknown values are provided
        forbidUnknownValues: true,
      })
    );
    await app.init();
  });

  describe('GET /discounts', () => {
    it('returns Status Code 200 - OK and a list of discounts', () => {
      return request(app.getHttpServer())
        .get('/discounts')
        .expect(200)
        .expect((response) => {
          expect(response.body.length).toEqual(discounts.length);
        });
    });

    // Same as products - should be performed as a manual test
    it('returns Status Code 500 - Internal Server Error when request fails', () => {});
  });

  describe('GET /discounts/:id', () => {
    it('returns Status Code 200 - OK and a single discount', () => {
      const discountCode = discounts[0].code;
      return request(app.getHttpServer())
        .get(`/discounts/${discountCode}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.discountId).toEqual(discounts[0].discountId);
        });
    });

    it('returns Status Code 404 - Not Found when id references a non-existent discount', () => {
      const discountCode = 'discount-that-does-not-exist'; //Non existent code
      return request(app.getHttpServer())
        .get(`/discounts/${discountCode}`)
        .expect(404);
    });

    it('returns Status Code 200 - OK and a list of discounts when id is null', () => {
      return request(app.getHttpServer())
        .get('/discounts/')
        .expect(200)
        .expect((response) => {
          expect(response.body.length).toEqual(discounts.length);
        });
    });
  });

  afterAll(() => app.close());
});
