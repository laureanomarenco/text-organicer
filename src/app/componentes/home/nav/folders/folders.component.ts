import { Component } from '@angular/core';
import { faEllipsisVertical, faPlus, faTrashCan, faPenToSquare, faShare, faClose, faShareNodes, faDownload } from "@fortawesome/free-solid-svg-icons";
import {Folder} from "../../../../modelos/folder";
import {DataFolderService} from "../../../../servicios/fetchs/data-folder.service";
import {DataUserService} from "../../../../servicios/fetchs/data-user.service";
import Swal from 'sweetalert2'
import {HttpErrorResponse} from "@angular/common/http";
import {Role} from "../../../../modelos/role";
import {DataCollaboratorsService} from "../../../../servicios/fetchs/data-collaborators.service";
import {FoldersService} from "../../../../servicios/folders.service";
import {Router} from "@angular/router";
import {RoleType} from "../../../../utils/roleTypes";
import {User} from "../../../../modelos/user";

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent {
  faElilipsisVertical = faEllipsisVertical; faPlus = faPlus; faTrash = faTrashCan;
  faEdit = faPenToSquare; faShare = faShare; faClose = faClose; faLink = faShareNodes;
  faDownload = faDownload;

  token: string = localStorage.getItem('token');
  user: User;
  folders: Folder[];

  constructor(
    private router: Router,
    private serviceFolder:DataFolderService,
    private collaboratorService: DataCollaboratorsService,
    private serviceUser:DataUserService,
    public foldersService: FoldersService,

  ) {}

  ngOnInit():void {
    if(this.token) {
      this.serviceUser.getByToken(this.token)
        .subscribe({
          next: res => {
            this.user = res.data as User
            this.folders = (res.data as User).folders;
          },
          error: (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log('Error de cliente o red', err.error.message);
              Swal.fire('Error de cliente o red', '', 'error');

            } else {
              console.log('Error en el servidor remoto', err.error.mensaje);
              this.router.navigate(['/landing'])
              Swal.fire('Error en el servidor', '', 'error');

            }
          }
        })
      } else this.router.navigate(['/landing'])
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
          nombre: res.value,
          is_public: false
        }
        this.serviceFolder.addFolder(newFolder, this.user.id)
          .subscribe({
            next: res => {
              let data: Folder = res.data as Folder
              this.folders.push(data)

              let role : Role = {
                role_type: RoleType.OWNER
              }

              this.collaboratorService.addCollaborator(role, this.user.id, data.id)
                .subscribe({
                  next: res => {
                    console.log(res)
                  },
                  error: (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                      console.log('Error de cliente o red', err.error.message);
                      Swal.fire('Error de cliente o red', '', 'error');
                    } else {
                      console.log('Error en el servidor remoto', err.error.mensaje);
                      Swal.fire(err.error.mensaje, '', 'error');
                    }
                  }
                })
            },
            error: (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log('Error de cliente o red', err.error.message);
                Swal.fire('Error de cliente o red', '', 'error');
              } else {
                console.log('Error en el servidor remoto', err.error.mensaje);
                Swal.fire(err.error.mensaje, '', 'error');
              }
            }
          })
      }
    })
  }
  deleteFolder(id:number) {
    Swal.fire({
      title: 'Estás seguro que querés eliminar esta carpeta?',
      text: 'Ni tu ni los colaboradores que pueda tener está carpeta podrán volver a acceder a ella',
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
              this.collaboratorService.deleteColabsOfFolder(id) // tal vez innecesario
            },
            error: (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log('Error de cliente o red', err.error.message);
                Swal.fire('Error de cliente o red', '', 'error');
              } else {
                console.log('Error en el servidor remoto', err.error.mensaje);
                Swal.fire(err.error.mensaje, '', 'error');
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
          id_user: folder.id_user,
          nombre: res.value,
          is_public: folder.is_public
        }
        this.serviceFolder.updateFolder(folder.id, upFolder)
          .subscribe({
            next: res => {
              if(res.success) {
                this.folders = this.folders.filter(f => f.id !== upFolder.id)
                this.folders.push(upFolder)
                this.foldersService.modalFolder = null
              }
            },
            error: (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log('Error de cliente o red', err.error.message);
                Swal.fire('Error de cliente o red', '', 'error');
              } else {
                console.log('Error en el servidor remoto', err.error.mensaje);
                Swal.fire(err.error.mensaje, '', 'error');
              }
            }
          })
      }
    })
  }
  exists : boolean = false;
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

        this.serviceUser.getByUsername(res.value)
          .subscribe({
            next: res => {

              let id_user = (res.data as User).id;
              let id_folder = idFolder;

              let colaborador:Role = {
                role_type: RoleType.COLLABORATOR
              }

              this.collaboratorService.getAllByFolderId(id_folder)
                .subscribe({
                  next: res => {
                    (res.data as Role[]).forEach(c => {
                      if(id_user === c.id_user){
                        this.exists = true;
                      }
                    })
                    if(!this.exists){
                      this.collaboratorService.addCollaborator(colaborador, id_user, id_folder)
                        .subscribe({
                          next: res => {
                            this.foldersService.modalFolder = null;
                            Swal.fire('Colaborador agregado', '', 'success');
                          },
                          error: (err: HttpErrorResponse) => {
                            if (err.error instanceof Error) {
                              console.log('Error de cliente o red', err.error.message);
                              Swal.fire('Error de cliente o red', '', 'error');
                            } else {
                              console.log('Error en el servidor remoto', err.error.mensaje);
                              Swal.fire(err.error.mensaje, '', 'error');
                            }
                          }
                        })
                    } else {
                      this.foldersService.modalFolder = null;
                      Swal.fire('El usuario ya es colaborador de la carpeta', '', 'error');
                    }
                  },
                  error: (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                      console.log('Error de cliente o red', err.error.message);
                      Swal.fire('Error de cliente o red', '', 'error');
                    } else {
                      console.log('Error en el servidor remoto', err.error.mensaje);
                      Swal.fire(err.error.mensaje, '', 'error');
                    }
                  }
                })
            },
            error: (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log('Error de cliente o red', err.error.message);
                this.foldersService.modalFolder = null;
                Swal.fire('Error de cliente o red', '', 'error');
              } else {
                console.log('Error en el servidor remoto', err.error.mensaje);
                Swal.fire('Error en el servidor', '', 'error');
              }
            }
          })


      }
    })
  }
  cambiarVisibilidad(id: number) {
    this.serviceFolder.getById(id)
      .subscribe({
        next: res => {

          let data: Folder = res.data as Folder

          let up = {
            id: data.id,
            id_user: data.id_user,
            nombre: data.nombre,
            is_public: true
          }
          this.serviceFolder.updateFolder(id, up)
            .subscribe({
              next: res => {
                if(res.success) this.router.navigate(['/publicfolder', id]);
              },
              error: (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                  console.log('Error de cliente o red', err.error.message);
                  this.foldersService.modalFolder = null;
                  Swal.fire('Error de cliente o red', '', 'error');
                } else {
                  console.log('Error en el servidor remoto', err.error.mensaje);
                  Swal.fire(err.error.mensaje, '', 'error');
                }
              }
            })
        },
        error: (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Error de cliente o red', err.error.message);
            this.foldersService.modalFolder = null;
            Swal.fire('Error de cliente o red', '', 'error');
          } else {
            console.log('Error en el servidor remoto', err.error.mensaje);
            Swal.fire(err.error.mensaje, '', 'error');
          }
        }
      })
  }

}
