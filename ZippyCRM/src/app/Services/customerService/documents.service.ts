import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  constructor(private http: HttpClient) {}

  getDocuments(customerId: any) {
    return this.http.get(
      `https://localhost:7269/api/Customer/GetAllFiles?customerId=${customerId}`
    );
  }

  getChildAndParentDocuments(path: any) {
    return this.http.get<any[]>(
      `https://localhost:7269/api/Customer/GetFolderContents?path=${path}`
    );
  }
  copyFolder(
    currentFolderName: string | undefined,
    customerId: number | undefined,
    type: string | undefined,
    filePath: string | undefined
  ): Observable<any> {
    // Ensure the parameters are strings with fallback values
    const folderName = currentFolderName ?? '';
    const customer = customerId ?? 0; // If customerId is mandatory, handle accordingly
    const folderType = type ?? 'folder';
    const path = filePath ?? '';

    // Prepare the params for the query string
    const params = new HttpParams()
      .set('CurrentFolderName', folderName)
      .set('customerId', customer.toString())
      .set('Type', folderType)
      .set('filePath', path);

    return this.http.post(
      `https://localhost:7269/api/Customer/CopyFolder`,
      {},
      { params }
    );
  }
  pasteFolder(
    destinationFoldername: string,
    customerId: number,
    sourceFolderPath: string
  ): Observable<any> {
    const folderName = destinationFoldername ?? '';
    const id = customerId ?? 0;
    const filepath = sourceFolderPath ?? '';
    const params = new HttpParams()
      .set('destinationFoldername', folderName)
      .set('customerId', id)
      .set('sourceFolderPath', filepath);
    return this.http.post(
      `https://localhost:7269/api/Customer/PasteFolder`,
      {},
      { params }
    );
  }

  deleteFolder(folderName: string, filePath: string): Observable<any> {
    const ffolderName = folderName ?? '';
    const filepath = filePath ?? '';
    const params = new HttpParams()
      .set('folderName', ffolderName)
      .set('filePath', filepath);

    return this.http.delete(
      `https://localhost:7269/api/Customer/DeleteFolder`,
      {
        params,
      }
    );
  }
  createFolder(
    folderName: string,
    currentPath: string,
    customerId: number
  ): Observable<any> {
    const foldername = folderName ?? '';
    const currentpath = currentPath ?? '';
    const id = customerId ?? 0;
    const params = new HttpParams()
      .set('folderName', foldername)
      .set('currentPath', currentpath)
      .set('customerId', id);
    return this.http.post(
      `https://localhost:7269/api/Customer/CreateDirectory`,
      {},
      { params }
    );
  }

  serchFileOrFolderSer(customerId: number, serchFolder: string) {
    return this.http.get(
      `https://localhost:7269/api/Customer/GetAllFilesBySearching?customerId=${customerId}&searchQuery=${serchFolder}`
    );
  }

  getDirectory(path: any) {
    return this.http.get(
      `https://localhost:7269/api/Customer/GetDirectory?path=${path}`
    );
  }

  renameFolder(
    folderN: string,
    currentFolder: string,
    newFolderName: string
  ): Observable<any> {
    const foldername = folderN ?? '';
    const currentfolder = currentFolder ?? '';
    const newfoldername = newFolderName ?? '';
    const params = new HttpParams()
      .set('folderN', foldername)
      .set('currentFolder', currentfolder)
      .set('newFolderName', newfoldername);
    return this.http.post(
      `https://localhost:7269/api/Customer/RenameFolder`,
      {},
      {
        params,
      }
    );
  }
}
