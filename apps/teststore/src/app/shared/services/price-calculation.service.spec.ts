import { TestBed } from '@angular/core/testing';
import { calculateDeliveryPriceParams, calculateSubtotalItems } from './price-calculation-test-data.constant';
import { PriceCalculationService } from './price-calculation.service';

describe('CalculatePriceService', () => {
  let service: PriceCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceCalculationService);
  });

  // Parametrized test of the 'calculateDeliveryPrice()' method of PriceCalculationService
  describe.each(calculateDeliveryPriceParams)(
    'calculateDeliveryPrice()',
    (params) => {
      it(`Should correctly determine given delivery type price: ${params.delieryType} = ${params.expectedPrice}`, () => {
        expect(service.calculateDeliveryPrice(params.delieryType)).toEqual(
          params.expectedPrice
        );
      });
    }
  );

  // Parametrized test of the 'calculateSubtotal()' method of PriceCalculationService
  describe.each(calculateSubtotalItems)(
    'calculateSubtotal()',
    (params) => {
      it(`Should correctly determine given items: ${params.items} equal to subtotal = ${params.expectedPrice}`, () => {
        expect(service.calculateSubtotal(params.items)).toEqual(
          params.expectedPrice
        );
      });
    }
  );
});
