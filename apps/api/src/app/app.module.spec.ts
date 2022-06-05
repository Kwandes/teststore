import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';

describe('App', () => {
  let app: TestingModule;
  beforeAll(async () => {
    app = await Test.createTestingModule({
      // Declare the database connection
      imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig())],
    }).compile();
  });

  // The test can be broken by prividing invalid environment variable values in the .env file (or simply not having a database running)
  it('should connect to the database via TypeOrm', async () => {
    // The app will not be defined if it fails to connect to the database and as the result the test will time out
    expect(app).toBeDefined();
  });

  // The test will give the following message on a failed run since the app does not get defined
  // "A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown.
  // Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them."
  afterAll(async () => await app.close());
});
