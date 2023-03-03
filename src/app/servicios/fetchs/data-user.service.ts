import { Injectable } from '@angular/core';
import { url } from "../../constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../modelos/user";

@Injectable({
  providedIn: 'root'
})
export class DataUserService {

  constructor(private http:HttpClient) { }

  getHttpOptions(){
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  getAll():Observable<Array<User>>{
    return this.http.get<Array<User>>(url + 'user')
  }

  getById(id:number):Observable<User>{
    return this.http.get<User>(url + 'user/' + id)
  }

  addUser(user:User):Observable<User>{
    return this.http
      .post<User>(url + 'user', user, this.getHttpOptions())
  }

  updateUser(id:number, user:User){
    return this.http
      .put(url + 'user/' + id, user, this.getHttpOptions())
  }

  deleteUser(id:number){
    return this.http
      .delete(url + 'user/' + id)
  }
}

