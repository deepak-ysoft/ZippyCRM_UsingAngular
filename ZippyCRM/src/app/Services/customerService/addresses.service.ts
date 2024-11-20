import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  private readonly baseUrl = `https://localhost:7269/api/Customer`;
  
  http = inject(HttpClient);
  getAddresses(CId: any) {
    return this.http.get(
      `${this.baseUrl}/GetAddreses/${CId}`
    );
  }

  insertAddress(address: any) {
    return this.http.post(
      `${this.baseUrl}/CreateEditAddresses
`,
      address
    );
  }
  successDelete(id: number) {
    return this.http.delete(
      `${this.baseUrl}/DeleteAddress/${id}`
    );
  }
}
