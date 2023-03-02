import { Component } from '@angular/core';
import {DataUserService} from "../../../servicios/data-user.service";
import {User} from "../../../modelos/user";

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
      .subscribe(res => {
        this.users = res
        console.log(this.users)
      })

  }
}
