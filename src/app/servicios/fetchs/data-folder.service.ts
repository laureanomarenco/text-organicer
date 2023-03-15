import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Folder} from "../../modelos/folder";
import {url} from "../../config/constants";
import {FolderResponse} from "../../modelos/responses/FolderResponse";

@Injectable({
  providedIn: 'root'
})
export class DataFolderService {

  constructor(private http:HttpClient) { }

  private getHttpOptions(){
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  getAll():Observable<FolderResponse>{
    return this.http
      .get<FolderResponse>(url + 'folder')
  }

  getAllFoldersOfUser(idUser:number):Observable<FolderResponse>{
    return this.http.get<FolderResponse>(url + 'folder/byUser/' + idUser)
  }

  getById(id:number):Observable<FolderResponse>{
    return this.http.get<FolderResponse>(url + 'folder/' + id)
  }

  addFolder(folder:Folder, id_user: number):Observable<FolderResponse>{
    return this.http
      .post<FolderResponse>(url + 'folder/' + id_user, folder, this.getHttpOptions())
  }

  updateFolder(id:number, folder:Folder):Observable<FolderResponse>{
    return this.http
      .put<FolderResponse>(url + 'folder/' + id, folder, this.getHttpOptions())
  }

  deleteFolder(id:number){
    return this.http
      .delete(url + 'folder/' + id)
  }
}
