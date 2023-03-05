import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Folder} from "../../modelos/folder";
import {url} from "../../config/constants";

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

  getAll():Observable<Array<Folder>>{
    return this.http
      .get<Array<Folder>>(url + 'folder')
  }

  //#TODO BACK -> PARA RUTA PERSONALIZADA
  getAllFoldersOfUser(idUser:number):Observable<Array<Folder>>{
    return this.http.get<Array<Folder>>(url + 'folder?idUser=' + idUser)
  }

  getById(id:number):Observable<Folder>{
    return this.http.get<Folder>(url + 'folder/' + id)
  }

  addFolder(folder:Folder):Observable<Folder>{
    return this.http
      .post<Folder>(url + 'folder', folder, this.getHttpOptions())
  }

  updateFolder(id:number, folder:Folder){
    return this.http
      .put(url + 'folder/' + id, folder, this.getHttpOptions())
  }

  deleteFolder(id:number){
    return this.http
      .delete(url + 'folder/' + id)
  }
}
