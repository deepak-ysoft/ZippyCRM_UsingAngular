import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}
  id = 0;
  getContects(customerId: number) {
    debugger;
    // Create HttpParams to add query parameters
    const params = new HttpParams().set('customerId', customerId.toString());

    return this.http.get('https://localhost:7269/api/Customer/ContactList', {
      params,
    });
  }
}
