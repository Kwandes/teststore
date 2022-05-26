import { IDiscount } from '@interfaces';
import { Controller, Get, Param } from '@nestjs/common';
import { DiscountsService } from './discounts.service';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Get('')
  async getAll(): Promise<IDiscount[]> {
    return this.discountsService.findAll();
  }

  @Get(':code')
  get(@Param('code') code: string): Promise<IDiscount> {
    return this.discountsService.findOneByCode(code);
  }
}
