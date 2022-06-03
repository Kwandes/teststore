import { DeliveryTypeEnum, DiscountTypeEnum, IDiscount, IProduct } from '@interfaces';

// data for the 'calculateDeliveryPrice()' method of PriceCalculationService
export const calculateDeliveryPriceParams = [
  { deliveryType: DeliveryTypeEnum.homeDelivery, expectedPrice: 50 },
  { deliveryType: DeliveryTypeEnum.pickupPoint, expectedPrice: 25 },
  { deliveryType: DeliveryTypeEnum.selfPickup, expectedPrice: 0 },
];

// data for the 'calculateSUbtotal()' method of Price CalculationService
export const calculateSubtotalItems: { items: IProduct[], expectedPrice: number }[] = [
  {
    items: [{ id: 0, title: '', price: 100.10, description: '', category: '', image: '', rating: { rate: 0, count: 0 } }],
    expectedPrice: 100.10
  },
  {
    items: [
      { id: 0, title: '', price: 100.10, description: '', category: '', image: '', rating: { rate: 0, count: 0 } },
      { id: 1, title: '', price: 100.10, description: '', category: '', image: '', rating: { rate: 0, count: 0 } }
    ],
    expectedPrice: 200.20
  },
  {
    items: [
      { id: 0, title: '', price: 100.10, description: '', category: '', image: '', rating: { rate: 0, count: 0 } },
      { id: 1, title: '', price: 20.20, description: '', category: '', image: '', rating: { rate: 0, count: 0 } }
    ],
    expectedPrice: 120.30
  },
  { items: [], expectedPrice: 0 },
  {
    items: [{ id: 0, title: '', price: 0, description: '', category: '', image: '', rating: { rate: 0, count: 0 } }],
    expectedPrice: 0
  },
  {
    items: [{ id: 0, title: '', price: -100.10, description: '', category: '', image: '', rating: { rate: 0, count: 0 } }],
    expectedPrice: -100.10
  },
  {
    items: [
      { id: 0, title: '', price: -100.10, description: '', category: '', image: '', rating: { rate: 0, count: 0 } },
      { id: 1, title: '', price: -100.10, description: '', category: '', image: '', rating: { rate: 0, count: 0 } }
    ],
    expectedPrice: -200.20
  }
];

export const calculateDiscounts: { discount: IDiscount, subtotal: number, expectedReturnValue: { discountedAmount: number, savedAmount: number } }[] = [
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100,
      type: DiscountTypeEnum.amount,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true
    },
    subtotal: 1000,
    expectedReturnValue: {
      discountedAmount: 900,
      savedAmount: 100
    }
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100.10,
      type: DiscountTypeEnum.amount,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true
    },
    subtotal: 1000,
    expectedReturnValue: {
      discountedAmount: 899.90,
      savedAmount: 100.10
    }
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 10,
      type: DiscountTypeEnum.percentage,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true
    },
    subtotal: 1000,
    expectedReturnValue: {
      discountedAmount: 900,
      savedAmount: 100
    }
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100,
      type: DiscountTypeEnum.percentage,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true
    },
    subtotal: 1000,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 1000
    }
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100,
      type: DiscountTypeEnum.amount,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true
    },
    subtotal: 50,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 50
    }
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100.10,
      type: DiscountTypeEnum.amount,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true
    },
    subtotal: 50,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 50
    }
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 10,
      type: DiscountTypeEnum.percentage,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true
    },
    subtotal: 50,
    expectedReturnValue: {
      discountedAmount: 45,
      savedAmount: 5
    }
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100,
      type: DiscountTypeEnum.percentage,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true
    },
    subtotal: 50,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 50
    }
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100,
      type: DiscountTypeEnum.amount,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true
    },
    subtotal: 1000.10,
    expectedReturnValue: {
      discountedAmount: 900.10,
      savedAmount: 100
    }
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100.10,
      type: DiscountTypeEnum.amount,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true
    },
    subtotal: 1000.10,
    expectedReturnValue: {
      discountedAmount: 900,
      savedAmount: 100.10
    }
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 10,
      type: DiscountTypeEnum.percentage,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true
    },
    subtotal: 1000.10,
    expectedReturnValue: {
      discountedAmount: 900.09,
      savedAmount: 100.01
    }
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100,
      type: DiscountTypeEnum.percentage,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true
    },
    subtotal: 1000.10,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 1000.10
    }
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100,
      type: DiscountTypeEnum.amount,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true
    },
    subtotal: 0,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 0
    }
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100.10,
      type: DiscountTypeEnum.amount,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true
    },
    subtotal: 0,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 0
    }
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 10,
      type: DiscountTypeEnum.percentage,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true
    },
    subtotal: 0,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 0
    }
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100,
      type: DiscountTypeEnum.percentage,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true
    },
    subtotal: 0,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 0
    }
  }
];