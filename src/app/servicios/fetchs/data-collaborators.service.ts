import { Injectable } from '@angular/core';
import {DataUserService} from "./data-user.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import Swal from "sweetalert2";
import {Collaborator} from "../../modelos/collaborator";
import {Observable} from "rxjs";
import {url} from "../../constants";
import {DataFolderService} from "./data-folder.service";

@Injectable({
  providedIn: 'root'
})
export class DataCollaboratorsService {

  constructor(
    private http:HttpClient,

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
    return this.http.post<Collaborator>(url + 'collaborator', collaborator,this.getHttpOptions())
  }

  //#TODO Back -> Endpoint con query
  getAllByUserId(idUser: number):Observable<Array<Collaborator>> {
    return this.http.get<Array<Collaborator>>(url + 'collaborator?idUser=' + idUser)
  }

  //#TODO Back -> Endpoint con dos query
  getColabToDelete(idFolder:number, idUser:number):Observable<Collaborator>{
    return this.http.get<Collaborator>(url + 'collaborator?idFolder=' + idFolder + '&idUser=' + idUser)
  }

  deleteCollaborator(id:number): Observable<Collaborator>{
    return this.http.delete<Collaborator>(url + 'collaborator/' + id)
  }

  getAllByFolderId(idFolder:number): Observable<Array<Collaborator>>{
    return this.http.get<Array<Collaborator>>(url + 'collaborator?idFolder=' + idFolder)
  }
  deleteColabsOfFolder(idFolder:number){
    this.getAllByFolderId(idFolder)
      .subscribe({
        next: res => {
          res.forEach(c => {
            this.deleteCollaborator(c.id)
              .subscribe({
                next: res => {},
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

          })
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

  }
}
