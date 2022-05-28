import { Injectable } from '@angular/core';
import { DeliveryTypeEnum } from '@interfaces';

@Injectable({
  providedIn: 'root',
})
export class PriceCalculationService {
  /**
   * Get the price of the given delivery type.\
   * If the type doesn't match anything it returns 404.
   * @param deliveryType deliery type.
   * @returns price of the given delivery type.
   */
  calculateDeliveryPrice(deliveryType: DeliveryTypeEnum): number {
    switch (deliveryType) {
      case DeliveryTypeEnum.homeDelivery:
        return 50;
      case DeliveryTypeEnum.pickupPoint:
        return 25;
      case DeliveryTypeEnum.selfPickup:
        return 0;
      default:
        return 404;
    }
  }
}
