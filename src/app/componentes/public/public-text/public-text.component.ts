import { Component } from '@angular/core';
import {Page} from "../../../modelos/page";
import {EditService} from "../../../servicios/edit.service";


@Component({
  selector: 'app-public-text',
  templateUrl: './public-text.component.html',
  styleUrls: ['./public-text.component.css']
})
export class PublicTextComponent {

  page: Page  = {
    id: 0,
    id_folder: 0,
    titulo: "¡Bienvenido!",
    subtitulo: "Navega entre los textos de esta carpeta",
    firma: "textOrganicer",
    contenido: "Para servirle"
  };

  constructor(
    private pService: EditService

  ){
    this.pService.pageSelected.subscribe(res => {
      this.page = res;
    })
  }

}
