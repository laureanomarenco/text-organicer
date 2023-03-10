import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute, Router} from "@angular/router";
import {DataUserPrivateService} from "../../../servicios/fetchs/data-user-private.service";
import {UserPrivate} from "../../../modelos/userPrivate";

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
    // this.dataUserPrivateService.validateUser(userToValidate)
    //   .subscribe({
    //     next: res => {
    //       if(res === null){
    //         console.log("Datos incorrectos")
    //       } else {
    //         localStorage.setItem('user', res.username)
    //       }
    //     }
    //   })



    // #TODO enviar al back a validar
    this.router.navigate(['/home'])

  }
}
