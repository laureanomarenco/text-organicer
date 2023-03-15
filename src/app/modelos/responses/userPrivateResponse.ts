import {UserPrivate} from "../userPrivate";

export interface UserPrivateResponse {
  success: boolean;
  data: UserPrivate | UserPrivate[];
  status?: number;
  message?: string;
}
