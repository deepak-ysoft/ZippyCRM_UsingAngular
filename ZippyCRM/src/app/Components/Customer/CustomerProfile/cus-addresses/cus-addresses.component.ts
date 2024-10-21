import {
  Component,
  ElementRef,
  inject,
  Input,
  model,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Addresses } from '../../../../Models/cusAddresses.model';
import { AddressesService } from '../../../../Services/customerService/addresses.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CustomerServiceService } from '../../../../Services/customerService/customer-service.service';
declare var bootstrap: any;
@Component({
  selector: 'app-cus-addresses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cus-addresses.component.html',
  styleUrl: './cus-addresses.component.css',
})
export class CusAddressesComponent implements OnInit {
  @Input() customerId!: any;
  addressList: Addresses[] = [];
  address: Addresses;
  addressModalAndMsg = 'Add Address';
  service = inject(AddressesService);
  cosService = inject(CustomerServiceService);
  @ViewChild('addAddressModal', { static: false }) addAddressModal!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.address = new Addresses();
  }

  ngOnInit(): void {
    this.getCustomerAddresses(this.customerId);
  }

  getCustomerAddresses(id: any) {
    this.service.getAddresses(id).subscribe((res: any) => {
      this.addressList = res;
    });
  }

  onAdd() {
    this.address = new Addresses();
  }

  EditAddress(address: Addresses) {
    this.address = address;
    this.addressModalAndMsg = 'Edit Address';
  }

  onSubmit() {
    debugger;
    this.address.customerId = this.customerId;
    this.service.insertAddress(this.address).subscribe((res: any) => {
      if (res) {
        this.address = new Addresses();
        const modal = bootstrap.Modal.getInstance(
          this.addAddressModal.nativeElement
        );
        modal.hide();
        this.getCustomerAddresses(this.customerId);
      } else {
        alert('Not Added!');
      }
    });
  }

  AddressDetails(address: Addresses) {
    this.addressModalAndMsg = 'Address Details';
    this.address = address;
  }

  DeleteAddress(addressid: number) {
    this.cosService.confirmDelete().then((result) => {
      if (result.isConfirmed) {
        this.service.successDelete(addressid).subscribe((res: any) => {
          this.getCustomerAddresses(this.customerId);
        });
      }
    });
  }
}
