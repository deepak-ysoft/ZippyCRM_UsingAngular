import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { privateDecrypt } from 'crypto';
import { use } from 'echarts';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  private readonly baseUrl = `https://localhost:7269/api`;
  getUsers() {
    return this.http.get(`${this.baseUrl}/Account/GetUsersList`);
  }
  getJobs() {
    return this.http.get(`${this.baseUrl}/Account/GetJobList`);
  }
  insertUser(user: FormData): any {
    return this.http.post(`${this.baseUrl}/Account/Register`, user);
  }
  editUser(user: FormData): any {
    return this.http.post(`${this.baseUrl}/Home/EditUser`, user);
  }
  login(user: any): any {
    return this.http.post(`${this.baseUrl}/Account/login`, user);
  }

  deleteImg(userId: any) {
    return this.http.delete(`${this.baseUrl}/Home/DeleteImage/${userId}`);
  }
  changeUserPassword(password: FormData): any {
    return this.http.post(`${this.baseUrl}/Home/ChangePassword`, password);
  }

  forgotPassword(email: any) {
    return this.http.post(`${this.baseUrl}/Account/forgotpassword`, email);
  }
  resetPassword(password: any) {
    return this.http.post(`${this.baseUrl}/Account/reset-password`, password);
  }

  // to update notifications after login
  private eventSubject = new Subject<void>();
  triggerSomeEvent() {
    debugger;
    this.eventSubject.next();
  }
  getEventSubject(): Subject<void> {
    return this.eventSubject;
  }
}
