import { ICreateOrderRequest, IDiscount, IOrder } from '@interfaces';
import { Discount, Order } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';

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
   * Create and persist a order entity.
   * @param request information for order creation.
   * @returns created order.
   */
  async create(request: ICreateOrderRequest): Promise<IOrder> {
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
}
