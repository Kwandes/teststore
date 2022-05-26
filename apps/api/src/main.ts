/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { EntityNotFoundExceptionFilter } from './app/shared/filters/entity-not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
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
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.warn(
    `T̸̛̙̞͔̩̦̺̪͇̬̫͙͓̺͌̈́̂̓͐̇͒̽̓̓̋̕̕h̵̙̰̪̳͛̀̇͛̂̚ȅ̷͚͓͉͕͇̲̻̬̹̹̪̽̊̉͜ ̷̧̫̘̱̮͙͕̹͇̺͇́̍͊͗F̶̛̝̭͔̠̠̯͎͆̾̔̃̇i̸̧͖͈̖̫̰̲̳̮̘̻̞̦̙̇̓̀̎̓̑̏̑͐̔̒͗͜t̶̨̬̤͈͓̥̤͉̗̏͜n̸̛̥̩͖̠̖͖̺̫̓̅̅̽̂̄̐͂̎̀̕̚̕e̷̡̺̦̦̫̼̝̞͙̫͔̮̫͇̋̇́͌̑̽͐͂͂̔̕͜ṡ̴̥̟͇̞̗́̀̑s̸̰͍̱̘͋G̴̪̏̒̉͊̌̽̿r̵͇̘͉̺̜̲̲̥̦̂͆̑̉͋́̊͂̑́͝͠a̶̧̡̼̩͕̐͒͛̐̄̓̽̎͠m̴̡̨̛͕̺͓͇̰͖̠̦̬̈́̑̈́̃̈̇͑̎̂̅͘™̴̞͂̈́́̂̀̃́̏͆̌̚ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues...`
  );
}

bootstrap();
