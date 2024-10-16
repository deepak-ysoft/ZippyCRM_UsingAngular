import { Component, inject, Input, OnInit } from '@angular/core';
import { Customer } from '../../../../Models/customer.model';
import { ContactService } from '../../../../Services/customerService/contact.service';
import { Contact } from '../../../../Models/cusContact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cus-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cus-contact.component.html',
  styleUrl: './cus-contact.component.css',
})
export class CusContactComponent implements OnInit {
  service = inject(ContactService);
  ContectList: Contact[] = [];
  @Input() customerId!: any;

  ngOnInit(): void {
    // Simulate fetching customer contact list by ID
    this.getContactList(this.customerId.toString());
  }
  getContactList(id: any) {
    this.service.getContects(id).subscribe((res: any) => {
      this.ContectList = res;
    });
  }
  EditContact(id:any){
    
  }
}
