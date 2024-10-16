import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}
  getTask(CId: any) {
    return this.http.get(`https://localhost:7269/api/Customer/GetTasks/${CId}`);
  }
}
