import {EventEmitter, Injectable} from '@angular/core';
import {Page} from "../modelos/page";
import {HttpClient} from "@angular/common/http";
import {DataPageService} from "./fetchs/data-page.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class EditService {
  pageSelected: EventEmitter<Page> = new EventEmitter<Page>()


  constructor(
    private http: HttpClient,
    private dataPageService: DataPageService,
  ) {
  }

  setSelectedPage(id: number) {
    this.dataPageService.getById(id).subscribe(res => {
      this.pageSelected.emit(res.data as Page)
    })
  }

}

