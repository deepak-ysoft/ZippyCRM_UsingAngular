import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}
  private readonly baseUrl = `https://localhost:7269/api/Customer`;
  getNotes(CId: any) {
    return this.http.get(`${this.baseUrl}/GetNotes/${CId}`);
  }

  inserNotes(notes: any) {
    return this.http.post(`${this.baseUrl}/CreateEditNotes`, notes);
  }
  succesDelete(id: number) {
    return this.http.delete(`${this.baseUrl}/DeleteNotes/${id}`);
  }
}
