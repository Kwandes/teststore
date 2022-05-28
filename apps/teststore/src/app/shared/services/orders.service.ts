import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateOrderRequest, IOrder } from '@interfaces';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  // TODO - write tests for OrdersService
  constructor(private http: HttpClient) {}

  /**
   * Creates a new order in the database.
   * @param params request body with the order information.
   * @returns created order.
   * @example create(...).subscribe({next: () => {}, error: () => {}})
   */
  create(params: ICreateOrderRequest): Observable<IOrder> {
    return this.http.post<IOrder>(
      `${env.apiUrl}/api/orders`,
      params,
      httpOptions
    );
  }
}
