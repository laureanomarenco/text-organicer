import { Component } from '@angular/core';
import {DataUserService} from "../../../../servicios/fetchs/data-user.service";
import {User} from "../../../../modelos/user";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  users:Array<User> = []

  constructor(private service:DataUserService) {}

  ngOnInit():void {
    this.service
      .getAll()
      .subscribe({
          next: res => {
            this.users = res
            console.log(this.users)
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
        }
      )

  }
}
