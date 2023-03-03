import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../validaciones/equalPass.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formRegister:FormGroup;

  constructor(private formBuilder:FormBuilder) {
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
    console.log(this.formRegister)
  }
}
