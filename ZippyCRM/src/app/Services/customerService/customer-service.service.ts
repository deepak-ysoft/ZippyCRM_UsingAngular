import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  constructor(private http: HttpClient) {}
  getCustomerProfile(customerId: any) {
    const params = new HttpParams().set('customerId', customerId.toString());

    return this.http.get(
      'https://localhost:7269/api/Customer/CustomerProfile',
      {
        params,
      }
    );
  }
}
