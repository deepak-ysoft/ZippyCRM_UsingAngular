import { Component, inject, Input, OnInit } from '@angular/core';
import { Addresses } from '../../../../Models/cusAddresses.model';
import { AddressesService } from '../../../../Services/customerService/addresses.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cus-addresses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cus-addresses.component.html',
  styleUrl: './cus-addresses.component.css',
})
export class CusAddressesComponent implements OnInit {
  @Input() customerId!: any;
  addressList: Addresses[] = [];
  service = inject(AddressesService);
  ngOnInit(): void {
    this.getCustomerAddresses(this.customerId);
  }
  getCustomerAddresses(id: any) {
    debugger;
    this.service.getAddresses(id).subscribe((res: any) => {
      this.addressList = res;
    });
  }
}
