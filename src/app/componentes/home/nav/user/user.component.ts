import { Component } from '@angular/core';
import {DataUserService} from "../../../../servicios/fetchs/data-user.service";
import {User} from "../../../../modelos/user";
import {HttpErrorResponse} from "@angular/common/http";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  faBars = faBars;
  users: User[];

  constructor(private service:DataUserService) {}

  ngOnInit():void {
    this.service
      .getAll()
      .subscribe({
          next: res => {
            if(res.success) this.users = res.data as User[]
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

    if(window.innerWidth > 600){
      const bars = document.querySelector('#bars')
      bars.classList.add('hidden')
    }
  }

  toggleNav() {
    const nav = document.querySelector('#aside')
    console.log(nav)
    if(nav.classList.contains('open')){
      nav.classList.remove('open')
    } else nav.classList.add('open')
  }
}
