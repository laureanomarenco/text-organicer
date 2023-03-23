import { Injectable } from '@angular/core';
import {DataUserService} from "./data-user.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import Swal from "sweetalert2";
import {Role} from "../../modelos/role";
import {Observable} from "rxjs";
import {url} from "../../config/constants";
import {DataFolderService} from "./data-folder.service";
import {RoleResponse} from "../../modelos/responses/RoleResponse";

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
  addCollaborator(collaborator: Role, id_user: number, id_folder: number):Observable<RoleResponse>{
    return this.http.post<RoleResponse>(url + 'role?id_user=' + id_user + '&id_folder=' + id_folder, collaborator,this.getHttpOptions())
  }

  getAllByUserId(idUser: number):Observable<RoleResponse> {
    return this.http.get<RoleResponse>(url + 'role/byUser/' + idUser)
  }

  getColabToDelete(id_folder:number, id_user:number):Observable<RoleResponse>{
    return this.http.get<RoleResponse>(url + 'role/byUserAndFolder?id_folder=' + id_folder + '&id_user=' + id_user)
  }

  deleteCollaborator(id:number): Observable<RoleResponse>{
    return this.http.delete<RoleResponse>(url + 'role/' + id)
  }

  getAllByFolderId(id_folder:number): Observable<RoleResponse>{
    return this.http.get<RoleResponse>(url + 'role/byFolder/' + id_folder)
  }

  deleteColabsOfFolder(id_folder:number){
    this.getAllByFolderId(id_folder)
      .subscribe({
        next: res => {
          (res.data as Role[]).forEach(c => {
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
