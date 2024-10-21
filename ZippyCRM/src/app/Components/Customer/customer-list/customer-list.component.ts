import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Customer } from '../../../Models/customer.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CustomerProfileComponent } from '../CustomerProfile/customer-profile/customer-profile.component';
import { CustomerServiceService } from '../../../Services/customerService/customer-service.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomerRegisterComponent } from '../customer-register/customer-register.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    CustomerProfileComponent,
    CustomerRegisterComponent,
    NgxDatatableModule,
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent implements OnInit {
  CustomerList: any[] = [];
  currentPage = 1;
  pageSize = 10; // Number of customers per page
  totalCustomers = 0; // Total number of customers from the API
  totalPages = 0;
  searchTerm = ''; // For search input

  http = inject(HttpClient);

  ngOnInit(): void {
    this.loadPage(1); // Load the first page
  }

  loadPage(page: number): void {
    if (page < 1) {
      return; // Prevent out of range pages
    }
    this.currentPage = page;

    const params = {
      page: this.currentPage.toString(),
      pageSize: this.pageSize.toString(),
      searchTerm: this.searchTerm,
    };

    this.http
      .get<any>('https://localhost:7269/api/Customer/GetCustomers', { params })
      .subscribe((response: any) => {
        this.CustomerList = response.data;
        this.totalCustomers = response.totalCount;
        this.totalPages = Math.ceil(this.totalCustomers / this.pageSize);
      });
  }

  getDisplayedPages(): number[] {
    const pages = [];

    if (this.totalPages <= 3) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pages.push(
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1
        );
      }
    }

    return pages;
  }

  editCustomer(customer: Customer): void {
    this.customer = new Customer();
    this.customer = customer;
    if (this.customer != null) {
      this.router.navigate(['customer-register'], {
        state: { customer: this.customer },
      });
    }
  }
  customerDetails(customer: Customer): void {
    this.customer = new Customer();
    this.customer = customer;
    if (this.customer != null) {
      this.router.navigate(['customer-details'], {
        state: { customer: this.customer },
      });
    }
  }
  deleteCustomer(cId: number): void {
    this.cusService.confirmDelete().then((result) => {
      if (result.isConfirmed) {
        this.cusService.successDelete(cId).subscribe(() => {
          this.loadPage(this.currentPage);
        });
      }
    });
  }

  customer: Customer;
  constructor(
    private router: Router,
    private cusService: CustomerServiceService
  ) {
    this.customer = new Customer(); // Initialize with a new instance of Customer
  }
  getCustomerProfile(customerId: any) {
    this.cusService.getCustomerProfile(customerId).subscribe((res: any) => {
      this.customer = res;
      if (res != null) {
        this.router.navigate(['customer-profile'], {
          state: { customer: this.customer },
        });
      }
    });
  }
}
