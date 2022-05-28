import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDiscount } from '@interfaces';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class DiscountsService {
  // TODO - write tests for DiscountsService
  constructor(private http: HttpClient) {}

  /**
   * Fetch all discounts.
   * @returns observable of the API request.
   * @example getAll().subscribe({next: () => {}, error: () => {}})
   */
  getAll(): Observable<IDiscount[]> {
    return this.http.get<IDiscount[]>(
      `${env.apiUrl}/api/discounts`,
      httpOptions
    );
  }

  /**
   * Fetch a single discount by its code;
   * @param code the code of the discount.
   * @returns observable of the API request.
   * @example getOne(1).subscribe({next: () => {}, error: () => {}})
   */
  getOne(code: string): Observable<IDiscount> {
    return this.http.get<IDiscount>(
      `${env.apiUrl}/api/discounts/${code}`,
      httpOptions
    );
  }
}
