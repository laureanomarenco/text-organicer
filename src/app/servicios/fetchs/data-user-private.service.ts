import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {url} from "../../config/constants";
import {UserPrivate} from "../../modelos/userPrivate";
import {User} from "../../modelos/user";

@Injectable({
  providedIn: 'root'
})
export class DataUserPrivateService {

  constructor(private http:HttpClient) { }

  getHttpOptions(){
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  getAll():Observable<Array<UserPrivate>>{
    return this.http.get<Array<UserPrivate>>(url + 'user_private')
  }

  getById(id:number):Observable<UserPrivate>{
    return this.http.get<UserPrivate>(url + 'user_private/' + id)
  }

  addUserPrivate(userPrivate:UserPrivate):Observable<UserPrivate>{
    return this.http
      .post<UserPrivate>(url + 'user_private', userPrivate, this.getHttpOptions())
  }

  updateUserPrivate(id:number, userPrivate:UserPrivate){
    return this.http
      .put(url + 'user_private/' + id, userPrivate, this.getHttpOptions())
  }

  deleteUserPrivate(id:number){
    return this.http
      .delete(url + 'user_private/' + id)
  }

  validateUser(user:UserPrivate):Observable<User> | null{
    return this.http.post<User>(url + 'user_private/login', user, this.getHttpOptions())
  }
}
