import { DeliveryTypeEnum, IOrder } from '@interfaces';
import { DiscountTypeEnum, IDiscount } from '@interfaces';

export const discounts: IDiscount[] = [
  {
    discountId: '78c0a432-59f8-4a6c-b89d-57030a6628d9',
    code: 'discount-100',
    amount: 100,
    type: DiscountTypeEnum.amount,
    remainingUses: 100,
    startsAt: new Date('1977-12-26 12:30:00'),
    isEnabled: true,
  },
  {
    discountId: 'b43eba0f-3a6e-4864-8206-89880e78b4d3',
    code: 'discount-666666',
    amount: 666666,
    type: DiscountTypeEnum.amount,
    remainingUses: 100,
    startsAt: new Date('1977-12-26 12:30:00'),
    isEnabled: true,
  },
  {
    discountId: '2df8ea99-bcf0-47ec-a6b3-388e8a9e3e74',
    code: 'discount-10-percent',
    amount: 10,
    type: DiscountTypeEnum.percentage,
    remainingUses: 100,
    startsAt: new Date('2020-3-13 12:30:00'),
    isEnabled: true,
  },
  {
    discountId: 'a7f0b654-dea1-404c-a725-3e0046c459a4',
    code: 'discount-100-percent',
    amount: 100,
    type: DiscountTypeEnum.percentage,
    remainingUses: 100,
    startsAt: new Date('2020-3-13 12:30:00'),
    isEnabled: true,
  },
  {
    discountId: '1d7d4480-1753-4846-b05d-37fe678256ed',
    code: 'discount-expired',
    amount: 100,
    type: DiscountTypeEnum.amount,
    remainingUses: 100,
    startsAt: new Date('2012-12-21 08:30:00'),
    expiresAt: new Date('2012-12-21 23:59:59'),
    isEnabled: true,
  },
  {
    discountId: '73b993b4-e793-47cb-89d0-cd1aefed53f6',
    code: 'discount-not-started',
    amount: 100,
    type: DiscountTypeEnum.amount,
    remainingUses: 100,
    startsAt: new Date('2112-12-21 21:12:21'),
    isEnabled: true,
  },
  {
    discountId: '8187f8a3-06c2-4982-ae82-fc547efd27f4',
    code: 'discount-disabled',
    amount: 100,
    type: DiscountTypeEnum.amount,
    remainingUses: 100,
    startsAt: new Date('1974-02-08 00:00:01'),
    isEnabled: false,
  },
  {
    discountId: 'a82a71e7-5012-4b57-8780-c7b598ff99d6',
    code: 'discount-no-uses',
    amount: 100,
    type: DiscountTypeEnum.amount,
    remainingUses: 0,
    startsAt: new Date('2022-01-01 10:10:10'),
    isEnabled: false,
  },
];

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
