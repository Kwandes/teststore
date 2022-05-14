import { IBase } from './base.interface';
import { DiscountTypeEnum } from './discount-type.enum';

export interface IDiscount extends IBase {
  discountId: string;
  code: string;
  amount: number;
  type: DiscountTypeEnum;
  remainingUses: number;
  startsAt: Date;
  expiresAt?: Date;
  isEnabled: boolean;
}

export interface ICreateDiscountRequest {
  code: string;
  amount: number;
  type: DiscountTypeEnum;
  remainingUses: number;
  startsAt?: Date;
  expiresAt?: Date;
  isEnabled: boolean;
}

export interface IUpdateDiscountRequest {
  code: string;
  amount: number;
  type: DiscountTypeEnum;
  remainingUses: number;
  startsAt?: Date;
  expiresAt?: Date;
  isEnabled: boolean;
}
