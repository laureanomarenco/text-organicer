import { Component } from '@angular/core';
import {DataCollaboratorsService} from "../../../../servicios/fetchs/data-collaborators.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {Folder} from "../../../../modelos/folder";
import {DataFolderService} from "../../../../servicios/fetchs/data-folder.service";
import {FoldersService} from "../../../../servicios/folders.service";
import { faEllipsisVertical, faPlus, faTrashCan, faPenToSquare, faShare, faClose, faShareNodes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-compartidas',
  templateUrl: './compartidas.component.html',
  styleUrls: ['./compartidas.component.css']
})
export class CompartidasComponent {
  faElilipsisVertical = faEllipsisVertical; faPlus = faPlus; faTrash = faTrashCan; faEdit = faPenToSquare; faShare = faShare; faClose = faClose; faLink = faShareNodes
  userID:number = 2;
  folders:Array<Folder> = [];


  //#TODO FALTA EVITAR QUE SE PUEDA COMPARTIR DOS VECES CON EL MISMO USUARIO, Y BLOQUEAR LA EDICIÓN
  constructor(
    private compartidasService: DataCollaboratorsService,
    private dataFolderService: DataFolderService,
    public folderService: FoldersService
  ) {
    this.compartidasService.getAllByUserId(this.userID)
      .subscribe({
        next: res => {
          res.forEach(c => {
            console.log(c)

            this.dataFolderService.getById(c.idFolder)
              .subscribe({
                next: res => {
                  console.log(res)

                  this.folders.push(res)
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

  borrarCollaborator(idFolder: number) {
    Swal.fire({
      title: 'Estás seguro que querés dejar de colaborar con esta carpeta?',
      showDenyButton: true,
      confirmButtonText: 'Cerrar colaboración',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.compartidasService.getColabToDelete(idFolder, this.userID)
          .subscribe({
            next: res => {
              console.log(res)
              this.folders = this.folders.filter(f => f.id !== res[0].idFolder)
              this.compartidasService.deleteCollaborator(res[0].id)
                .subscribe({
                  next: res => {
                    Swal.fire('Colaboración cerrada', '', 'success')
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
      }
    })
  }
}
