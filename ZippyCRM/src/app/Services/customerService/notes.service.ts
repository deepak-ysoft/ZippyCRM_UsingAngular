import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private http: HttpClient) {}
  getNotes(CId: any) {
    return this.http.get(`https://localhost:7269/api/Customer/GetNotes/${CId}`);
  }

  inserNotes(notes:any){
    return this.http.post(`https://localhost:7269/api/Customer/CreateEditNotes`,notes);
  }
}
