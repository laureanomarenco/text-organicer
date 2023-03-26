import {User} from "../user";

export interface UserResponse {
  success: boolean;
  data: User | User[];
  status?: number;
  mensaje?: string;
}
