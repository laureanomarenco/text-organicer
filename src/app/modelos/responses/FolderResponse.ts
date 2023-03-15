import {Folder} from "../folder";

export interface FolderResponse {
  success: boolean;
  data: Folder | Folder[];
  status?: number;
  message?: string;
}
