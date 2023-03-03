import { Component } from '@angular/core';
import {Page} from "../../../modelos/page";
import {PageService} from "../../../servicios/page.service";
import {DataPageService} from "../../../servicios/fetchs/data-page.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {


  page: Page = {
    id: 0,
    idFolder: 0,
    titulo: "Ingrese un titulo",
    subtitulo: "Ingrese un subtitulo",
    firma: "Ingrese un firma",
    contenido: "Ingrese un contenido"
  };

  constructor(
    private pageService: DataPageService,
    private pService: PageService

  ) {
    this.pService.pageSelected.subscribe(res => {
      this.page = res;
    })
  }

  ngOnInit():void {
  }


  resizeTextarea(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
  }


  onChange(event: any) {
    if(event.type === 'blur' || event.key === 'Enter'){
      this.pageService.updatePage(this.page.id, this.page)
        .subscribe({
          next: res => {
          console.log(this.page)
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
}
