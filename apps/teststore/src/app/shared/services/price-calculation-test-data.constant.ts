import { DeliveryTypeEnum, IProduct } from '@interfaces';

// data for the 'calculateDeliveryPrice()' method of PriceCalculationService
export const calculateDeliveryPriceParams = [
  { delieryType: DeliveryTypeEnum.homeDelivery, expectedPrice: 50 },
  { delieryType: DeliveryTypeEnum.pickupPoint, expectedPrice: 25 },
  { delieryType: DeliveryTypeEnum.selfPickup, expectedPrice: 0 },
];

// data for the 'calculateSUbtotal()' method of Price CalculationService
export const calculateSubtotalItems: { items: IProduct[], expectedPrice: number }[] = [
  { items: [{ id: 0, title: '', price: 100.10, description: '', category: '', image: '', rating: {rate: 0, count: 0} }], 
    expectedPrice: 100.10 
  },
  { items: [
      { id: 0, title: '', price: 100.10, description: '', category: '', image: '', rating: {rate: 0, count: 0} },
      { id: 1, title: '', price: 100.10, description: '', category: '', image: '', rating: {rate: 0, count: 0} }
    ], 
    expectedPrice: 200.20 
  },
  { items: [
    { id: 0, title: '', price: 100.10, description: '', category: '', image: '', rating: {rate: 0, count: 0} },
    { id: 1, title: '', price: 20.20, description: '', category: '', image: '', rating: {rate: 0, count: 0} }
  ], 
  expectedPrice: 120.30 
  },
  { items: [], expectedPrice: 0 },
  { items: [{ id: 0, title: '', price: 0, description: '', category: '', image: '', rating: {rate: 0, count: 0} }], 
    expectedPrice: 0 
  },
  { items: [{ id: 0, title: '', price: -100.10, description: '', category: '', image: '', rating: {rate: 0, count: 0} }], 
    expectedPrice: -100.10 
  },
  { items: [
    { id: 0, title: '', price: -100.10, description: '', category: '', image: '', rating: {rate: 0, count: 0} },
    { id: 1, title: '', price: -100.10, description: '', category: '', image: '', rating: {rate: 0, count: 0} }
  ], 
  expectedPrice: -200.20 
  }
];

