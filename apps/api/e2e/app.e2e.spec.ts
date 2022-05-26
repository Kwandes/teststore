import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication; // reference to the app instance

  beforeEach(async () => {
    // Initialize the testing module based on the AppModule and setup all of its dependencies
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // Start the Nestjs app instance to perform requests on
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /hello returns Welcome to API message', () => {
    return request(app.getHttpServer())
      .get('/hello')
      .expect(200) // verify HTTP code
      .expect((response) => {
        // verify response body
        expect(response.body).toHaveProperty('message');
        expect(response.body?.message).toEqual('Welcome to api!');
      });
  });

  // Teardown down the app after the tests to avoid open handles
  afterAll(() => {
    app.close();
  });
});
