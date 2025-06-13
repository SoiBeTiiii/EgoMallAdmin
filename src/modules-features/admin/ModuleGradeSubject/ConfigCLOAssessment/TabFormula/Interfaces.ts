export interface IGSFormula {
    id?: number;
    code: string | null;
    name: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
    coeGradeSubjectId?: number | null;
    formulaType?: number | null;
    rate: number | null;
}

