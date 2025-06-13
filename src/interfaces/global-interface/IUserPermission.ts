import { IPagePermission } from "./IPagePermission";

export interface IUserPermission {
  userId?: number;
  pagePermissions?: IPagePermission[] | undefined;

}
