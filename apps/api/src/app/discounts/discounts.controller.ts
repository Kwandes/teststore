import {
  CreateDiscountRequest,
  IDiscount,
  UpdateDiscountRequest,
} from '@interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DiscountsService } from './discounts.service';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Get('')
  async getAll(): Promise<IDiscount[]> {
    return this.discountsService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: string): Promise<IDiscount> {
    return this.discountsService.findOne(id);
  }

  @Post('')
  create(@Body() createRequest: CreateDiscountRequest): Promise<IDiscount> {
    return this.discountsService.create(createRequest);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createRequest: UpdateDiscountRequest
  ): Promise<IDiscount> {
    return this.discountsService.update(id, createRequest);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.discountsService.perish(id);
  }
}
