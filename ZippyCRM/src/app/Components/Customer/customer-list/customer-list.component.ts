import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Customer } from '../../../Models/customer.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CustomerProfileComponent } from '../CustomerProfile/customer-profile/customer-profile.component';
import { CustomerServiceService } from '../../../Services/customerService/customer-service.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, CustomerProfileComponent],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent implements OnInit {
  http = inject(HttpClient);
  cusService = inject(CustomerServiceService);

  ngOnInit(): void {
    this.GetAllCustomers();
  }
  CustomerList: Customer[] = [];
  GetAllCustomers() {
    debugger;
    this.http
      .get('https://localhost:7269/api/Customer/GetCustomers')
      .subscribe((ser: any) => {
        console.log(ser); // Log the response to see the structure
        this.CustomerList = ser;
      });
  }
  customer: Customer;
  constructor(private router: Router) {
    this.customer = new Customer(); // Initialize with a new instance of Customer
  }
  getCustomerProfile(customerId: any) {
    debugger;
    this.cusService.getCustomerProfile(customerId).subscribe((res: any) => {
      this.customer = res;
      if (res != null) {
        this.router.navigateByUrl('customer-profile');
      }
    });
  }
}
