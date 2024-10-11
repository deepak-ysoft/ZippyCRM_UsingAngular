import { Component, inject, Input, OnInit } from '@angular/core';
import { CusContactComponent } from '../cus-contact/cus-contact.component';
import { ContactService } from '../../../../Services/customerService/contact.service';
import { Contact } from '../../../../Models/cusContact.model';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CusContactComponent],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css',
})
export class CustomerProfileComponent implements OnInit {
  service = inject(ContactService);
  ContectList: Contact[] = [];
  @Input() cidd:any;
  cId = this.service.id;
  ngOnInit(): void {
    this.getContactList(this.cId);
  }
  getContactList(id: number) {
    this.service.getContects(id).subscribe((res: any) => {
      this.ContectList = res;
      console.log(res);
    });
  }
}