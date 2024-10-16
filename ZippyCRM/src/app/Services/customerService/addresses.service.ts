import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  http = inject(HttpClient);
  getAddresses(CId: any) {
    debugger;
    return this.http.get(
      `https://localhost:7269/api/Customer/GetAddreses/${CId}`
    );
  }
}
