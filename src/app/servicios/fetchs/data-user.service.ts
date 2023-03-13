import { Injectable } from '@angular/core';
import { url } from "../../config/constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../modelos/user";
import {UserPrivate} from "../../modelos/userPrivate";

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

  //#TODO Back -> cambiar rut a user/username?username=
  getByUsername(username:string):Observable<User> {
    return this.http.get<User>(url + 'user?username=' + username )
  }

  //#TODO Hay que crear user y luego user private, al post de user private pasarle por params el id del user que se creó.
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

