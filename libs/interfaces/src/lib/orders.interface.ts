import { IBase } from './base.interface';
import { DeliveryTypeEnum } from './delivery-type.enum';
import { IDiscount } from './discounts.interface';

export interface IOrder extends IBase {
  orderId: string;
  email: string;
  items: number[];
  total: number;
  subtotal: number;
  deliveryType: DeliveryTypeEnum;
  discount?: IDiscount;
}

export interface ICreateOrderRequest {
  email: string;
  items: number[];
  total: number;
  subtotal: number;
  deliveryType: DeliveryTypeEnum;
  discountId?: string;
}

export interface IUpdateOrderRequest {
  email: string;
  items: number[];
  total: number;
  subtotal: number;
  deliveryType: DeliveryTypeEnum;
  discountId?: string;
}
