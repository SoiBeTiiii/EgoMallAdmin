

export interface IEvent {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  host?: number | undefined;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  maxPoint?: number | undefined;
  minPoint?: number | undefined;
  standardId?: number | undefined;
  note?: string | undefined;
  isNoted?: boolean | undefined;
  address?: number | undefined;
  quantity?: number;
  facultyId?: number | undefined;
  isRequired?: boolean;
  isCompleted?: boolean;
  completedBy?: number | undefined;
  reviewdBy?: number | undefined;
  session?: number | undefined;
  isTemplate?: boolean | undefined;
  parentEventId?: number | undefined;
  futurePlanId?: number | undefined;
  eventGroupId?: number | undefined;

}
