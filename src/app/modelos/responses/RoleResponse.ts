import {Role} from "../role";

export interface RoleResponse {
  success: boolean;
  data: Role | Role[];
  status?: number;
  message?: string;
}
