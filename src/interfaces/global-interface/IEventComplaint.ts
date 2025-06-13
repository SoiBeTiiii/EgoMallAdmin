import { IFile } from "./IFile";

export interface IEventComplaint {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  eventCode?: string | undefined;
  description?: string | undefined;
  status?: number;
  path?: string | undefined;
  studentId?: number;
  point?: number;
  complaintPoint?: number;
  newPoint?: number | undefined;
  note?: string | undefined;
  fileDetail?: IFile;

}
