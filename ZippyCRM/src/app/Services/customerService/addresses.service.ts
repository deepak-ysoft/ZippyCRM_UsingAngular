import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  http = inject(HttpClient);
  getAddresses(CId: any) {
    return this.http.get(
      `https://localhost:7269/api/Customer/GetAddreses/${CId}`
    );
  }

  insertAddress(address: any) {
    return this.http.post(
      `https://localhost:7269/api/Customer/CreateEditAddresses
`,
      address
    );
  }
  successDelete(id: number) {
    return this.http.delete(
      `https://localhost:7269/api/Customer/DeleteAddress/${id}`
    );
  }
}
