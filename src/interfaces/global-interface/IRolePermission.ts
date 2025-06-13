import { IPagePermission } from "./IPagePermission";

export interface IRolePermission {
  roleId?: number;
  pagePermissions?: IPagePermission[] | undefined;

}
