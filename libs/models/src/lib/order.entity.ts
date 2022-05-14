import { DeliveryTypeEnum, IOrder } from '@interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';
import { Discount } from './discount.entity';

@Entity('orders')
export class Order extends Base implements IOrder {
  @PrimaryGeneratedColumn('uuid')
  orderId!: string;

  @Column({ length: 254 })
  email!: string;

  @Column('int', { array: true })
  items!: number[];

  // the price customer pays after the discount and other modifiers get applied
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total!: number;

  // raw price of the items without any other modifiers and shipping costs
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal!: number;

  @Column({ type: 'enum', enum: DeliveryTypeEnum })
  deliveryType!: DeliveryTypeEnum;

  @ManyToOne(() => Discount, {
    onDelete: 'SET NULL',
    nullable: true,
  }) // when associated discount gets delated, the orer should get it set to null
  discount?: Discount;
}
