
interface ICoeSubjectByTrainingProgram extends IBaseEntity {
    coeGradeId?: number,
    coeSubjectId: number | 0,
    coeSemesterId?: number,
    coeSubjectGroupId?: number,
    // ordinal?: number,
    coeTrainingProgram?: ICoeTrainingProgram,
    coeSubject?: ICoeSubject,
    coeSemester?: ICoeSemester,
    coeSubjectGroup?: ICoeSubjectGroup,
    order: number | 0
}