

export interface ISystemManagementRoleGroupMenuPermission {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  roleGroupId?: number;
  menuId?: number;
  isRead?: boolean | undefined;
  isAdd?: boolean | undefined;
  isUpdate?: boolean | undefined;
  isPrint?: boolean | undefined;
  isExport?: boolean | undefined;
  isDelete?: boolean | undefined;

}
