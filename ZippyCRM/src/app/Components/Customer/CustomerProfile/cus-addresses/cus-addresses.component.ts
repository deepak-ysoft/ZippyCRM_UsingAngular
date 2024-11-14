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
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CustomerServiceService } from '../../../../Services/customerService/customer-service.service';
declare var bootstrap: any;
@Component({
  selector: 'app-cus-addresses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  submitted = false;

  onSubmitForm: FormGroup = new FormGroup({
    customerId: new FormControl(),
    addressId: new FormControl(),
    addressName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^[a-zA-Z]{5,}[a-zA-Z0-9._%+-]*@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/
      ),
    ]),
    phone: new FormControl('', [
      Validators.required,
      phoneValueRangeValidator(1000000000, 999999999999),
      Validators.pattern('^[+]?[0-9 ]*$'),
    ]),
    mobile: new FormControl('', [
      Validators.required,
      phoneValueRangeValidator(1000000000, 999999999999),
      Validators.pattern(/^\+?[0-9]*$/),
    ]),
    internalNotes: new FormControl('', [Validators.required]),
  });

  constructor(private fb: FormBuilder) {
    this.address = new Addresses();
  }

  ngOnInit(): void {
    this.getCustomerAddresses(this.customerId);
    this.onSubmitForm.get('customerId')?.setValue(this.customerId);
  }

  getCustomerAddresses(id: any) {
    this.service.getAddresses(id).subscribe((res: any) => {
      this.addressList = res;
    });
  }

  onAdd() {
    this.onSubmitForm.reset();
    this.addressModalAndMsg = 'Add Address';
  }

  EditAddress(address: Addresses) {
    this.onSubmitForm.patchValue({
      addressId: address.addressId,
      addressName: address.addressName,
      address: address.address,
      email: address.email,
      phone: address.phone,
      mobile: address.mobile,
      internalNotes: address.internalNotes,
    });
    this.addressModalAndMsg = 'Edit Address';
  }

  onSubmit() {
    this.submitted = true;
    if (this.onSubmitForm.valid) {
      if (this.onSubmitForm.get('addressId')?.value == null) {
        this.onSubmitForm.get('addressId')?.setValue(0);
      }
      this.onSubmitForm.get('customerId')?.setValue(this.customerId);
      this.service
        .insertAddress(this.onSubmitForm.value)
        .subscribe((res: any) => {
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
  }

  shouldShowError(controlName: string): boolean {
    const control = this.onSubmitForm.get(controlName);
    return (
      (control?.invalid &&
        (control.touched || control.dirty || this.submitted)) ??
      false
    );
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
export function phoneValueRangeValidator(
  minValue: number,
  maxValue: number
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phoneValue = +control.value; // Convert to a number

    if (!control.value || isNaN(phoneValue)) {
      return null; // If the field is empty or not a number, return no error
    }

    if (phoneValue < minValue) {
      return { minPhoneValue: true };
    }

    if (phoneValue > maxValue) {
      return { maxPhoneValue: true };
    }

    return null; // If within range, no error
  };
}
