import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  // the fakestoreapi.com often has 10 second+ response times
  imports: [HttpModule.register({ timeout: 30000, maxRedirects: 5 })],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
