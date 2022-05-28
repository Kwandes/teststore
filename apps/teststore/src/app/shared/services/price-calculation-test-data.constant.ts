import { DeliveryTypeEnum } from '@interfaces';

// data for the 'calculateDeliveryPrice()' method of PriceCalculationService
export const calculateDeliveryPriceParams = [
  { delieryType: DeliveryTypeEnum.homeDelivery, expectedPrice: 50 },
  { delieryType: DeliveryTypeEnum.pickupPoint, expectedPrice: 25 },
  { delieryType: DeliveryTypeEnum.selfPickup, expectedPrice: 0 },
];
