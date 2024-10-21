import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { privateDecrypt } from 'crypto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  getUsers(){
    return this.http.get(`https://localhost:7269/api/Account/GetUsersList`)
  }
}
