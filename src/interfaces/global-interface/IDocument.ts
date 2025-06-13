import { IFile } from "./IFile";

export interface IDocument {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  path?: string | undefined;
  orderBy?: number;
  documentType?: number;
  promulgateDate?: Date | undefined;
  decisionCode?: string | undefined;
  departmentName?: string | undefined;
  description?: string | undefined;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  conclusion?: string | undefined;
  note?: string | undefined;
  documentAttributeId?: number | undefined;
  documentAttributeName?: string | undefined;
  isCycleCheck?: boolean | undefined;
  meetingDate?: Date | undefined;
  fileDetail?: IFile;
}
