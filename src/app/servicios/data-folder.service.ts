import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Folder} from "../modelos/folder";
import {url} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class DataFolderService {

  constructor(private http:HttpClient) { }

  getHttpOptions(){
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  getAll():Observable<Array<Folder>>{
    return this.http.get<Array<Folder>>(url + 'folder')
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
