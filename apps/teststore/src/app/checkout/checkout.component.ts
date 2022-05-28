import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeliveryTypeEnum, IDiscount, IProduct } from '@interfaces';

@Component({
  selector: 'teststore-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  productsList: IProduct[] = [];
  appliedDiscount?: IDiscount;

  orderForm!: FormGroup;

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
  }

  getSubtotal(): number {
    // TODO - add correct calculation
    return 404;
  }

  getTotal(): number {
    // TODO - add correct calculation
    return 404;
  }

  getDiscountAmount(): number {
    // TODO - add correct calculation
    return 404;
  }

  getDeliveryPrice(): number {
    // TODO - add correct calculation
    return 404;
  }

  applyDiscount(): void {
    // TODO - handle discounts
    console.warn('discount WiP');
  }

  purchaseOrder(): void {
    // TODO - handle order creation
    console.warn('Purchase WiP');
    console.log('order', {
      email: this.orderForm.get('email')?.value,
      discount: this.appliedDiscount,
      items: this.productsList.map((p) => p.id),
    });
  }

  /**
   * Get whether the form elements like email and discount are valid and modified.
   * @returns whether the form data is valid and modified.
   */
  purchaseIsEnabled(): boolean {
    return this.orderForm.valid && this.orderForm.dirty;
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
