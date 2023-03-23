import { Component } from '@angular/core';
import {DataCollaboratorsService} from "../../../../servicios/data/data-collaborators.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {Folder} from "../../../../modelos/folder";
import {DataFolderService} from "../../../../servicios/data/data-folder.service";
import {FoldersService} from "../../../../servicios/folders.service";
import { faEllipsisVertical,  faTrashCan, faClose } from "@fortawesome/free-solid-svg-icons";
import {Role} from "../../../../modelos/role";
import {Router} from "@angular/router";
import {User} from "../../../../modelos/user";
import {DataUserService} from "../../../../servicios/data/data-user.service";

@Component({
  selector: 'app-compartidas',
  templateUrl: './compartidas.component.html',
  styleUrls: ['./compartidas.component.css']
})
export class CompartidasComponent {
  faElilipsisVertical = faEllipsisVertical; faTrash = faTrashCan; faClose = faClose;

  token: string = localStorage.getItem('token');
  folders: Array<Folder> = [];
  user: User;

  //#TODO BLOQUEAR EDICIÓN DOBLE
  constructor(
    private router: Router,
    private userService: DataUserService,
    private compartidasService: DataCollaboratorsService,
    private dataFolderService: DataFolderService,
    public folderService: FoldersService
  ) {
    if(this.token) {
      this.userService.getByToken(this.token)
        .subscribe({
          next: res => {
            this.user = res.data as User
            this.compartidasService.getAllByUserId(this.user.id)
              .subscribe({
                next: res => {
                  (res.data as Role[]).forEach(c => {
                    this.dataFolderService.getById(c.id_folder)
                      .subscribe({
                        next: res => {
                          console.log(res)

                          this.folders.push(res.data as Folder)
                        },
                        error: (err: HttpErrorResponse) => {
                          if (err.error instanceof Error) {
                            console.log('Error de cliente o red', err.error.message);
                            Swal.fire('Error de cliente o red', '', 'error');
                          } else {
                            console.log('Error en el servidor remoto', err.error.message);
                            Swal.fire('Error en el servidor', '', 'error');
                            this.router.navigate(['/landing'])

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

    } else this.router.navigate(['/landing'])
  }

  borrarCollaborator(id_folder: number) {
    Swal.fire({
      title: 'Estás seguro que querés dejar de colaborar con esta carpeta?',
      showDenyButton: true,
      confirmButtonText: 'Cerrar colaboración',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.compartidasService.getColabToDelete(id_folder, this.user.id)
          .subscribe({
            next: res => {
              this.folders = this.folders.filter(f => f.id !== (res.data as Role).id_folder)
              this.compartidasService.deleteCollaborator((res.data as Role).id)
                .subscribe({
                  next: res => { Swal.fire('Colaboración cerrada', '', 'success')},
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
    })
  }
}
