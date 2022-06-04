import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { configService } from '../src/app/config/config.service';
import { products } from '../src/app/products/products.constant';

// set the timeout to cover request that take longer to perform
jest.setTimeout(30000);

describe('AppController (e2e)', () => {
  let app: INestApplication; // reference to the app instance

  beforeAll(async () => {
    // Initialize the testing module based on the AppModule and setup all of its dependencies
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        // Even though the endpoints called by these tests don't require a database connection, the app itself needs it in order to be initalized for the E2E test
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
      ],
    }).compile();

    // Start the Nestjs app instance to perform requests on
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /products', () => {
    it('returns Status Code 200 - OK and a list of products', () => {
      return request(app.getHttpServer())
        .get('/products')
        .expect(200) // verify HTTP code
        .expect((response) => {
          // verify response body
          expect(response.body).toEqual(products);
        });
    });

    // TODO - implement test
    it('returns Status Code 500 - Internal Server Error when request fails', () => {});
  });

  describe('GET /products/:id', () => {
    it('returns Status Code 200 - OK and a single product', () => {
      const productId = '1'; // Corresponds to products[0]
      return request(app.getHttpServer())
        .get(`/products/${productId}`)
        .expect(200) // verify HTTP code
        .expect((response) => {
          // verify response body
          expect(response.body).toEqual(products[0]);
        });
    });
    // TODO - implement test
    it('returns Status Code 404 - Not Found when id references a non-existent product', () => {});
    // TODO - implement test
    it('returns Status Code 400 - Bad Request when id is not a number', () => {});
    // TODO - implement test
    it('returns Status Code 200 - OK and a list of products when id is null', () => {});
    // TODO - implement test
    it('returns Status Code 500 - Internal Server Error when request fails', () => {});
  });

  // Teardown down the app after the tests to avoid open handles
  afterAll(() => app.close());
});
