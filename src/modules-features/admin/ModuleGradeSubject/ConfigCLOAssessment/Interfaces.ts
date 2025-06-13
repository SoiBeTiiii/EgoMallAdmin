export interface IGradeSubject {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    coeGradeId?: number;
    coeSubjectId?: number;
    coeSemesterId?: number;
    coeSubjectGroupId?: number;
    order?: number;
    isCore?: boolean;
    courseSectionQuantity?: number | null;
    courseSectionQuantityActual?: number;
    coecGs?: any[];
    coeSubjectFomulas?: any[];
    coeGrade?: any | null;
    coeSubject?: {
        id?: number;
        code?: string;
        name?: string;
        nameEg?: string;
        numberPeriod?: number;
        numberCredit?: number;
        note?: string;
        coeUnitId?: number;
        coeUnit?: any | null;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    };
    coeSemester?: any | null;
    coeSubjectGroup?: any | null;
    coeSubjectAssessments?: any[];
}
