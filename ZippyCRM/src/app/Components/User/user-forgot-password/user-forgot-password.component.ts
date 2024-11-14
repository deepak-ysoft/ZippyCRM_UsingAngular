import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../Services/customerService/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-forgot-password',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './user-forgot-password.component.html',
  styleUrl: './user-forgot-password.component.css',
})
export class UserForgotPasswordComponent {
  emailSend = false;
  userService = inject(UsersService);

  onSubmitForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^[a-zA-Z]{5,}[a-zA-Z0-9._%+-]*@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/
      ),
    ]),
  });
  onSend() {
    this.userService
      .forgotPassword(this.onSubmitForm.value)
      .subscribe((res: any) => {
        if (res) {
          this.emailSend = true;
          const email = this.onSubmitForm.value;
          localStorage.setItem('userEmailForResetPassword', email.email);
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'User not found.',
            icon: 'error',
            timer: 2000, // Auto close after 2000 milliseconds
            showConfirmButton: false,
          });
        }
      });
  }
}
