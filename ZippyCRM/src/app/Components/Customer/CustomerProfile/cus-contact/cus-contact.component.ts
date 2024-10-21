import {
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ContactService } from '../../../../Services/customerService/contact.service';
import { Contact } from '../../../../Models/cusContact.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerServiceService } from '../../../../Services/customerService/customer-service.service';
declare var bootstrap: any;
@Component({
  selector: 'app-cus-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cus-contact.component.html',
  styleUrl: './cus-contact.component.css',
})
export class CusContactComponent implements OnInit {
  service = inject(ContactService);
  cusService = inject(CustomerServiceService);
  router = inject(Router);
  ContectList: Contact[] = [];
  modalPopupAndMsg = 'Create Contact';
  isContacts: boolean = true;
  @Input() customerId!: any;
  @ViewChild('addContactModal', { static: false }) addContactModal!: ElementRef;
  contact: Contact;
  
  constructor(private fb: FormBuilder) {
    this.contact = new Contact();
  }

  ngOnInit(): void {
    // Simulate fetching customer contact list by ID
    this.getContactList(this.customerId.toString());
  }

  getContactList(id: any) {
    debugger;
    this.service.getContects(id).subscribe((res: any) => {
      if (!res) {
        this.isContacts = false;
      } else {
        this.ContectList = res;
      }
    });
  }

  onAdd() {
    this.contact = new Contact();
  }

  EditContact(contact: Contact) {
    this.contact = contact;
    this.modalPopupAndMsg = 'Edit Contact';
  }

  onSubmit() {
    this.contact.cId = this.customerId;
    this.service.inserContact(this.contact).subscribe((res: any) => {
      if (res) {
        this.contact = new Contact();
        const modal = bootstrap.Modal.getInstance(
          this.addContactModal.nativeElement
        );
        modal.hide();
        this.getContactList(this.customerId);
      } else {
        alert('Not Added!');
      }
    });
  }

  ContactDetails(contact: Contact) {
    this.contact = contact;
    this.modalPopupAndMsg = 'Contact Details';
  }

  DeleteContact(Id: number) {
    this.cusService.confirmDelete().then((result) => {
      if (result.isConfirmed) {
        this.service.successDelete(Id).subscribe(() => {
          this.getContactList(this.customerId);
        });
      }
    });
  }
}
