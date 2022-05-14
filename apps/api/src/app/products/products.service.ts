import { IProduct } from '@interfaces';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private httpService: HttpService) {}

  /**
   * Find a singular products by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  findOne(id: string): Observable<IProduct> {
    return this.httpService
      .get(`https://fakestoreapi.com/products/${id}`)
      .pipe(map((response) => response.data));
  }

  /**
   * Find all productss.
   * @returns a list of productss.
   */
  findAll(): Observable<IProduct[]> {
    return this.httpService
      .get(`https://fakestoreapi.com/products`)
      .pipe(map((response) => response.data));
  }
}
