import {Page} from "../page";

export interface PageResponse {
  success: boolean;
  data: Page | Page[];
  status?: number;
  message?: string;
}
