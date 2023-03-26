import {Component, ElementRef, ViewChild} from '@angular/core';
import {Page} from "../../../modelos/page";
import {DataPageService} from "../../../servicios/fetchs/data-page.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {FoldersService} from "../../../servicios/folders.service";


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {


  page: Page = {
    id: 0,
    page_order: 0,
    id_folder: 0,
    titulo: "¡Bienvenido!",
    subtitulo: "Crea tus carpetas. \nEditá y organizá tus textos.",
    firma: "textOrganicer",
    contenido: "- Crea tus carpetas y páginas. " +
      "\n\n- Edita y organiza tus textos. " +
      "\n\n- Compartilos con quien quieras. " +
      "\n\n- Colaborá con tus compañeros. " +
      "\n\n- Descargá tus carpetas en PDF."
  };


  constructor(
    private pageService: DataPageService,
    private pService: FoldersService

  ) {
    this.pService.pageSelected.subscribe(res => {
      this.page = res;
    })
  }

  ngOnInit():void {

  }


  onChange(event: any) {
    if((event.type === 'blur' || event.key === 'Enter') && this.page.id !== 0){
      this.pageService.updatePage(this.page.id, this.page)
        .subscribe({
          next: res => {
            const index = this.pService.pages.findIndex(p => p.id === this.page.id);
            if(index >= 0) {
              this.pService.pages[index] = this.page;
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
  }
}
