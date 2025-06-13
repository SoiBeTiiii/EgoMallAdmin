

export interface ISRMUserinfo {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  userId?: number;
  isEmailVerified?: boolean | undefined;
  isExternal?: boolean | undefined;
  isBlocked?: boolean | undefined;
  isLocked?: boolean | undefined;
  gender?: number | undefined;
  birthDate?: Date | undefined;
  birthPlace?: string | undefined;
  hometown?: string | undefined;
  ethnicity?: string | undefined;
  highestDegree?: string | undefined;
  degreeYear?: number | undefined;
  degreeCountry?: string | undefined;
  highestScientificTitle?: string | undefined;
  scientificTitleAppointmentYear?: number | undefined;
  workingTitle?: string | undefined;
  woringPlace?: string | undefined;
  officePhoneNumber?: string | undefined;
  personalPhoneNumber?: string | undefined;
  mobilePhoneNumber?: string | undefined;
  fax?: string | undefined;
  nationalId?: string | undefined;
  idIssueDate?: Date | undefined;
  idIssuePlace?: string | undefined;
  contactAddress?: string | undefined;

}
