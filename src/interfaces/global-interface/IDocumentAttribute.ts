export interface IDocumentAttribute {
    id?: number;
    isEnabled?: boolean;
    name?: string | undefined;
    code?: string | undefined;
    createdWhen?: Date | undefined;
    createdBy?: number | undefined;
    modifiedWhen?: Date | undefined;
    modifiedBy?: number | undefined;
    concurrencyStamp?: string | undefined;
    documentType?: number | undefined;
}
