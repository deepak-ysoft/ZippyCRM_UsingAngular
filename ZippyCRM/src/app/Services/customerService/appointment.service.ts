import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
