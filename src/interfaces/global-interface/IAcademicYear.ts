

export interface IAcademicYear {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  numberOfSemester?: number;
  isCurrent?: boolean | undefined;

}
