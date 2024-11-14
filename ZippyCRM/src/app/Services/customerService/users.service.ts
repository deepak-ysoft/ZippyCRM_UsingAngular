import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { privateDecrypt } from 'crypto';
import { use } from 'echarts';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get(`https://localhost:7269/api/Account/GetUsersList`);
  }
  getJobs() {
    return this.http.get('https://localhost:7269/api/Account/GetJobList');
  }
  insertUser(user: FormData): any {
    return this.http.post(`https://localhost:7269/api/Account/Register`, user);
  }
  editUser(user: FormData): any {
    return this.http.post(`https://localhost:7269/api/Home/EditUser`, user);
  }
  login(user: any): any {
    return this.http.post(`https://localhost:7269/api/Account/login`, user);
  }

  deleteImg(userId: any) {
    return this.http.delete(
      `https://localhost:7269/api/Home/DeleteImage/${userId}`
    );
  }
  changeUserPassword(password: FormData): any {
    return this.http.post(
      `https://localhost:7269/api/Home/ChangePassword`,
      password
    );
  }

  forgotPassword(email: any) {
    return this.http.post(
      `https://localhost:7269/api/Account/forgotpassword`,
      email
    );
  }
  resetPassword(password: any) {
    return this.http.post(
      `https://localhost:7269/api/Account/reset-password`,
      password
    );
  }
}
