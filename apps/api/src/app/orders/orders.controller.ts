import { CreateOrderRequest, IOrder } from '@interfaces';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
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
}
