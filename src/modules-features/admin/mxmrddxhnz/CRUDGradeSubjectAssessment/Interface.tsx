export interface IAssessment {
    // Assessment fields
    id?: number;
    code?: string;
    name?: string;
    content?: string;
    assessmentWhen?: string;
    assessmentDuration?: string;
    assessmentTool?: number;
    questionType?: number;
    totalQuestion?: number;
    coeGradeSubjectId?: number;
    coeSubjectFormulaId?: number;
    coeSubjectAssessmentCLOs?: {
        id?: number;
        coeSubjectAssessmentId?: number;
        coecloId?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    }[];
    coeSubjectMethods?: {
        id?: number;
        coeSubjectAssessmentId?: number;
        coecloId?: number;
        questionQuantity?: number;
        maxPoint?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    }[];
    coeSubjectFormula?: {
        coeGradeSubjectId?: number;
        formulaType?: number;
        rate?: number;
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    };
    concurrencyStamp?: string;
    isEnabled?: boolean;
}



//ICreateAssessmentViewModel
export interface ICreateAssessmentViewModel {
    id?: number | null;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean | null;
    coeSubjectFormulaId?: number | null;
    content?: string | null;
    assessmentWhen?: string | null;
    assessmentDuration?: string | null;
    assessmentTool?: number | null;
    questionType?: number | null;
    coeGradeSubjectId?: number | null;
    coeSubjectMethods?: {
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        coeSubjectAssessmentId?: number;
        coecloId?: number;
        questionQuantity?: number;
        maxPoint?: number;
    }[];
}
