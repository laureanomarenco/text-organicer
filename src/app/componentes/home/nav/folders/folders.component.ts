import { Component } from '@angular/core';
import { faEllipsisVertical, faPlus, faTrashCan, faPenToSquare, faShare, faClose, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import {Folder} from "../../../../modelos/folder";
import {DataFolderService} from "../../../../servicios/fetchs/data-folder.service";
import {Page} from "../../../../modelos/page";
import {DataPageService} from "../../../../servicios/fetchs/data-page.service";
import {DataUserService} from "../../../../servicios/fetchs/data-user.service";
import Swal from 'sweetalert2'
import {PageService} from "../../../../servicios/page.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Collaborator} from "../../../../modelos/collaborator";
import {DataCollaboratorsService} from "../../../../servicios/fetchs/data-collaborators.service";
@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent {
  faElilipsisVertical = faEllipsisVertical; faPlus = faPlus; faTrash = faTrashCan; faEdit = faPenToSquare; faShare = faShare; faClose = faClose; faLink = faShareNodes

  //#TODO Manejo de sesión user
  // Tal vez compruebo con token, se verá en back
  userID:number = 1;
  folders:Array<Folder>;
  pages:Array<Page>;


  constructor(
    private serviceFolder:DataFolderService,
    private servicePage:DataPageService,
    private pageService: PageService,
    private collaboratorService: DataCollaboratorsService,
    private serviceUser:DataUserService
  ) {}

  ngOnInit():void {
    // this.serviceUser
    //   .getById(this.userID)
    //   .subscribe(res => {
    //
    //   })

    this.serviceFolder
      .getAllFoldersOfUser(this.userID)
        .subscribe({
          next: res => {
          this.folders = res
          console.log(this.folders)
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


  selectPage(id: number){
    this.pageService.setSelectedPage(id)
  }

  open:number;
  openFolder(id: number) {
    if(this.open === id) this.open = null
    else {
      this.servicePage
        .getByFolderId(id)
        .subscribe(res => {
          this.pages = res
        })
      this.open = id
    }
  }

  modalFolder:number;
  toggleModalFolder(id: number) {
    if(this.modalFolder === id) this.modalFolder = null;
    else this.modalFolder = id;
  }

  modalPage:number;
  toggleModalPage(id: number) {
    if(this.modalPage === id) this.modalPage = null;
    else this.modalPage = id;
  }

  deleteFolder(id:number) {
    Swal.fire({
      title: 'Estás seguro que querés eliminar esta carpeta?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Carpeta eliminada!', '', 'success')
        this.serviceFolder.deleteFolder(id)
          .subscribe({
            next: res => {
              this.folders = this.folders.filter(f => f.id !== id)
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



  newFolder() {
    Swal.fire({
      title: "Nuevo titulo",
      html: `
        <div>
            <input type="text" id="nombre" placeholder="Nombre de carpeta">
        </div>
        `,
      confirmButtonText: 'Crear',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
      preConfirm: () => {
        const nuevoTitulo = (Swal.getPopup().querySelector('#nombre') as HTMLInputElement).value

        return nuevoTitulo
      }
    }).then(async (res) => {
      if(res.isConfirmed){
        let newFolder:Folder= {
          id: 10,
          idUser: this.userID,
          nombre: res.value,
          public: false
        }
        this.serviceFolder.addFolder(newFolder)
          .subscribe({
            next: res => {
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
      }
    })

  }


  cambiarNombreCarpeta(folder: Folder) {
    Swal.fire({
      title: "Nuevo titulo",
      html: `
        <div>
            <input type="text" id="nombre" placeholder="Nombre de carpeta">
        </div>
        `,
      confirmButtonText: 'Cambiar',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
      preConfirm: () => {
        const nuevoTitulo = (Swal.getPopup().querySelector('#nombre') as HTMLInputElement).value

        return nuevoTitulo
      }
    }).then(async (res) => {
      if(res.isConfirmed){
        let upFolder:Folder= {
          id: folder.id,
          idUser: folder.idUser,
          nombre: res.value,
          public: folder.public
        }
        this.serviceFolder.updateFolder(folder.id, upFolder)
          .subscribe({
            next: res => {
              this.folders = this.folders.filter(f => f.id !== upFolder.id)
              this.folders.push(upFolder)
              this.modalFolder = null
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

  borrarPagina(id: number) {
    Swal.fire({
      title: 'Estás seguro que querés eliminar esta página?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Página eliminada!', '', 'success')
        this.servicePage.deletePage(id)
          .subscribe({
            next: res  => {
              this.pages = this.pages.filter(p => p.id !== id)
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

  newPage(idFolder: number) {

    let page:Page = {
      id: 20,
      idFolder: idFolder,
      titulo: "Ingrese un titulo",
      subtitulo: "Ingrese un subtitulo",
      firma: "Ingrese un firma",
      contenido: "Ingrese un contenido"
    }
    this.servicePage.addPage(page)
      .subscribe({
        next: res => {
          this.pages.push(res)
          this.modalPage = null;
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

  agregarColaborador(idFolder:number) {
    Swal.fire({
      title: "Ingrese el username de su nuevo colaborador",
      html: `
        <div>
            <input type="text" id="nombre" placeholder="username">
        </div>
        `,
      confirmButtonText: 'Agregar',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
      preConfirm: () => {
        const nuevoColaborador = (Swal.getPopup().querySelector('#nombre') as HTMLInputElement).value

        return nuevoColaborador
      }
    }).then(async (res) => {
      if(res.isConfirmed){
        let colaborador:Collaborator= {
          idFolder: idFolder,
          username: res.value,
        }
        this.collaboratorService.addCollaborator(colaborador)
          .subscribe({
            next: res => {
              this.modalFolder = null;
              Swal.fire('Colaborador agregado', '', 'success');
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
