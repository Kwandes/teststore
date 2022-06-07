import {
  DeliveryTypeEnum,
  DiscountTypeEnum,
  IDiscount,
  IProduct,
} from '@interfaces';

// data for the 'calculateDeliveryPrice()' method of PriceCalculationService
export const calculateDeliveryPriceParams = [
  { deliveryType: DeliveryTypeEnum.homeDelivery, expectedPrice: 50 },
  { deliveryType: DeliveryTypeEnum.pickupPoint, expectedPrice: 25 },
  { deliveryType: DeliveryTypeEnum.selfPickup, expectedPrice: 0 },
];

// data for the 'calculateSUbtotal()' method of Price CalculationService
export const calculateSubtotalItems: {
  items: IProduct[];
  expectedPrice: number;
}[] = [
  {
    items: [
      {
        id: 0,
        title: '',
        price: 200,
        description: '',
        category: '',
        image: '',
        rating: { rate: 0, count: 0 },
      },
    ],
    expectedPrice: 100.1,
  },
  {
    items: [
      {
        id: 0,
        title: '',
        price: 100.1,
        description: '',
        category: '',
        image: '',
        rating: { rate: 0, count: 0 },
      },
      {
        id: 1,
        title: '',
        price: 100.1,
        description: '',
        category: '',
        image: '',
        rating: { rate: 0, count: 0 },
      },
    ],
    expectedPrice: 200.2,
  },
  {
    items: [
      {
        id: 0,
        title: '',
        price: 100.1,
        description: '',
        category: '',
        image: '',
        rating: { rate: 0, count: 0 },
      },
      {
        id: 1,
        title: '',
        price: 20.2,
        description: '',
        category: '',
        image: '',
        rating: { rate: 0, count: 0 },
      },
    ],
    expectedPrice: 120.3,
  },
  { items: [], expectedPrice: 0 },
  {
    items: [
      {
        id: 0,
        title: '',
        price: 0,
        description: '',
        category: '',
        image: '',
        rating: { rate: 0, count: 0 },
      },
    ],
    expectedPrice: 0,
  },
  {
    items: [
      {
        id: 0,
        title: '',
        price: -100.1,
        description: '',
        category: '',
        image: '',
        rating: { rate: 0, count: 0 },
      },
    ],
    expectedPrice: -100.1,
  },
  {
    items: [
      {
        id: 0,
        title: '',
        price: -100.1,
        description: '',
        category: '',
        image: '',
        rating: { rate: 0, count: 0 },
      },
      {
        id: 1,
        title: '',
        price: -100.1,
        description: '',
        category: '',
        image: '',
        rating: { rate: 0, count: 0 },
      },
    ],
    expectedPrice: -200.2,
  },
];

export const calculateDiscounts: {
  discount: IDiscount;
  subtotal: number;
  expectedReturnValue: { discountedAmount: number; savedAmount: number };
}[] = [
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100,
      type: DiscountTypeEnum.amount,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true,
    },
    subtotal: 1000,
    expectedReturnValue: {
      discountedAmount: 900,
      savedAmount: 100,
    },
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100.1,
      type: DiscountTypeEnum.amount,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true,
    },
    subtotal: 1000,
    expectedReturnValue: {
      discountedAmount: 899.9,
      savedAmount: 100.1,
    },
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 10,
      type: DiscountTypeEnum.percentage,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true,
    },
    subtotal: 1000,
    expectedReturnValue: {
      discountedAmount: 900,
      savedAmount: 100,
    },
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100,
      type: DiscountTypeEnum.percentage,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true,
    },
    subtotal: 1000,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 1000,
    },
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100,
      type: DiscountTypeEnum.amount,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true,
    },
    subtotal: 50,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 50,
    },
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100.1,
      type: DiscountTypeEnum.amount,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true,
    },
    subtotal: 50,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 50,
    },
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 10,
      type: DiscountTypeEnum.percentage,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true,
    },
    subtotal: 50,
    expectedReturnValue: {
      discountedAmount: 45,
      savedAmount: 5,
    },
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100,
      type: DiscountTypeEnum.percentage,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true,
    },
    subtotal: 50,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 50,
    },
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100,
      type: DiscountTypeEnum.amount,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true,
    },
    subtotal: 1000.1,
    expectedReturnValue: {
      discountedAmount: 900.1,
      savedAmount: 100,
    },
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100.1,
      type: DiscountTypeEnum.amount,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true,
    },
    subtotal: 1000.1,
    expectedReturnValue: {
      discountedAmount: 900,
      savedAmount: 100.1,
    },
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 10,
      type: DiscountTypeEnum.percentage,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true,
    },
    subtotal: 1000.1,
    expectedReturnValue: {
      discountedAmount: 900.09,
      savedAmount: 100.01,
    },
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100,
      type: DiscountTypeEnum.percentage,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true,
    },
    subtotal: 1000.1,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 1000.1,
    },
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100,
      type: DiscountTypeEnum.amount,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true,
    },
    subtotal: 0,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 0,
    },
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100.1,
      type: DiscountTypeEnum.amount,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true,
    },
    subtotal: 0,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 0,
    },
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 10,
      type: DiscountTypeEnum.percentage,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true,
    },
    subtotal: 0,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 0,
    },
  },
  {
    discount: {
      discountId: '',
      code: '',
      amount: 100,
      type: DiscountTypeEnum.percentage,
      remainingUses: 0,
      startsAt: new Date(),
      isEnabled: true,
    },
    subtotal: 0,
    expectedReturnValue: {
      discountedAmount: 0,
      savedAmount: 0,
    },
  },
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const emptyItemSet: IProduct[] = [];

const oneItemSet: IProduct[] = [
  {
    id: 0,
    title: '',
    price: 100,
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 },
  },
];

const twoSetItemDiff: IProduct[] = [
  {
    id: 0,
    title: '',
    price: 100,
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 },
  },
  {
    id: 1,
    title: '',
    price: 200,
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 },
  },
];

const twoSetItemSame: IProduct[] = [
  {
    id: 0,
    title: '',
    price: 100,
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 },
  },
  {
    id: 1,
    title: '',
    price: 100,
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 },
  },
];

const discountAmount100: IDiscount = {
  discountId: '',
  code: '',
  amount: 100,
  type: DiscountTypeEnum.amount,
  remainingUses: 0,
  startsAt: new Date(),
  isEnabled: true,
};

const discountAmount10: IDiscount = {
  discountId: '',
  code: '',
  amount: 10,
  type: DiscountTypeEnum.amount,
  remainingUses: 0,
  startsAt: new Date(),
  isEnabled: true,
};

const discountAmount0: IDiscount = {
  discountId: '',
  code: '',
  amount: 0,
  type: DiscountTypeEnum.amount,
  remainingUses: 0,
  startsAt: new Date(),
  isEnabled: true,
};

const discountPerc100: IDiscount = {
  discountId: '',
  code: '',
  amount: 100,
  type: DiscountTypeEnum.percentage,
  remainingUses: 0,
  startsAt: new Date(),
  isEnabled: true,
};

const discountPerc10: IDiscount = {
  discountId: '',
  code: '',
  amount: 10,
  type: DiscountTypeEnum.percentage,
  remainingUses: 0,
  startsAt: new Date(),
  isEnabled: true,
};

const discountPerc0: IDiscount = {
  discountId: '',
  code: '',
  amount: 0,
  type: DiscountTypeEnum.percentage,
  remainingUses: 0,
  startsAt: new Date(),
  isEnabled: true,
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const calculateTotal: {
  items: IProduct[];
  deliveryType: DeliveryTypeEnum;
  discount?: IDiscount;
  expectedReturnValue: {
    subtotal: number;
    deliveryPrice: number;
    youSave: number;
    total: number;
  };
}[] = [
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 50,
      youSave: 0,
      total: 150,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountAmount100,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 50,
      youSave: 100,
      total: 50,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountAmount10,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 50,
      youSave: 10,
      total: 140,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountAmount0,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 50,
      youSave: 0,
      total: 150,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountPerc100,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 50,
      youSave: 100,
      total: 50,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountPerc10,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 50,
      youSave: 10,
      total: 140,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountPerc0,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 50,
      youSave: 0,
      total: 150,
    },
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 25,
      youSave: 0,
      total: 125,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountAmount100,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 25,
      youSave: 100,
      total: 25,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountAmount10,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 25,
      youSave: 10,
      total: 115,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountAmount0,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 25,
      youSave: 0,
      total: 125,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountPerc100,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 25,
      youSave: 100,
      total: 25,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountPerc10,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 25,
      youSave: 10,
      total: 115,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountPerc0,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 25,
      youSave: 0,
      total: 125,
    },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.selfPickup,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 0,
      youSave: 0,
      total: 100,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountAmount100,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 0,
      youSave: 100,
      total: 0,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountAmount10,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 0,
      youSave: 10,
      total: 90,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountAmount0,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 0,
      youSave: 0,
      total: 100,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountPerc100,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 0,
      youSave: 100,
      total: 0,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountPerc10,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 0,
      youSave: 10,
      total: 90,
    },
  },
  {
    items: oneItemSet,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountPerc0,
    expectedReturnValue: {
      subtotal: 100,
      deliveryPrice: 0,
      youSave: 0,
      total: 100,
    },
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////  100 + 200   //////////////////////////////////////////////////////////////
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 50,
      youSave: 0,
      total: 350,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountAmount100,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 50,
      youSave: 100,
      total: 250,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountAmount10,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 50,
      youSave: 10,
      total: 340,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountAmount0,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 50,
      youSave: 0,
      total: 350,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountPerc100,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 50,
      youSave: 300,
      total: 50,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountPerc10,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 50,
      youSave: 30,
      total: 320,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountPerc0,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 50,
      youSave: 0,
      total: 350,
    },
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 25,
      youSave: 0,
      total: 325,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountAmount100,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 25,
      youSave: 100,
      total: 225,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountAmount10,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 25,
      youSave: 10,
      total: 315,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountAmount0,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 25,
      youSave: 0,
      total: 325,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountPerc100,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 25,
      youSave: 300,
      total: 25,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountPerc10,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 25,
      youSave: 30,
      total: 295,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountPerc0,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 25,
      youSave: 0,
      total: 325,
    },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.selfPickup,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 0,
      youSave: 0,
      total: 300,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountAmount100,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 0,
      youSave: 100,
      total: 200,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountAmount10,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 0,
      youSave: 10,
      total: 290,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountAmount0,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 0,
      youSave: 0,
      total: 300,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountPerc100,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 0,
      youSave: 300,
      total: 0,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountPerc10,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 0,
      youSave: 30,
      total: 270,
    },
  },
  {
    items: twoSetItemDiff,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountPerc0,
    expectedReturnValue: {
      subtotal: 300,
      deliveryPrice: 0,
      youSave: 0,
      total: 300,
    },
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////// 100 + 100  ///////////////////////////////////////////////////////////
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 50,
      youSave: 0,
      total: 250,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountAmount100,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 50,
      youSave: 100,
      total: 150,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountAmount10,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 50,
      youSave: 10,
      total: 240,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountAmount0,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 50,
      youSave: 0,
      total: 250,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountPerc100,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 50,
      youSave: 200,
      total: 50,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountPerc10,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 50,
      youSave: 20,
      total: 230,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountPerc0,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 50,
      youSave: 0,
      total: 250,
    },
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 25,
      youSave: 0,
      total: 225,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountAmount100,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 25,
      youSave: 100,
      total: 125,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountAmount10,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 25,
      youSave: 10,
      total: 215,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountAmount0,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 25,
      youSave: 0,
      total: 225,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountPerc100,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 25,
      youSave: 200,
      total: 25,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountPerc10,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 25,
      youSave: 20,
      total: 205,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountPerc0,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 25,
      youSave: 0,
      total: 225,
    },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.selfPickup,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 0,
      youSave: 0,
      total: 200,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountAmount100,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 0,
      youSave: 100,
      total: 100,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountAmount10,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 0,
      youSave: 10,
      total: 190,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountAmount0,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 0,
      youSave: 0,
      total: 200,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountPerc100,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 0,
      youSave: 200,
      total: 0,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountPerc10,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 0,
      youSave: 20,
      total: 180,
    },
  },
  {
    items: twoSetItemSame,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountPerc0,
    expectedReturnValue: {
      subtotal: 200,
      deliveryPrice: 0,
      youSave: 0,
      total: 200,
    },
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////     []       /////////////////////////////////////////////////////
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 50,
      youSave: 0,
      total: 50,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountAmount100,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 50,
      youSave: 0,
      total: 50,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountAmount10,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 50,
      youSave: 0,
      total: 50,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountAmount0,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 50,
      youSave: 0,
      total: 50,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountPerc100,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 50,
      youSave: 0,
      total: 50,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountPerc10,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 50,
      youSave: 0,
      total: 50,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.homeDelivery,
    discount: discountPerc0,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 50,
      youSave: 0,
      total: 50,
    },
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 25,
      youSave: 0,
      total: 25,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountAmount100,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 25,
      youSave: 0,
      total: 25,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountAmount10,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 25,
      youSave: 0,
      total: 25,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountAmount0,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 25,
      youSave: 0,
      total: 25,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountPerc100,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 25,
      youSave: 0,
      total: 25,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountPerc10,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 25,
      youSave: 0,
      total: 25,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.pickupPoint,
    discount: discountPerc0,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 25,
      youSave: 0,
      total: 25,
    },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.selfPickup,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 0,
      youSave: 0,
      total: 0,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountAmount100,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 0,
      youSave: 0,
      total: 0,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountAmount10,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 0,
      youSave: 0,
      total: 0,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountAmount0,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 0,
      youSave: 0,
      total: 0,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountPerc100,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 0,
      youSave: 0,
      total: 0,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountPerc10,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 0,
      youSave: 0,
      total: 0,
    },
  },
  {
    items: emptyItemSet,
    deliveryType: DeliveryTypeEnum.selfPickup,
    discount: discountPerc0,
    expectedReturnValue: {
      subtotal: 0,
      deliveryPrice: 0,
      youSave: 0,
      total: 0,
    },
  },
];
