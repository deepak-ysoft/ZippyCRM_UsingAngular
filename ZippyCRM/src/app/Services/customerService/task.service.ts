import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}
  private readonly baseUrl = `https://localhost:7269/api/Customer`;
  getTask(CId: any) {
    return this.http.get(`${this.baseUrl}/GetTasks/${CId}`);
  }

  insertTask(task: any) {
    return this.http.post(
      `${this.baseUrl}/CreateEditTask
`,
      task
    );
  }
  succesDelete(id: number) {
    return this.http.delete(`${this.baseUrl}/DeleteTask/${id}`);
  }
}
