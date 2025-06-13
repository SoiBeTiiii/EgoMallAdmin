export interface ICoreSubject {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    coeGradeId?: number;
    coeSubjectId?: number;
    coeSemesterId?: number;
    coeSubjectGroupId?: number | null;
    order?: number | null;
    isCore?: boolean;
    courseSectionQuantity?: number;
    courseSectionQuantityActual?: number;
    coecGs?: any[];
    coeSubjectFomulas?: any[];
    coeGrade?: {
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        coeSemesterStartId?: number;
        coeSemesterEndId?: number;
        coeTrainingLevelId?: number;
        coeProgramId?: number;
        note?: string;
        isActive?: boolean;
        totalSubject?: number;
        totalCredit?: number;
        coeSemesterStart?: {
            id?: number;
            code?: string;
            name?: string;
            concurrencyStamp?: string;
            isEnabled?: boolean;
            startDate?: string;
            endDate?: string;
            coeSchoolYearId?: number;
            numberWeek?: number;
            note?: string;
            isCurrent?: boolean;
            coeSchoolYear?: any | null; // Define more specific type if needed
        };
        coeSemesterEnd?: any | null; // Define more specific type if needed
        coeTrainingLevel?: any | null; // Define more specific type if needed
        coeProgram?: any | null; // Define more specific type if needed
    };
    coeSubject?: {
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        nameEg?: string;
        numberPeriod?: number;
        numberCredit?: number;
        note?: string;
        coeUnitId?: number;
        coeUnit?: any | null;
    };
    coeSemester?: {
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        startDate?: string;
        endDate?: string;
        coeSchoolYearId?: number;
        numberWeek?: number;
        note?: string;
        isCurrent?: boolean;
        coeSchoolYear?: any | null;
    };
    coeSubjectGroup?: {
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        note?: string;
        coeSubjectGroupMITScale?: any[];
    };
    coeSubjectAssessments?: any[];
}