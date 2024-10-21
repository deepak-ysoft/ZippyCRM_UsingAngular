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

  insertTask(task: any) {
    return this.http.post(
      `https://localhost:7269/api/Customer/CreateEditTask
`,
      task
    );
  }
  succesDelete(id: number) {
    return this.http.delete(
      `https://localhost:7269/api/Customer/DeleteTask/${id}`
    );
  }
}
