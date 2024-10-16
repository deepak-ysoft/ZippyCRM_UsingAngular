import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../Models/customer.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css',
})
export class CustomerDetailsComponent implements OnInit {
  customer!: Customer;
  ngOnInit(): void {
    const state = window.history.state;

    if (state && state.customer) {
      debugger;
      this.customer = state.customer;
    }
  }
}
