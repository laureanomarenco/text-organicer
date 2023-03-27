import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private route: Router,
  ) {
  }
  canActivate(): boolean {
    const token : string | null = localStorage.getItem("token")
    if(token) return true
    else {
      this.route.navigate(['/landing']);
      return false;
    }
  }

}
