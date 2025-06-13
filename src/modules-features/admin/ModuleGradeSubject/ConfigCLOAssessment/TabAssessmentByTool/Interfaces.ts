export interface IGSMethodWithRubrics {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    coeSubjectAssessmentId?: number;
    coecloId?: number;
    questionQuantity?: number;
    maxPoint?: number;
    coeSubjectAssessment?: {
        coeSubjectFormulaId?: number;
        content?: string;
        assessmentWhen?: string;
        assessmentDuration?: string;
        assessmentTool?: number;
        questionType?: number;
        totalQuestion?: number;
        coeGradeSubjectId?: number;
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
        coeSubjectFormula?: any; //todo
        id?: number;
        code?: string | null;
        name?: string | null;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    };
    coeclo?: {
        order?: number;
        coecgId?: number;
        description?: string;
        densityCLO?: number;
        coecg?: any | null;
        coeclopi?: any[] | null;
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    };
    coeSubjectMethodRubrics?: {
        coeSubjectMethodId?: number | null;
        coeRubricsMethodId?: number | null;
        content?: string | null;
        id?: number;
        code?: string | null;
        name?: string | null;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    }[] | null;
}


export interface ICOERubric {
    nameEg?: string | null;
    point?: number | null;
    isStorage?: boolean;
    order?: number | null;
    note?: string | null;
    isFailed?: boolean;
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}


export interface ICOESubjectMethodRubricModel {
    coeSubjectMethodId?: number | null;
    coeRubricsMethodId?: number | null;
    content?: string | null;
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}