import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {UserPrivate} from "../../../modelos/userPrivate";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin:FormGroup;


  constructor(private formBuilder:FormBuilder) {
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

  login():void{
    let email = this.formLogin.value.email
    let password = this.formLogin.value.password

    console.log(email, password)
  }
}
