import { DiscountTypeEnum, IDiscount } from '@interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';

@Entity('discounts')
export class Discount extends Base implements IDiscount {
  @PrimaryGeneratedColumn('uuid')
  discountId!: string;

  @Column({ length: 50 })
  code!: string;

  @Column()
  amount!: number;

  @Column({ type: 'enum', enum: DiscountTypeEnum })
  type!: DiscountTypeEnum;

  @Column()
  remainingUses!: number;

  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  startsAt!: Date;

  @Column({ nullable: true })
  expiresAt?: Date;

  @Column()
  isEnabled!: boolean;
}
