import { IProduct } from '@interfaces';
import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private httpService: HttpService) {}

  /**
   * Find all productss.
   * @returns a list of productss.
   */
  findAll(): Observable<IProduct[]> {
    return this.httpService
      .get(`https://fakestoreapi.com/products`)
      .pipe(map((response) => response.data));
  }

  /**
   * Find a singular products by their id.
   * @param id id of the entity.
   * @returns entity or NotFoundException error.
   */
  async findOne(id: string): Promise<IProduct> {
    const result = await firstValueFrom(
      this.httpService
        .get(`https://fakestoreapi.com/products/${id}`)
        .pipe(map((response) => response.data))
    );
    // fakeStoreApi.com returns 200 and emptpy body even if there is no object found, so we need to manually validate that a product was found
    if (result === null) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return result;
  }
}
