import { Component } from '@angular/core';
import {DataCollaboratorsService} from "../../../../servicios/fetchs/data-collaborators.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {Folder} from "../../../../modelos/folder";
import {DataFolderService} from "../../../../servicios/fetchs/data-folder.service";
import {FoldersService} from "../../../../servicios/folders.service";
import { faEllipsisVertical,  faTrashCan, faClose } from "@fortawesome/free-solid-svg-icons";
import {Role} from "../../../../modelos/role";

@Component({
  selector: 'app-compartidas',
  templateUrl: './compartidas.component.html',
  styleUrls: ['./compartidas.component.css']
})
export class CompartidasComponent {
  faElilipsisVertical = faEllipsisVertical; faTrash = faTrashCan; faClose = faClose;

  //#todo user
  userID:number = 1;
  folders:Array<Folder> = [];


  //#TODO BLOQUEAR EDICIÓN DOBLE
  constructor(
    private compartidasService: DataCollaboratorsService,
    private dataFolderService: DataFolderService,
    public folderService: FoldersService
  ) {
    this.compartidasService.getAllByUserId(this.userID)
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

  borrarCollaborator(id_folder: number) {
    Swal.fire({
      title: 'Estás seguro que querés dejar de colaborar con esta carpeta?',
      showDenyButton: true,
      confirmButtonText: 'Cerrar colaboración',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.compartidasService.getColabToDelete(id_folder, this.userID)
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
