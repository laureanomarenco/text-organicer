import { Injectable } from '@angular/core';
import {DataPageService} from "./fetchs/data-page.service";
import {Page} from "../modelos/page";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {EditService} from "./edit.service";

@Injectable({
  providedIn: 'root'
})
export class FoldersService {
  pages:Array<Page>;

  constructor(
    private servicePage:DataPageService,
    private pSelect: EditService
  ) { }

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
  modalPage:number;
  toggleModalFolder(id: number) {
    if(this.modalFolder === id) this.modalFolder = null;
    else {
      this.modalPage = null;
      this.modalFolder = id;
    }
  }

  toggleModalPage(id: number) {
    if(this.modalPage === id) this.modalPage = null;
    else {
      this.modalFolder = null;
      this.modalPage = id;
    }
  }

  selectPage(id: number){
    const nav = document.querySelector('#aside')
    nav.classList.remove('open')

    this.pSelect.setSelectedPage(id)
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
      idFolder: idFolder,
      titulo: "Ingrese un titulo",
      subtitulo: "Ingrese un subtitulo descriptivo del texto, recomendamos que no exceda las 3 lineas",
      firma: "Ingrese un firma, recomendamos nombre y fecha",
      contenido: "Ingrese el contenido, el texto tiene autoguardado por lo cual tenga cuidado al retirarse de la página."
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

}
