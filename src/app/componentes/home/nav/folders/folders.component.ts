import { Component } from '@angular/core';
import { faEllipsisVertical, faPlus, faTrashCan, faPenToSquare, faShare, faClose } from "@fortawesome/free-solid-svg-icons";
import {Folder} from "../../../../modelos/folder";
import {DataFolderService} from "../../../../servicios/data-folder.service";
import {Page} from "../../../../modelos/page";
import {DataPageService} from "../../../../servicios/data-page.service";
import {DataUserService} from "../../../../servicios/data-user.service";

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent {
  faElilipsisVertical = faEllipsisVertical; faPlus = faPlus; faTrash = faTrashCan; faEdit = faPenToSquare; faShare = faShare; faClose = faClose

  //#TODO Manejo de sesión user
  // Tal vez compruebo con token, se verá en back
  userID:number = 1;
  folders:Array<Folder>;
  pages:Array<Page>;

  constructor(private serviceFolder:DataFolderService, private servicePage:DataPageService, private serviceUser:DataUserService) {}

  ngOnInit():void {

    // this.serviceUser
    //   .getById(this.userID)
    //   .subscribe(res => {
    //
    //   })
    this.serviceFolder
      .getAllFoldersOfUser(this.userID)
        .subscribe(res => {
          this.folders = res
          console.log(this.folders)
        })
  }


  open:number;
  openFolder(id: number) {
    if(this.open === id) this.open = null
    else {
      this.servicePage
        .getByFolderId(id)
        .subscribe(res => {
          this.pages = res
          this.open = id
        })
    }
  }



  modalFolder:number;
  toggleModalFolder(id: number) {
    if(this.modalFolder === id) this.modalFolder = null;
    else this.modalFolder = id;
  }

  modalPage:number;
  toggleModalPage(id: number) {
    if(this.modalPage === id) this.modalPage = null;
    else this.modalPage = id;
  }

  deleteFolder(id:number) {
    this.serviceFolder.deleteFolder(id).subscribe( res => {
      this.folders = this.folders.filter(f => f.id !== id)
    })
  }


  folder= {
    id: 5,
    idUser: this.userID,
    nombre: "Nueva carpeta",
    public: false,
  }
  newFolder() {

    this.serviceFolder.addFolder(this.folder).subscribe(res => {
      this.folders.push(res)
    })
  }
}
