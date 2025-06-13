export interface ICoreSubject {
    coeGradeId?: number;
    coeSubjectId?: number;
    coeSemesterId?: number;
    coeSubjectGroupId?: number | null;
    order?: number | null;
    isCore?: boolean;
    totalSubjectGroup?: number;
    coecGs?: any[];
    coeSubjectFomulas?: any[];
    coeGrade?: any | null;
    coeSubject?: {
        nameEg?: string;
        numberPeriod?: number;
        numberCredit?: number;
        note?: string;
        coeUnitId?: number;
        coeUnit?: any | null;
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    };
    coeSemester?: {
        startDate?: string;
        endDate?: string;
        coeSchoolYearId?: number;
        numberWeek?: number;
        note?: string;
        isCurrent?: boolean;
        coeSchoolYear?: any | null;
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    };
    coeSubjectGroup?: any | null;
    coeSubjectAssessments?: any[];
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}