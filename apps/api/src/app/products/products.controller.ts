import { IProduct } from '@interfaces';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  getAll(): Observable<IProduct[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: string): Promise<IProduct> {
    return this.productsService.findOne(id);
  }
}
