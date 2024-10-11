export class Addresses {
  addressId: number;
  addressName: string;
  address: string;
  email: string;
  phone: string;
  mobile: string;
  internalNotes: string;
  customerId: number;

  constructor(
    addressId: number,
    addressName: string,
    address: string,
    email: string,
    phone: string,
    mobile: string,
    internalNotes: string,
    customerId: number
  ) {
    this.addressId = addressId;
    this.addressName = addressName;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.mobile = mobile;
    this.internalNotes = internalNotes;
    this.customerId = customerId;
  }
}
