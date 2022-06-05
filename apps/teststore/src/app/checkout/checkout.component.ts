import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeliveryTypeEnum, IDiscount, IOrder, IProduct } from '@interfaces';
import { DiscountsService } from '../shared/services/discounts.service';
import { OrdersService } from '../shared/services/orders.service';
import {
  IPricingInfo,
  PriceCalculationService,
} from '../shared/services/price-calculation.service';

@Component({
  selector: 'teststore-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  productsList: IProduct[] = [];
  appliedDiscount?: IDiscount;
  calculatedPrice: IPricingInfo = {
    subtotal: 404,
    deliveryPrice: 404,
    youSave: 404,
    total: 404,
  };
  createdOrder?: IOrder;

  orderStatus: 'created' | 'failed' | 'wip' = 'wip';

  orderForm!: FormGroup;

  constructor(
    private priceCalculationService: PriceCalculationService,
    private discountsService: DiscountsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    // Initliaze the form elements and their validators
    this.orderForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(254),
      ]),
      deliveryMethod: new FormControl(DeliveryTypeEnum.homeDelivery),
      discount: new FormControl('', [
        Validators.maxLength(50),
        Validators.pattern('[a-zA-Z0-9\\-]*'), // only letters, numbers and dashes
      ]),
    });
    this.productsList = this.getItemsFromBasket();
    this.updatePricing();
  }

  /**
   * Updates the deliveryPrice variable based on the current selected option.
   */
  updatePricing(): void {
    this.calculatedPrice = this.priceCalculationService.calculateTotal(
      this.productsList,
      this.orderForm.get('deliveryMethod')?.value,
      this.appliedDiscount
    );
  }

  applyDiscount(): void {
    this.discountsService
      .getOne(this.orderForm.get('discount')?.value)
      .subscribe({
        next: (discount) => {
          // check if the discount can be applied
          if (
            discount.remainingUses > 0 &&
            new Date(discount.startsAt) < new Date() &&
            (discount.expiresAt
              ? new Date(discount.expiresAt) > new Date()
              : true) &&
            discount.isEnabled
          ) {
            this.appliedDiscount = discount;
            alert('Discount Applied');
          } else {
            alert('Discount Invalid');
            this.appliedDiscount = undefined;
          }
          this.updatePricing();
        },
        error: (error) => {
          alert('Discount Invalid');
          this.appliedDiscount = undefined;
          this.updatePricing();
          console.error(error);
        },
      });
  }

  /**
   * Create a new order entry based on the checkout information.
   */
  purchaseOrder(): void {
    if (!this.purchaseIsEnabled()) {
      return;
    }
    this.ordersService
      .create({
        email: this.orderForm.get('email')?.value,
        items: this.productsList.map((p) => p.id),
        total: this.calculatedPrice.total,
        subtotal: this.calculatedPrice.subtotal,
        deliveryType: this.orderForm.get('deliveryMethod')?.value,
        discountId: this.appliedDiscount?.discountId,
      })
      .subscribe({
        next: (order) => {
          this.orderStatus = 'created';
          this.createdOrder = order;
          // disable all inputs
          this.orderForm.get('email')?.disable();
          this.orderForm.get('deliveryMethod')?.disable();
          this.orderForm.get('discount')?.disable();
        },
        error: (error) => {
          console.error(error);
          this.orderStatus = 'failed';
          this.orderForm.get('email')?.disable();
          this.orderForm.get('deliveryMethod')?.disable();
          this.orderForm.get('discount')?.disable();
        },
      });
  }

  /**
   * Get whether the form elements like email and discount are valid and modified.
   * @returns whether the form data is valid and modified.
   */
  purchaseIsEnabled(): boolean {
    return (
      this.orderForm.valid &&
      this.orderForm.dirty &&
      this.productsList &&
      this.productsList.length > 0
    );
  }

  /**
   * Returns a list of products stroed in the session storage under key 'basket'.
   * @returns a list of products.
   */
  getItemsFromBasket(): IProduct[] {
    const sessionStorageItems = sessionStorage.getItem('basket');
    let productsInBasket: IProduct[] = [];
    if (sessionStorageItems !== null) {
      productsInBasket = JSON.parse(sessionStorageItems);
    }
    return productsInBasket;
  }

  /**
   * Remove the product from the basket information stored in the session storage under key 'basket'.
   * @param product product objetc to be removed.
   */
  removeFromBasket(product: IProduct): void {
    const sessionStorageItems = sessionStorage.getItem('basket');
    let productsInBasket: IProduct[] = [];
    if (sessionStorageItems !== null) {
      productsInBasket = JSON.parse(sessionStorageItems);
    }
    // We only want to remove one instance of the product item and there may be multiple with the same id
    // therefore we remove only the first occurace
    const index = productsInBasket.indexOf(product);
    productsInBasket.splice(index, 1);

    sessionStorage.setItem('basket', JSON.stringify(productsInBasket));
    this.productsList = productsInBasket;
  }
}
