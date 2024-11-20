import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}
  private readonly baseUrl = 'https://localhost:7269/api/Customer';
  getAppointment(CId: any) {
    return this.http.get(`${this.baseUrl}/GetAppointments/${CId}`);
  }

  insertAppointment(appointment: any) {
    return this.http.post(`${this.baseUrl}/CreateEditAppointment`, appointment);
  }

  updateAppointment(
    id: string,
    newStart: string,
    newEnd: string
  ): Observable<any> {
    const payload = { id, newStart, newEnd };
    return this.http.post(`${this.baseUrl}/UpdateAppointment`, payload);
  }
  successDelete(id: number) {
    return this.http.delete(`${this.baseUrl}/DeleteAppointment/${id}`);
  }
}
