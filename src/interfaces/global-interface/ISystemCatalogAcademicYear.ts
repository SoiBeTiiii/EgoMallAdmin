

export interface ISystemCatalogAcademicYear {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  administrativeYearStart?: Date | undefined;
  administrativeYearEnd?: Date | undefined;
  academicYearStart?: Date | undefined;
  academicYearEnd?: Date | undefined;
  isCurrent?: boolean;

}
