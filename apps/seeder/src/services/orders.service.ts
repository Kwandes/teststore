import { IOrder } from '@interfaces';
import { Order } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { orders } from '../constants/orders.constant';

@Injectable()
export class OrdersSeederService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  create(): Array<Promise<Order>> {
    return orders.map(async (order: IOrder) => {
      try {
        return await this.orderRepository.save(order);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
