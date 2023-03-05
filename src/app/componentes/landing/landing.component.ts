import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  login:boolean = true;

  description:boolean = true;
  ngOnInit():void {
    if(window.innerWidth < 600){
      this.description = false
    }
  }
}
