import { TestBed } from '@angular/core/testing';
import {
  calculateDeliveryPriceParams,
  calculateSubtotalItems,
  calculateDiscounts,
} from './price-calculation-test-data.constant';
import { PriceCalculationService } from './price-calculation.service';

describe('CalculatePriceService', () => {
  let service: PriceCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceCalculationService);
  });

  // Parametrized test of the 'calculateDeliveryPrice()' method of PriceCalculationService
  describe.each(calculateDeliveryPriceParams)('calculateDeliveryPrice()',(params) => {
      it(`Should correctly determine given delivery type price: ${params.deliveryType} = ${params.expectedPrice}`, () => {
        expect(service.calculateDeliveryPrice(params.deliveryType)).toEqual(params.expectedPrice);
      });
  });

  // Parametrized test of the 'calculateSubtotal()' method of PriceCalculationService
  describe.each(calculateSubtotalItems)('calculateSubtotal()', (params) => {
    let itemListText = '';
    params.items.forEach((item) => (itemListText += item.price + ', '));
    it(`Should correctly determine given items with prices: ${itemListText} equal to subtotal = ${params.expectedPrice}`, () => {
      expect(service.calculateSubtotal(params.items)).toEqual(params.expectedPrice);
    });
  });

  // Parametrized test of the 'calculateDiscount()' method of PriceCalculationService
  describe.each(calculateDiscounts)('calculateDiscount()', (params) => {
    it(`Should correctly determine given discount with amount: ${params.discount.amount}
      of type: ${params.discount.type}
      and subtotal: ${params.subtotal} 
      equal to saved amount: ${params.expectedReturnValue.savedAmount}
      and total after discount: ${params.expectedReturnValue.discountedAmount}`, () => {
      expect(
        service.calculateDiscount(params.discount, params.subtotal)
      ).toEqual(params.expectedReturnValue);
    });
  });

});
