import { Component } from '@angular/core';
import {DataUserService} from "../../../../servicios/fetchs/data-user.service";
import {User} from "../../../../modelos/user";
import {HttpErrorResponse} from "@angular/common/http";
import {faBars, faClose} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {DataUserPrivateService} from "../../../../servicios/fetchs/data-user-private.service";
import {UserPrivate} from "../../../../modelos/userPrivate";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  faBars = faBars; faClose = faClose;

  token: string = localStorage.getItem('token');
  user: User;
  userPrivate: UserPrivate;

  constructor(
    private router: Router,
    private service:DataUserService,
    private serviceUserPrivate:DataUserPrivateService

  ) {}

  ngOnInit():void {
    this.service.getByToken(this.token)
      .subscribe({
        next: res => {
          this.user = res.data as User
        },
        error: (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Error de cliente o red', err.error.message);
            Swal.fire('Error de cliente o red', '', 'error');

          } else {
            console.log('Error en el servidor remoto', err.error.mensaje);
            Swal.fire(err.error.mensaje, '', 'error');
            //this.router.navigate(['/landing'])

          }
        }
      })


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

  modal:boolean = false;
  userModal() {
    if(this.modal) this.modal = false
    else {
      this.serviceUserPrivate.getById(this.user.id)
        .subscribe({
          next: res => {
            this.userPrivate = res.data as UserPrivate
            this.modal = true
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
  };

  modalEdit: boolean = true;
  modalPass: boolean = false;
  modalData: boolean = false;

  logOut() {
    localStorage.removeItem('token')
    this.router.navigate(['/landing'])
  }

  updateUser(formularioUpdateUser) {
    let usUp: User = {
      id: this.user.id,
      username: formularioUpdateUser.value.username,
      imagen: null,
      token: this.token,
    }

    this.service.updateUser(this.user.id, usUp)
      .subscribe({
        next: res => {
          this.user = res.data as User
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

    let upUp: any = {
      id: this.userPrivate.id,
      mail: formularioUpdateUser.value.mail,
    }
    this.serviceUserPrivate.updateEmail(this.userPrivate.id, this.userPrivate)
      .subscribe({
        next: res => {
          this.userPrivate = res.data as UserPrivate
          Swal.fire("Datos actualizados!", "", "success")
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

  password: string;
  passAgain: string;
  changePass(formulacioChangePass) {
    if(this.password === this.passAgain) {

      let upUpdate: UserPrivate = {
        id: this.userPrivate.id,
        mail: this.userPrivate.mail,
        password: formulacioChangePass.value.password,
        user_id: this.user.id
      }

      this.serviceUserPrivate.updateUserPrivate(upUpdate.id, upUpdate)
        .subscribe({
          next: res => {
            this.userPrivate = res.data as UserPrivate
            Swal.fire("Contraseña cambiada", "", "success")
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

    } else Swal.fire("Las contraseñas no coinciden", "", "error")
  }
}
