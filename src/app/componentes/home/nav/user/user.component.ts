import { Component } from '@angular/core';
import {DataUserService} from "../../../../servicios/fetchs/data-user.service";
import {User} from "../../../../modelos/user";
import {HttpErrorResponse} from "@angular/common/http";
import {faBars, faClose} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {DataUserPrivateService} from "../../../../servicios/fetchs/data-user-private.service";
import {UserPrivate} from "../../../../modelos/userPrivate";
import {Router} from "@angular/router";
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  faBars = faBars; faClose = faClose;

  userID: number = parseInt(localStorage.getItem('id'));
  user: User;
  userPrivate: UserPrivate;

  constructor(
    private router: Router,
    private service:DataUserService,
    private serviceUserPrivate:DataUserPrivateService

  ) {}

  ngOnInit():void {
    this.service
      .getById(this.userID)
      .subscribe({
          next: res => {
            this.user = res.data as User
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

  modal:boolean = false;
  userModal() {
    if(this.modal) this.modal = false
    else {
      this.serviceUserPrivate.getById(this.userID)
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
              console.log('Error en el servidor remoto', err.error.message);
              Swal.fire('Error en el servidor', '', 'error');
            }
          }
        })


    }
  };

  modalEdit: boolean = true;
  modalPass: boolean = false;
  modalData: boolean = false;

  logOut() {
    localStorage.removeItem('id')
    this.router.navigate(['/landing'])
  }

  updateUser(formularioUpdateUser) {
    let usUp: User = {
      id: this.user.id,
      username: formularioUpdateUser.value.username,
      imagen: "http://"
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
            console.log('Error en el servidor remoto', err.error.message);
            Swal.fire('Error en el servidor', '', 'error');
          }
        }
      })

    let upUp: UserPrivate = {
      id: this.userPrivate.id,
      mail: formularioUpdateUser.value.mail,
      password: this.userPrivate.password,
      user_id: this.userID
    }
    this.serviceUserPrivate.updateUserPrivate(this.userPrivate.id, this.userPrivate)
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
            console.log('Error en el servidor remoto', err.error.message);
            Swal.fire('Error en el servidor', '', 'error');
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
        password: CryptoJS.SHA256(formulacioChangePass.value.password).toString(),
        user_id: this.userID
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
              console.log('Error en el servidor remoto', err.error.message);
              Swal.fire('Error en el servidor', '', 'error');
            }
          }
        })

    } else Swal.fire("Las contraseñas no coinciden", "", "error")
  }
}
