

export interface IScientificProfileResearchProject {

  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  fileLinks?: string[] | undefined;
  isPublished?: boolean | undefined;
  projectLevel?: string | undefined;
  leadUnit?: string | undefined;
  managingUnit?: string | undefined;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  funding?: number | undefined;
  researchGroupId?: number | undefined;


}
