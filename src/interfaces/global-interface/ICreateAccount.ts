

export interface ICreateAccount {
  id?: number;
  isEnabled?: boolean;
  isBlocked?: boolean;
  roleId?: number | undefined;
  userName?: string | undefined;
  passwordHash?: string | undefined;
  passWord?: string | undefined;
  code?: string | undefined;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  address?: string | undefined;
  avatarPath?: string | undefined;
  fullName?: string | undefined;
  lockoutEnd?: Date | undefined;
  securityStamp?: string | undefined;
  expiresDate?: Date | undefined;
  facultyId?: number | undefined;
  majorsId?: number | undefined;
  classId?: number | undefined;
  workingUnitId?: number | undefined;
}
