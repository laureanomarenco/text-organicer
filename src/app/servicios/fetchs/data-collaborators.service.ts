import { Injectable } from '@angular/core';
import {DataUserService} from "./data-user.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import Swal from "sweetalert2";
import {Collaborator} from "../../modelos/collaborator";
import {Observable} from "rxjs";
import {url} from "../../constants";

@Injectable({
  providedIn: 'root'
})
export class DataCollaboratorsService {


  collaborator: Collaborator;
  constructor(
    private http:HttpClient,
    private dataUserService: DataUserService,
  ) { }

  private getHttpOptions(){
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
  }


  id: number;
  addCollaborator(collaborator: Collaborator):Observable<Collaborator>{
    this.dataUserService.getByUsername(collaborator.username)
      .subscribe({
        next: res => {
          this.id= res.id
        },
        error: (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Error de cliente o red', err.error.message);
            Swal.fire('Error de cliente o red', '', 'error');
          } else {
            console.log('Error en el servidor remoto', err.error.message);
            Swal.fire('Error en el servidor', '', 'error');
          }
        }
      })
    this.collaborator = {
      idUser: this.id,
      idFolder: collaborator.idFolder,
      username: collaborator.username
    }
    return this.http.post<Collaborator>(url + 'collaborator', this.collaborator,this.getHttpOptions())
  }
}
