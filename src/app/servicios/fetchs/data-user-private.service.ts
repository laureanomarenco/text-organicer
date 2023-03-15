import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {url} from "../../config/constants";
import {UserPrivate} from "../../modelos/userPrivate";
import {DataUserService} from "./data-user.service";
import {UserResponse} from "../../modelos/responses/userResponse";
import {UserPrivateResponse} from "../../modelos/responses/userPrivateResponse";

@Injectable({
  providedIn: 'root'
})
export class DataUserPrivateService {

  constructor(
    private http:HttpClient,
    private userService: DataUserService
  ) { }

  getHttpOptions(){
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }

  getAll():Observable<UserPrivateResponse>{
    return this.http.get<UserPrivateResponse>(url + 'user_private')
  }

  getById(id:number):Observable<UserPrivateResponse>{
    return this.http.get<UserPrivateResponse>(url + 'user_private/' + id)
  }

  addUserPrivate(userPrivate:UserPrivate, id:number):Observable<UserPrivateResponse>{
    return this.http
      .post<UserPrivateResponse>(url + 'user_private/' + id, userPrivate, this.getHttpOptions())
  }

  updateUserPrivate(id:number, userPrivate:UserPrivate):Observable<UserPrivateResponse>{
    return this.http
      .put<UserPrivateResponse>(url + 'user_private/' + id, userPrivate, this.getHttpOptions())
  }

  deleteUserPrivate(id:number){
    return this.http
      .delete(url + 'user_private/' + id)
  }

  validateUser(user:UserPrivate):Observable<any> {
    return this.http.post<any>(url + 'user_private/login', user, this.getHttpOptions())
  }

}
