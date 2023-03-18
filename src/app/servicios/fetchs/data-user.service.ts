import { Injectable } from '@angular/core';
import { url } from "../../config/constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../modelos/user";

import {UserResponse} from "../../modelos/responses/userResponse";

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

  getAll():Observable<UserResponse>{
    return this.http.get<UserResponse>(url + 'user')
  }

  getById(id:number):Observable<UserResponse>{
    return this.http.get<UserResponse>(url + 'user/' + id)
  }

  getByUsername(username:string):Observable<UserResponse> {
    return this.http.get<UserResponse>(url + 'user/username?username=' + username )
  }

  addUser(user:User):Observable<UserResponse>{
    return this.http
      .post<UserResponse>(url + 'user', user, this.getHttpOptions())
  }

  updateUser(id:number, user:User): Observable<UserResponse>{
    return this.http.put<UserResponse>(url + 'user/' + id, user, this.getHttpOptions())

  }

  deleteUser(id:number){
    return this.http
      .delete(url + 'user/' + id)
  }


  getByToken(token: string): Observable<UserResponse>{
    return this.http.post<UserResponse>(url + "user/validateToken/" + token, this.getHttpOptions())
  }
}

