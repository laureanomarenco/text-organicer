import {Folder} from "./folder";

export class User {

  id?:number;
  username:string;
  imagen:string;
  token?: string;
  folders?: Folder[];
  constructor() {}
}
