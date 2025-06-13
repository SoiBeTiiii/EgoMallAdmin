

export interface IUpdateAccount {
  isBlocked?: boolean;
  id?: number;
  isEnabled?: boolean;
  fullName?: string | undefined;
  code?: string | undefined;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  address?: string | undefined;
  concurrencyStamp?: string | undefined;
  workingUnitId?: number | undefined;

}
