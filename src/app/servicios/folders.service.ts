import { Injectable } from '@angular/core';
import {DataPageService} from "./data/data-page.service";
import {Page} from "../modelos/page";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {EditService} from "./edit.service";
import * as jsPDF from 'jspdf'
import {Folder} from "../modelos/folder";

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
          this.pages = res.data as Page[]
          const nav = document.querySelector('#aside')
          nav.classList.remove('open')
          this.open = id
        })
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


    this.pSelect.setSelectedPage(id)
  }
  borrarPagina(id: number) {
    Swal.fire({
      title: 'Estás seguro que querés eliminar esta página?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire('Página eliminada!', '', 'success')
        this.servicePage.deletePage(id)
          .subscribe({
            next: res  => { this.pages = this.pages.filter(p => p.id !== id)},
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
      titulo: "Ingrese un titulo",
      subtitulo: "Ingrese un subtitulo descriptivo del texto, recomendamos que no exceda las 3 lineas",
      firma: "Ingrese un firma, recomendamos nombre y fecha",
      contenido: "Ingrese el contenido, el texto tiene autoguardado por lo cual tenga cuidado al retirarse de la página."
    }

    this.servicePage.addPage(page, idFolder)
      .subscribe({
        next: res => {
          this.pages.push(res.data as Page)
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

  descargarPDF(id: number, nombre: string) {
    this.servicePage
      .getByFolderId(id)
      .subscribe(res => {
        const doc = new jsPDF();
        let filename = nombre + '.pdf';
        (res.data as Page[]).forEach(p => {
          const pageWidth = 210;
          const pageHeight = 297;
          doc.setFontSize(36)
          doc.setFont("helvetica", "normal")
          doc.text(p.titulo, 10, 20, {lineHeightFactor: 1.5, maxWidth: pageWidth - 20})

          let startY = 40;
          doc.setFontSize(24)
          let subLines = doc.splitTextToSize(p.subtitulo, pageWidth - 20)
          for(let i = 0; i < subLines.length; i++) {
            if (startY > pageHeight - 20) {
              doc.addPage();
              startY = 20;
            }
            doc.text(subLines[i], 10, startY, {lineHeightFactor: 1.5, maxWidth: pageWidth - 20})
            startY += 10
          }
          startY += 10
          doc.setFontSize(20)
          doc.text(p.firma, 10, startY, {lineHeightFactor: 1.5,maxWidth:pageWidth - 20})
          startY += 20

          doc.setFontSize(14)
          const contentLines = doc.splitTextToSize(p.contenido, pageWidth - 20);
          for (let i = 0; i < contentLines.length; i++) {
            if (startY > pageHeight - 20) {
              doc.addPage();
              startY = 20;
            }
            doc.text(contentLines[i], 10, startY, {lineHeightFactor: 1.5, maxWidth: pageWidth - 20});
            startY += 10;
          }
          doc.addPage()
        })
        doc.save(filename)
      })
  }
}
