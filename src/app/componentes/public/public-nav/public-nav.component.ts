import { Component } from '@angular/core';
import {Folder} from "../../../modelos/folder";
import {Page} from "../../../modelos/page";
import {ActivatedRoute, Router} from "@angular/router";
import {DataFolderService} from "../../../servicios/fetchs/data-folder.service";
import {DataPageService} from "../../../servicios/fetchs/data-page.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {FoldersService} from "../../../servicios/folders.service";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";

@Component({
  selector: 'app-public-nav',
  templateUrl: './public-nav.component.html',
  styleUrls: ['./public-nav.component.css']
})
export class PublicNavComponent {
  faBars = faBars
  folder: Folder;
  pages: Array<Page>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataFolderService: DataFolderService,
    private dataPageService: DataPageService,
    public foldersService: FoldersService

  ) {
  }

  ngOnInit():void {
    if(window.innerWidth > 600){
      const bars = document.querySelector('#bars')
      bars.classList.add('hidden')
    }

    const id = +this.route.snapshot.paramMap.get('id');

    this.dataFolderService.getById(id)
      .subscribe({
        next: res => {
          this.folder = res
          if(this.folder.public){
            this.dataPageService.getByFolderId(id)
              .subscribe({
                next: res => {
                  this.pages = res;
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
          } else {
            this.router.navigate(['/landing']);
          }
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

  toggleNav() {
    const nav = document.querySelector('#aside')
    console.log(nav)
    if(nav.classList.contains('open')){
      nav.classList.remove('open')
    } else nav.classList.add('open')
  }
}
