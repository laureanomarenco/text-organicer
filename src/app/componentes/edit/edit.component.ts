import { Component } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  form = {
    titulo: "Ingrese un titulo",
    subtitulo: "Ingrese un subtitulo",
    firma: "Ingrese un firma",
    contenido: "Ingrese un contenido"
  }
}
