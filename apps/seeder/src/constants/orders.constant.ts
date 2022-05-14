import { DeliveryTypeEnum, IOrder } from '@interfaces';
import { discounts } from './discounts.constant';

/**
 * Products from the API (https://fakestoreapi.com/docs)
 * ID - Price
 * 1 - 109.95
 * 2 - 22.30
 * 3 - 55.99
 * 4 - 15.99
 * 5 - 695
 * 6 - 168
 * 7 - 9.99
 * 8 - 10.99
 * 9 - 64
 * 10 - 109
 * 11 - 109
 * 12 - 114
 * 13 - 599
 * 14 - 999.99
 * 15 - 56.99
 * 16 - 29.95
 * 17 - 39.99
 * 18 - 9.85
 * 19 - 7.95
 * 20 - 12.99
 */

/**
 * Delivery pricing
 * Home delivery: 10
 * Pickup point: 5
 * Self Pickup: 0
 */

export const orders: IOrder[] = [
  {
    orderId: 'ceddebe5-d502-4b19-8dea-32623fab7846',
    email: 'oneItem@noDiscount.home',
    items: [1],
    total: 109.95,
    subtotal: 119.95,
    deliveryType: DeliveryTypeEnum.homeDelivery,
  },
  {
    orderId: 'd5d41ec8-23eb-4cd2-a318-8d035ea6f142',
    email: 'oneItem@noDiscount.pickup',
    items: [1],
    total: 109.95,
    subtotal: 114.95,
    deliveryType: DeliveryTypeEnum.pickupPoint,
  },
  {
    orderId: '4634eee7-5950-4bdf-b57b-9e36c30bb794',
    email: 'oneItem@noDiscount.self',
    items: [1],
    total: 109.95,
    subtotal: 109.95,
    deliveryType: DeliveryTypeEnum.selfPickup,
  },
  {
    orderId: '59956e09-3bd0-413c-bf2a-82b3e63ed0cb',
    email: 'fiveItems@noDiscount.home',
    items: [1, 1, 2, 3, 4],
    total: 314.18,
    subtotal: 324.18,
    deliveryType: DeliveryTypeEnum.homeDelivery,
  },
  {
    orderId: 'd6322630-9b0e-4262-baaa-cd30e99057a5',
    email: 'oneItem@noDiscount.pickup',
    items: [1, 1, 2, 3, 4],
    total: 314.18,
    subtotal: 319.18,
    deliveryType: DeliveryTypeEnum.pickupPoint,
  },
  {
    orderId: '987c5136-cda2-4380-b81c-473fe3d5a6d9',
    email: 'oneItem@noDiscount.self',
    items: [1, 1, 2, 3, 4],
    total: 314.18,
    subtotal: 314.18,
    deliveryType: DeliveryTypeEnum.selfPickup,
  },
  {
    orderId: 'a46d3500-993e-40e7-ab13-3b943519bd15',
    email: 'fiveItems@discountAmount.home',
    items: [1, 1, 2, 3, 4],
    total: 314.18,
    subtotal: 224.18,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discounts[0], // amount, 100
  },
  {
    orderId: 'aaa7b1a6-7963-4f26-a1a9-d5341115af68',
    email: 'fiveItems@discountPercentage.home',
    items: [1, 1, 2, 3, 4],
    total: 314.18,
    subtotal: 292.77, // 314.18 * 100 = 282.782, round up, add 10 from delivery
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discounts[2], // percentage, 10%
  },
  {
    orderId: '26ee7ee2-0c5d-4573-9cb4-209356cd067a',
    email: 'fiveItems@discount666666.home',
    items: [1, 1, 2, 3, 4],
    total: 314.18,
    subtotal: 10, // just delivery price
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discounts[1], // amount, 666666
  },
  {
    orderId: '51931e62-ea2e-4483-9229-21abb8135919',
    email: 'fiveItems@discountNowExpired.home',
    items: [1, 1, 2, 3, 4],
    total: 314.18,
    subtotal: 224.18, // -100 from discount, +10 delivery
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discounts[4], // amount, 100, expired (order still exists)
  },
];
