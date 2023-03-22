import {Injectable} from "@angular/core";
import {User} from "../modelos/user";
import {Router} from "@angular/router";
import {DataUserService} from "./fetchs/data-user.service";
import {DataUserPrivateService} from "./fetchs/data-user-private.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: User;
  session: boolean = false;

  constructor(
    private router: Router,
    private service:DataUserService
  ) {}

  checkSession(token: string) {
    this.service.getByToken(token)
      .subscribe({
        next: res => {
          this.user = res.data as User
          this.session = true;
        },
        error: (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Error de cliente o red', err.error.message);
            Swal.fire('Error de cliente o red', '', 'error');

          } else {
            console.log('Error en el servidor remoto', err.error.message);
            Swal.fire('Error en el servidor', '', 'error');
            this.router.navigate(['/landing'])

          }
        }
      })
  }

}
