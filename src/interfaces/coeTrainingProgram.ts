interface ICoeTrainingProgram extends IBaseEntity{
    coeGradeId?:number
    totalPeriods?:number
    totalCredit?:number
    coeGrade?: ICoeGrade
}