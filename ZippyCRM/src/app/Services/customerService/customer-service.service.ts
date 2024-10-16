import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  constructor(private http: HttpClient) {}
  getCustomerProfile(id: any) {
    return this.http.get(
      `https://localhost:7269/api/Customer/CustomerProfile/${id}`
    );
  }

  getCustomerContacts(customerId: any) {
    const params = new HttpParams().set('customerId', customerId);
    debugger;
    return this.http.get(`https://localhost:7269/api/Customer/ContactList?`, {
      params,
    });
  }
  getDataForEdtiCustomer(id: any) {
    return this.http.get(
      `https://localhost:7269/api/Customer/CreateEditCustomer/${id}`
    );
  }
  insertCustomer(customer: FormData): any {
    debugger;
    return this.http.post(
      `https://localhost:7269/api/Customer/CreateEditCustomer`,
      customer
    );
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
    return this.http
      .delete(`https://localhost:7269/api/Customer/DeleteCustomer/${id}`)
      .subscribe();
  }
}
