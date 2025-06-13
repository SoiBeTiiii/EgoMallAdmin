
export interface IUser {
    isBlocked: boolean;
    roleId?: number | undefined;
    userName: string;
    passwordHash: string;
    email?: string | undefined;
    phoneNumber?: string | undefined;
    address?: string | undefined;
    avatarPath?: string | undefined;
    fullName?: string | undefined;
    lockoutEnd?: Date | undefined;
    securityStamp: string;
    expiresDate?: Date | undefined;
    facultyId?: number | undefined;
    majorsId?: number | undefined;
    classId?: number | undefined;
    signInWrongCount?: number | undefined;
    isLocked?: boolean | undefined;
    workingUnitId?: number | undefined;
}