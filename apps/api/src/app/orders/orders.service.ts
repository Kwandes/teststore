import {
  ICreateOrderRequest,
  IDiscount,
  IOrder,
  IUpdateOrderRequest,
} from '@interfaces';
import { Discount, Order } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepo: Repository<IOrder>,
    @InjectRepository(Discount)
    private readonly discountsRepo: Repository<IDiscount>
  ) {}

  /**
   * Find a singular order by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOne(id: string): Promise<IOrder> {
    return this.ordersRepo.findOneOrFail({
      where: { orderId: id },
      relations: ['discount'],
    });
  }

  /**
   * Find all orders.
   * @returns a list of orders.
   */
  async findAll(): Promise<IOrder[]> {
    return this.ordersRepo.find({ relations: ['discount'] });
  }

  /**
   * Update a Order by their id
   * @param id id of the entity
   * @param request information for order creation.
   * @returns entity or EntityNotFounderror
   */
  async update(id: string, request: IUpdateOrderRequest): Promise<IOrder> {
    const { email, items, total, subtotal, deliveryType, discountId } = request;

    const order = await this.ordersRepo.findOneOrFail({
      where: { orderId: id },
    });
    order.email = email;
    order.items = items;
    order.total = total;
    order.subtotal = subtotal;
    order.deliveryType = deliveryType;
    if (discountId) {
      const discount = await this.discountsRepo.findOneOrFail({
        where: { discountId: discountId },
      });
      order.discount = discount;
    }

    return this.ordersRepo.save(order);
  }

  /**
   * Create and persist a order entity.
   * @param request information for order creation.
   * @returns created order.
   */
  async create(request: ICreateOrderRequest) {
    const { email, items, total, subtotal, deliveryType, discountId } = request;

    const newOrder = await this.ordersRepo.create();
    newOrder.email = email;
    newOrder.items = items;
    newOrder.total = total;
    newOrder.subtotal = subtotal;
    newOrder.deliveryType = deliveryType;
    if (discountId) {
      const discount = await this.discountsRepo.findOneOrFail({
        where: { discountId: discountId },
      });
      newOrder.discount = discount;
    }
    return this.ordersRepo.save(newOrder);
  }

  /**
   * Delete a order entity by its id.
   * @param id id of the order.
   * @returns entity or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    const response = await this.ordersRepo.delete({
      orderId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(Order, id);
    }
  }
}
