import { Component, inject, Input, OnInit } from '@angular/core';
import { CusContactComponent } from '../cus-contact/cus-contact.component';
import { ContactService } from '../../../../Services/customerService/contact.service';
import { Contact } from '../../../../Models/cusContact.model';
import { Router } from '@angular/router';
import { Customer } from '../../../../Models/customer.model';
import { CommonModule } from '@angular/common';
import { CusAddressesComponent } from '../cus-addresses/cus-addresses.component';
import { AddressesService } from '../../../../Services/customerService/addresses.service';
import { Addresses } from '../../../../Models/cusAddresses.model';
import { CusTaskComponent } from '../cus-task/cus-task.component';
import { TaskService } from '../../../../Services/customerService/task.service';
import { NotesService } from '../../../../Services/customerService/notes.service';
import { AppointmentService } from '../../../../Services/customerService/appointment.service';
import { CusNotesComponent } from '../cus-notes/cus-notes.component';
import { CusAppointmentComponent } from '../cus-appointment/cus-appointment.component';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [
    CusContactComponent,
    CusAddressesComponent,
    CusTaskComponent,
    CusNotesComponent,
    CusAppointmentComponent,
    CommonModule,
  ],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css',
})
export class CustomerProfileComponent implements OnInit {
  service = inject(ContactService);
  addressService = inject(AddressesService);
  taskService = inject(TaskService);
  notesService = inject(NotesService);
  appointmentService = inject(AppointmentService);
  addressList: Addresses[] = [];
  ContectList: Contact[] = [];
  taskList: Contact[] = [];
  notesList: Contact[] = [];
  appointmentList: Contact[] = [];
  router = inject(Router);
  customer?: Customer;
  activeTab: string = '#profile-Contacts'; // Default tab
  ngOnInit(): void {
    // Retrieve customer data from the router's state
    const state = window.history.state as { customer: Customer };

    if (state && state.customer) {
      this.customer = state.customer;
      this.getContactList(this.customer.cId);
    }
    // Tab active on customer profile
    // this.activeTab = '#profile-Contacts';
    // localStorage.setItem('activeTab', this.activeTab); // Ensure it's saved to localStorage

    const storedTab = localStorage.getItem('activeTab');
    if (storedTab) {
      this.activeTab = storedTab;
    }
  }
  activateTab(tabId: string, customerId: number | undefined): void {
    this.activeTab = tabId;
    // Store the active tab in local storage so it persists on page reload
    localStorage.setItem('activeTab', tabId);

    // Call the respective method to load data based on the active tab
    switch (tabId) {
      case '#profile-Contacts':
        this.getContactList(customerId);
        break;
      case '#profile-Addresses':
        this.getCustomerAddresses(customerId);
        break;
      case '#profile-Task':
        this.getCustomerTasks(customerId);
        break;
      case '#profile-Notes':
        this.getCustomerNotes(customerId);
        break;
      case '#profile-AppointMent':
        this.getCustomerAppointMent(customerId);
        break;
    }
  }

  getContactList(id: any) {
    debugger;
    this.service.getContects(id).subscribe((res: any) => {
      this.ContectList = res;
    });
  }
  getCustomerAddresses(id: any) {
    this.addressService.getAddresses(id).subscribe((res: any) => {
      this.addressList = res;
    });
  }
  getCustomerTasks(id: any) {
    debugger;
    this.taskService.getTask(id).subscribe((res: any) => {
      this.taskList = res;
    });
  }
  getCustomerNotes(id: any) {
    this.notesService.getNotes(id).subscribe((res: any) => {
      this.notesList = res;
    });
  }
  getCustomerAppointMent(id: any) {
    this.appointmentService.getAppointment(id).subscribe((res: any) => {
      this.appointmentList = res;
    });
  }
}
