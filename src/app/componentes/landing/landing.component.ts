import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  login:boolean = true;
  image = [{
    image: '../../../assets/escriir.jpg',
    thumbImage: '../../../assets/escriir.jpg'

  },{
    image: '../../../assets/libros.jpg',
    thumbImage: '../../../assets/libros.jpg'
  },{
    image: '../../../assets/guitarrista.jpg',
    thumbImage: '../../../assets/guitarrista.jpg'
  }]

  description:boolean = true;
  ngOnInit():void {
    if(window.innerWidth < 600){
      this.description = false
    }
  }
}
