import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  constructor(private http: HttpClient) {}
  private readonly baseUrl = `https://localhost:7269/api/Customer`;
  getCustomerProfile(id: any) {
    return this.http.get(`${this.baseUrl}/CustomerProfile/${id}`);
  }

  getCustomerContacts(customerId: any) {
    const params = new HttpParams().set('customerId', customerId);
    return this.http.get(`${this.baseUrl}/ContactList?`, {
      params,
    });
  }
  getDataForEdtiCustomer(id: any) {
    return this.http.get(`${this.baseUrl}/CreateEditCustomer/${id}`);
  }
  insertCustomer(customer: FormData): any {
    return this.http.post(`${this.baseUrl}/CreateEditCustomer`, customer);
  }
  confirmDelete() {
    return Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });
  }

  successDelete(id: any) {
    return this.http.delete(`${this.baseUrl}/DeleteCustomer/${id}`);
  }
}
