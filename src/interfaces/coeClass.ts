interface ICOEClass extends IBaseEntity {
  order?: number,
  coeGradeId?: number,
  totalStudent?: number,
  coeGrade?: ICoeGrade
  note?: string
  users?: ICOEClassStudent[]
}