interface ICoeSemester extends IBaseEntity {
  startDate?: Date;
  endDate?: Date ;
  coeSchoolYearId?: number ;
  numberWeek?: number;
  isCurrent?: boolean;
  note?: string;
  coeSchoolYear?: ICoeSchoolYear;
}
