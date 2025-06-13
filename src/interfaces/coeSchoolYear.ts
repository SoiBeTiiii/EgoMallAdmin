interface ICoeSchoolYear extends IBaseEntity {
    startDate?: Date;
    endDate?: Date ;
    startDateHC?:Date;
    endDateHC?:Date;
    note?: string;
    isCurrent?: boolean;
  }
  