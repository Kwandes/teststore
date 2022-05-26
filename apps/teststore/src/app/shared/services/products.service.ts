import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '@interfaces';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  /**
   * Fetch all products;
   * @returns observable of the API request
   * @example getAll().subscribe({next: () => {}, error: () => {}})
   */
  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${env.apiUrl}/api/products`, httpOptions);
  }

  /**
   * Fetch a single product by id;
   * @param id the id of the product
   * @returns observable of the API request
   * @example getOne(1).subscribe({next: () => {}, error: () => {}})
   */
  getOne(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(
      `${env.apiUrl}/api/products/${id}`,
      httpOptions
    );
  }
}
