import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  Customer,
  gender,
  language,
  title,
  types,
} from '../../../Models/customer.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerServiceService } from '../../../Services/customerService/customer-service.service';
import { subscribe } from 'diagnostics_channel';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './customer-register.component.html',
  styleUrl: './customer-register.component.css',
})
export class CustomerRegisterComponent implements OnInit {
  customer!: Customer;
  message = '';
  selectedFile: any = null;
  titleOptions: Array<{ value: number; text: string }> = [];
  genderOptions: Array<{ value: number; text: string }> = [];
  languageOptions: Array<{ value: number; text: string }> = [];
  router = inject(Router);
  cusService = inject(CustomerServiceService);
  ngOnInit(): void {
    this.titleOptions = this.convertEnumToArray(title);
    this.genderOptions = this.convertEnumToArray(gender);
    this.languageOptions = this.convertEnumToArray(language);
    // Retrieve customer data from the router's state
    const state = window.history.state;

    if (state && state.customer) {
      debugger;
      this.customer = state.customer;
    }
    debugger;
    if (this.customer?.pan != '') {
      this.getAccountType('Individual');
    } else {
      this.getAccountType('Commercial');
    }
  }
  convertEnumToArray(enumObj: any): Array<{ value: number; text: string }> {
    return Object.keys(enumObj)
      .filter((key) => isNaN(Number(key)))
      .map((key) => ({ value: enumObj[key], text: key }));
  }
  Individual: boolean = true;
  Commercial: boolean = true;
  getAccountType(type: any) {
    if (type == 'Individual') {
      this.Commercial = false;
      this.Individual = true;
    } else {
      this.Commercial = true;
      this.Individual = false;
    }
  }
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
      debugger;
      console.log(this.selectedFile);
    }
  }

  onSubmit(): void {
    const formData = new FormData();

    if (this.customer?.cId) {
      formData.append('cId', this.customer.cId.toString());
    }
    this.customer.type = 1;
    formData.append('type', this.customer.type.toString() || '1');
    formData.append('pan', this.customer.pan || '');
    formData.append('gst', this.customer.gst || '');
    formData.append('title', this.customer.title.toString() || '');
    formData.append('firstName', this.customer.firstName || ''); // Required field
    formData.append('middleName', this.customer.middleName || '');
    formData.append('lastName', this.customer.lastName || ''); // Required field
    formData.append('position', this.customer.position || '');
    formData.append('gender', this.customer.gender.toString() || '');
    formData.append(
      'dayOfBirth',
      this.customer.dayOfBirth ? this.customer.dayOfBirth.toString() : ''
    );
    formData.append('phone', this.customer.phone || '');
    formData.append('phoneOther', this.customer.phoneOther || '');
    formData.append('cell', this.customer.cell || '');
    formData.append('fax', this.customer.fax || '');
    formData.append('email', this.customer.email || ''); // Required field
    formData.append('email2', this.customer.email2 || '');
    formData.append('website', this.customer.website || '');
    formData.append('language', this.customer.language.toString() || '');
    formData.append('comments', this.customer.comments || '');

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }

    console.log('Submitting FormData:', formData);

    this.cusService.insertCustomer(formData).subscribe((res: any) => {
      if (res) {
        console.log('Response:', res);
        this.router.navigateByUrl('customer-list');
      } else {
        alert('Something went wrong.');
      }
    });
  }
}
