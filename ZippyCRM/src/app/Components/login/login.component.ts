import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserLogin } from '../../Models/userLogin.model';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../Services/customerService/users.service';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  router = inject(Router);
  service = inject(UsersService);
  login: UserLogin;
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  ngOnInit(): void {}
  constructor() {
    this.login = new UserLogin();
    localStorage.removeItem('userEmailForResetPassword');
  }
  loggedUser: any;
  onLogin(login: UserLogin) {
    this.service.login(login).subscribe((res: any) => {
      if (res) {
        this.tokenSubject.next(res.Token);

        localStorage.removeItem('loginUser');
        localStorage.setItem('loginUser', JSON.stringify(res));

        localStorage.setItem('jwtToken', res.token);
        this.router.navigateByUrl('index');
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'User name or password is wrong !',
          icon: 'error',
          timer: 2000, // Auto close after 2000 milliseconds
          showConfirmButton: false,
        });
      }
    });
  }
  getToken() {
    return localStorage.getItem('jwtToken');
  }
}
