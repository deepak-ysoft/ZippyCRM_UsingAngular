import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}
  private readonly baseUrl = `https://localhost:7269/api/Customer`;
  getContects(customerId: number) {
    // Create HttpParams to add query parameters
    const params = new HttpParams().set('customerId', customerId.toString());

    // Pass the params in the options object correctly
    return this.http.get(`${this.baseUrl}/ContactList`, {
      params: params,
    });
  }

  inserContact(contact: any) {
    return this.http.post(`${this.baseUrl}/CreateEditContact`, contact);
  }
  successDelete(id: number) {
    return this.http.delete(`${this.baseUrl}/ContactDelete/${id}`);
  }
}
