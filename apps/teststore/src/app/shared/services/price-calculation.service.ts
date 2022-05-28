import { Injectable } from '@angular/core';
import {
  DeliveryTypeEnum,
  DiscountTypeEnum,
  IDiscount,
  IProduct,
} from '@interfaces';

export interface IPricingInfo {
  subtotal: number;
  youSave: number;
  deliveryPrice: number;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class PriceCalculationService {
  // TODO - write tests for PriceCalculationService

  /**
   * Calc
   * @param items
   * @param discount
   * @param deliveryType
   * @returns
   */
  calculateTotal(
    items: IProduct[],
    deliveryType: DeliveryTypeEnum,
    discount?: IDiscount
  ): IPricingInfo {
    const subtotal = this.calculateSubtotal(items);
    const deliveryPrice = this.calculateDeliveryPrice(deliveryType);
    const calculatedDiscount = discount
      ? this.calulcateDiscount(discount, subtotal)
      : { discountedAmount: subtotal, savedAmount: 0 };
    return {
      subtotal,
      deliveryPrice,
      youSave: calculatedDiscount.savedAmount,
      total: this.roundToTwoDecimalPlaces(
        calculatedDiscount.discountedAmount + deliveryPrice
      ),
    };
  }

  /**
   * Get the discounted amount and how much is saved when a discount is applied to a subtotal.
   * @param discount discount object.
   * @param subtotal subtotal.
   * @returns discount amount and saved amount.
   */
  calulcateDiscount(
    discount: IDiscount,
    subtotal: number
  ): { discountedAmount: number; savedAmount: number } {
    let discountedAmount = 0;
    switch (discount.type) {
      case DiscountTypeEnum.amount:
        discountedAmount = subtotal - discount.amount;
        break;
      case DiscountTypeEnum.percentage: {
        // multiply the subtotal by the discount amount and then round it to two decimal places
        discountedAmount = this.roundToTwoDecimalPlaces(
          (subtotal * (100 - discount.amount)) / 100
        );
        break;
      }
    }

    if (discountedAmount < 0) discountedAmount = 0;
    return {
      discountedAmount,
      savedAmount: this.roundToTwoDecimalPlaces(subtotal - discountedAmount),
    };
  }

  /**
   * Get the subtotal for the given products list.
   * @param items product items.
   * @returns calculated price.
   */
  calculateSubtotal(items: IProduct[]): number {
    let subtotal = 0;
    items.forEach((item) => {
      subtotal += item.price;
    });
    return this.roundToTwoDecimalPlaces(subtotal);
  }

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

  private roundToTwoDecimalPlaces(number: number): number {
    return Math.round(number * 100) / 100;
  }
}
