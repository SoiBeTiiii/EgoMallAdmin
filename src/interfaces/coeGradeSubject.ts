interface ICoeGradeSubject extends IBaseEntity {
    coeGradeId?: number
    coeSubjectId?: number
    coeSemesterId?: number
    coeSubjectGroupId?: number
    order?: number
    isCore?: boolean | null,
    courseSectionQuantity?: number
    courseSectionQuantityActual?: number
    coecGs?: ICoeCG[]
    coeSubjectFomulas?: ICoeSubjectFormula[]
    coeGrade?: ICoeGrade
    coeSubject?: ICoeSubject
    coeSemester?: ICoeSemester
    coeSubjectGroup?: ICoeSubjectGroup
    coeSubjectAssessments?: ICoeSubjectAssessment[]
}