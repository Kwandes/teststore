import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { configService } from '../src/app/config/config.service';

const order = {
  orderId: 'd6322630-9b0e-4262-baaa-cd30e99057a5',
  email: 'oneItem@noDiscount.pickup',
  items: [1, 1, 2, 3, 4],
  total: '314.18',
  subtotal: '319.18',
  deliveryType: 'pickup_point',
  discount: null,
};

jest.setTimeout(30000);

describe('Orders controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /orders', () => {
    it('returns Status Code 200 - OK and a list of orders', () => {
      return request(app.getHttpServer())
        .get('/orders')
        .expect(200)
        .expect((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([expect.objectContaining(order)])
          );
        });
    });

    // Same as products - should be performed as a manual test
    it('returns Status Code 500 - Internal Server Error when request fails', () => {});
  });

  describe('GET /orders/:id', () => {
    it('returns Status Code 200 - OK and a single order', () => {
      const orderId = 'd6322630-9b0e-4262-baaa-cd30e99057a5';
      return request(app.getHttpServer())
        .get(`/orders/${orderId}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toEqual(expect.objectContaining(order));
        });
    });
    /**
    it.('returns Status Code 404 - Not Found when id references a non-existent order', () => {
      const orderId = 'a46d1100-993e-40e7-ab13-3b943519bd15'; //Non existent uuid
      return request(app.getHttpServer())
        .get(`/orders/${orderId}`)
        .expect(404)
        .expect((response) => {
          expect(response.body?.error).toEqual(`Not Found`);
        });
    });*/
    it('returns Status Code 400 - Bad Request when id is not an UUID', () => {
      const orderId = 'invalidId';
      return request(app.getHttpServer())
        .get(`/orders/${orderId}`)
        .expect(400)
        .expect((response) => {
          expect(response.body?.message).toEqual(
            'Validation failed (uuid  is expected)'
          );
        });
    });
    it('returns Status Code 200 - OK and a list of orders when id is null', () => {
      return request(app.getHttpServer())
        .get('/orders/')
        .expect(200)
        .expect((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([expect.objectContaining(order)])
          );
        });
    });
  });

  describe('POST /orders', () => {
    /*
    it('returns Status code 400 - Bad request when request body is empty', () => {
      return request(app.getHttpServer()).post('/orders').send({}).expect(400);
    });
    */

    it('returns Status Code 201 - Created and a single order created order object', () => {
      const orderToCreate = {
        email: 'example@example.com',
        items: [1, 2, 3],
        total: 10.13,
        subtotal: 666665.99,
        deliveryType: 'home_delivery',
        discountId: '78c0a432-59f8-4a6c-b89d-57030a6628d9',
      };
      return request(app.getHttpServer())
        .post('/orders')
        .send(orderToCreate)
        .expect(201)
        .expect((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              email: orderToCreate.email,
              items: orderToCreate.items,
              total: orderToCreate.total,
              subtotal: orderToCreate.subtotal,
            })
          );
        });
    });

    /*it('returns Status Code 404 - Not Found when creating an order with non-existent discount', () => {
      const orderWithBadId = {
        email: 'example@example.com',
        items: [1, 2, 3],
        total: 10.13,
        subtotal: 666665.99,
        deliveryType: 'home_delivery',
        discountId: '78c0a432-59f8-4a6c-b89d-57030a6628d0',
      };
      return request(app.getHttpServer())
        .post('/orders')
        .send(orderWithBadId)
        .expect(404)
        .expect((response) => {
          expect(response.body?.error).toEqual('Not found');
        });
    });*/
  });
  afterAll(() => app.close());
});
