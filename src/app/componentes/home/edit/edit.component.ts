import { Component } from '@angular/core';
import {Page} from "../../../modelos/page";
import {ActivatedRoute} from "@angular/router";
import {DataPageService} from "../../../servicios/data-page.service";
import {FoldersComponent} from "../nav/folders/folders.component";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  form = {
    id: 0,
    idFolder: 0,
    titulo: "Ingrese un titulo",
    subtitulo: "Ingrese un subtitulo",
    firma: "Ingrese un firma",
    contenido: "Ingrese un contenido"
  }

  page: Page = {
    id: 0,
    idFolder: 0,
    titulo: "Ingrese un titulo",
    subtitulo: "Ingrese un subtitulo",
    firma: "Ingrese un firma",
    contenido: "Ingrese un contenido"
  };



  constructor(
    private route: ActivatedRoute,
    private pageService: DataPageService,

  ) {
    this.pageService.pageSelected.subscribe(res => {
      this.page = res;
    })
  }

  ngOnInit():void {
  }

  auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
  }
}
