import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Page} from "../modelos/page";
import {url} from "../constants";

// #TODO Excepciones servidor caído
@Injectable({
  providedIn: 'root'
})
export class DataPageService {

  // pageSelected:Page = {
  //   id: 0,
  //   idFolder: 0,
  //   titulo: "Ingrese un titulo",
  //   subtitulo: "Ingrese un subtitulo",
  //   firma: "Ingrese un firma",
  //   contenido: "Ingrese un contenido"
  // };
  pageSelected: EventEmitter<Page> = new EventEmitter<Page>()

  constructor(private http:HttpClient) { }

  getHttpOptions(){
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  setSelectedPage(id:number){
    this.getById(id).subscribe(res => {
      this.pageSelected.emit(res)
    })
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
