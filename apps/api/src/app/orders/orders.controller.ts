import { CreateOrderRequest, IOrder, UpdateOrderRequest } from '@interfaces';
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
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('')
  async getAll(): Promise<IOrder[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: string): Promise<IOrder> {
    return this.ordersService.findOne(id);
  }

  @Post('')
  create(@Body() createRequest: CreateOrderRequest): Promise<IOrder> {
    return this.ordersService.create(createRequest);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createRequest: UpdateOrderRequest
  ): Promise<IOrder> {
    return this.ordersService.update(id, createRequest);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.ordersService.perish(id);
  }
}
