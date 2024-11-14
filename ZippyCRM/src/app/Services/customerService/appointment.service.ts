import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}
  getAppointment(CId: any) {
    return this.http.get(
      `https://localhost:7269/api/Customer/GetAppointments/${CId}`
    );
  }

  insertAppointment(appointment: any) {
    return this.http.post(
      `https://localhost:7269/api/Customer/CreateEditAppointment`,
      appointment
    );
  }
  private apiUrl = 'https://localhost:7269/api/Customer/UpdateAppointment';

  updateAppointment(
    id: string,
    newStart: string,
    newEnd: string
  ): Observable<any> {
    const payload = { id, newStart, newEnd };
    return this.http.post(this.apiUrl, payload);
  }
  successDelete(id: number) {
    return this.http.delete(
      `https://localhost:7269/api/Customer/DeleteAppointment/${id}`
    );
  }
}
