export interface IGSAssessment {
    id?: number;
    code: string | null;
    name: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
    coeSubjectFormulaId?: number | null;
    content?: string | null;
    assessmentWhen?: string | null;
    assessmentDuration?: string | null;
    assessmentTool?: number | null;
    questionType?: number | null;
    coeGradeSubjectId?: number | null;
    coeSubjectMethods?: IGSMethod[];
    coeSubjectFormula?: IGSFormula | null;
}

export interface IGSMethod {
    id?: number;
    code: string | null;
    name: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
    coeSubjectAssessmentId?: number | null;
    coecloId?: number | null;
    questionQuantity?: number | null;
    maxPoint?: number | null;
}

export interface IGSFormula {
    id?: number;
    code: string | null;
    name: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
    coeGradeSubjectId?: number | null;
    formulaType?: number | null;
    rate?: number | null;
}

export interface IGSAssessmentCreateModel {
    id?: number;
    code: string | null;
    name: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
    coeSubjectFormulaId?: number | null;
    content?: string | null;
    assessmentWhen?: string | null;
    assessmentDuration?: string | null;
    assessmentTool?: number | null;
    questionType?: number | null;
    coeGradeSubjectId?: number | null;
    coeSubjectMethods?: {
        id?: number;
        code?: string | null;
        name?: string | null;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        coeSubjectAssessmentId?: number;
        coecloId?: number;
        questionQuantity?: number;
        maxPoint?: number;
    }[] | null;
}

export interface IGSCLO {
    id?: number;
    code: string | null;
    name: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
    order?: number;
    coeCGId?: number;
    description?: string;
    densityCLO?: number;
    coeCG?: any | null; // This should be properly typed
    coeCLOPI?: any[] | null; // This should be properly typed
}


export interface IGSAssessmentUpdateModel {
    id?: number;
    code: string | null;
    name: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
    coeSubjectFormulaId?: number | null;
    content?: string | null;
    assessmentWhen?: string | null;
    assessmentDuration?: string | null;
    assessmentTool?: number | null;
    questionType?: number | null;
    coeGradeSubjectId?: number | null;
    coeSubjectMethods?: {
        id?: number;
        code?: string | null;
        name?: string | null;
        concurrencyStamp?: string | null;
        isEnabled?: boolean;
        coeSubjectAssessmentId?: number | null;
        coecloId?: number | null;
        questionQuantity?: number | null;
        maxPoint?: number | null;
    }[] | null;
}


export interface ICOESubjectMethods {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
    coeSubjectAssessmentId?: number | null;
    coecloId?: number | null;
    questionQuantity?: number | null;
    maxPoint?: number | null;
}
