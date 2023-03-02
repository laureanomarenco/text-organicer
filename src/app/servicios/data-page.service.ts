import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../modelos/page";
import {url} from "../constants";

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

  getAll():Observable<Array<Page>>{
    return this.http.get<Array<Page>>(url + 'page')
  }

  getById(id:number):Observable<Page>{
    return this.http.get<Page>(url + 'page/' + id)
  }

  //PARA RUTA PERSONALIZADA
  getByFolderId(idFolder:number):Observable<Array<Page>>{
    return this.http.get<Array<Page>>(url + 'page?idFolder=' + idFolder)
  }

  addPage(page:Page):Observable<Page>{
    return this.http
      .post<Page>(url + 'page', page, this.getHttpOptions())
  }

  updatePage(id:number, page:Page){
    return this.http
      .put(url + 'page/' + id, page, this.getHttpOptions())
  }

  deletePage(id:number){
    return this.http
      .delete(url + 'page/' + id)
  }
}
