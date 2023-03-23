import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../validaciones/equalPass.validator";
import {DataUserService} from "../../../servicios/data/data-user.service";
import {DataUserPrivateService} from "../../../servicios/data/data-user-private.service";
import {User} from "../../../modelos/user";
import {UserPrivate} from "../../../modelos/userPrivate";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import * as CryptoJS from 'crypto-js';
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formRegister:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private userService:DataUserService,
    private userPrivateService: DataUserPrivateService,

    private router: Router,
  ) {
    this.formRegister = formBuilder.group({

      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])([A-Za-z\\d$@$!%*?&]|[^ ]){8,15}$/)
      ])],
      passwordAgain: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])([A-Za-z\\d$@$!%*?&]|[^ ]){8,15}$/)
      ])]

    })
    this.formRegister.get('passwordAgain').setValidators(
      CustomValidators.equals(this.formRegister.get('password'))
    );
      console.log()

  }

  register():void{

    let user: User = {
      username: this.formRegister.value.username,
      imagen: null,
    }

    let userPrivate: UserPrivate = {
      mail: this.formRegister.value.email,
      password: this.formRegister.value.password
    }

    let id: number;
    this.userService.addUser(user).subscribe({
      next: res => {
        if(res.success) {
          localStorage.setItem("token", (res.data as User).token)
          id = (res.data as User).id
        }

        this.userPrivateService.addUserPrivate(userPrivate, id).subscribe({
          next: res => {
          if(res.success) {
            Swal.fire("Usuario creado correctamente")
            this.router.navigate(['/home'])
          } else Swal.fire("Lo siento, algo falló, intentá nuevamente.")
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
