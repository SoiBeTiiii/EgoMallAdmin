interface ICoeSubject extends IBaseEntity {
  order?: number;
  nameEg?: string;
  numberPeriod?: number;
  numberCredit?: number;
  note?: string;
  year?: Date;
  coeUnitId?: number;
  coeUnit?: ICoeUnit;
  coeCourseSection?: ICOECourseSection;

  content?: string;
  method?: string;
  quantity?: number;
  numberOfStudent?: number;
  quantityOfPoint?: number;
  pointsEntered?: number;
}
