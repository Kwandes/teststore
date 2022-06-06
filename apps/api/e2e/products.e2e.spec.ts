import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { configService } from '../src/app/config/config.service';
import { products } from '../src/app/products/products.constant';
import { EntityNotFoundExceptionFilter } from '../src/app/shared/filters/entity-not-found-exception.filter';

// set the timeout to cover request that take longer to perform
jest.setTimeout(30000);

describe('ProductsController (e2e)', () => {
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

    // TODO - implement test. Potentially impossible and instead should be performed as a manual test
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
    it('returns Status Code 404 - Not Found when id references a non-existent product', () => {
      const productId = '666666'; // Doesn't match any product
      return request(app.getHttpServer())
        .get(`/products/${productId}`)
        .expect(404) // verify HTTP code
        .expect((response) => {
          // verify response body
          expect(response.body?.message).toEqual(
            `Product with id ${productId} not found`
          );
        });
    });
    it('returns Status Code 400 - Bad Request when id is not a number', () => {
      const productId = 'invalidId'; // Invalid id
      return request(app.getHttpServer())
        .get(`/products/${productId}`)
        .expect(400) // verify HTTP code
        .expect((response) => {
          // verify response body
          expect(response.body?.message).toEqual(
            'Validation failed (numeric string is expected)'
          );
        });
    });
    it('returns Status Code 200 - OK and a list of products when id is null', () => {
      return request(app.getHttpServer())
        .get('/products/')
        .expect(200) // verify HTTP code
        .expect((response) => {
          // verify response body
          expect(response.body).toEqual(products);
        });
    });
    // TODO - implement test. Potentially impossible and instead should be performed as a manual test
    it('returns Status Code 500 - Internal Server Error when request fails', () => {});
  });

  // Teardown down the app after the tests to avoid open handles
  afterAll(() => app.close());
});
