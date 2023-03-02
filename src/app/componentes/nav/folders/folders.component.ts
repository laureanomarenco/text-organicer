import { Component } from '@angular/core';
import { faEllipsisVertical, faPlus, faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import {Folder} from "../../../modelos/folder";
import {DataFolderService} from "../../../servicios/data-folder.service";
import {Page} from "../../../modelos/page";
import {DataPageService} from "../../../servicios/data-page.service";

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent {
  faElilipsisVertical = faEllipsisVertical; faPlus = faPlus ;faTrash = faTrashCan; faEdit = faPenToSquare

  folders:Array<Folder>;
  pages:Array<Page>;

  constructor(private serviceFolder:DataFolderService, private servicePage:DataPageService) {}

  ngOnInit():void {
  this.serviceFolder
    .getAll()
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

}
