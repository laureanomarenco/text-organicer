import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute, Router} from "@angular/router";
import {DataUserPrivateService} from "../../../servicios/fetchs/data-user-private.service";
import {UserPrivate} from "../../../modelos/userPrivate";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import * as CryptoJS from 'crypto-js';
import {User} from "../../../modelos/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin:FormGroup;


  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private dataUserPrivateService: DataUserPrivateService

  ) {
    this.formLogin = formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
        // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])([A-Za-z\\d$@$!%*?&]|[^ ]){8,15}$/)
      ])]
    })
  }

  invalid:boolean=false;

  login(){
    let email = this.formLogin.value.email
    let password = this.formLogin.value.password

    let userToValidate:UserPrivate = {
      mail: email,
      password: password
    }

    this.dataUserPrivateService.validateUser(userToValidate)
      .subscribe({
        next: res => {
          console.log(res)
          if(res.success) {
            localStorage.setItem('token', (res.data as User).token)
            this.router.navigate(['/home'])
          } else Swal.fire("Credenciales incorrectas", "", "error")
        },
        error: (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Error de cliente o red', );
            Swal.fire('Error de cliente o red', '', 'error');
          } else {
            Swal.fire(err.error.message, '', 'error');
          }
        }
      })
  }
}
