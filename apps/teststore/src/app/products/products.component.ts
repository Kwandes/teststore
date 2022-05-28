import { Component, OnInit } from '@angular/core';
import { IProduct } from '@interfaces';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'teststore-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productsList: IProduct[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAll().subscribe({
      next: (products) => {
        this.productsList = products;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  /**
   * Add the product to the basket information stored in the session storage under key 'basket'.
   * @param product product objetc to be added.
   */
  addToBasket(product: IProduct): void {
    const sessionStorageItems = sessionStorage.getItem('basket');
    let productsInBasket: IProduct[] = [];
    if (sessionStorageItems !== null) {
      productsInBasket = JSON.parse(sessionStorageItems);
    }
    productsInBasket.push(product);
    sessionStorage.setItem('basket', JSON.stringify(productsInBasket));
  }
}
