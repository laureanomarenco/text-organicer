import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Page} from "../../modelos/page";
import {url} from "../../config/constants";
import {PageResponse} from "../../modelos/responses/PageResponse";

// #TODO Excepciones servidor caído
@Injectable({
  providedIn: 'root'
})
export class DataPageService {

  constructor(private http:HttpClient) { }

  getHttpOptions(){
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  getAll():Observable<PageResponse>{
    return this.http.get<PageResponse>(url + 'page')
  }

  getById(id:number):Observable<PageResponse>{
    return this.http.get<PageResponse>(url + 'page/' + id)
  }

  getByFolderId(idFolder:number):Observable<PageResponse>{
    return this.http.get<PageResponse>(url + 'page/byFolder/' + idFolder)
  }

  addPage(page:Page, id_folder: number):Observable<PageResponse>{
    return this.http
      .post<PageResponse>(url + 'page/' + id_folder, page, this.getHttpOptions())
  }

  updatePage(id:number, page:Page):Observable<PageResponse>{
    return this.http
      .put<PageResponse>(url + 'page/' + id, page, this.getHttpOptions())
  }

  deletePage(id:number){
    return this.http
      .delete(url + 'page/' + id)
  }
}
