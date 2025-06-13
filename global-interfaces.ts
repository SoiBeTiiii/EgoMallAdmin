interface AQSSOViewModel {
  studentCode?: string | undefined;
  falcutyName?: string | undefined;
  falcutyId?: string | undefined;
  majorsName?: string | undefined;
  majorsId?: string | undefined;
  fullname?: string | undefined;
  dateOfBirth?: string | undefined;
  email?: string | undefined;
  classId?: string | undefined;
  className?: string | undefined;
}

interface AQSyncDataViewModel {
  aqFacultyIds?: number[] | undefined;
  aqClassIds?: number[] | undefined;
  pageNumber?: number;
  pageSize?: number;
}

interface AcademicYearViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  numberOfSemester?: number;
  isCurrent?: boolean | undefined;
}

interface ChangePassWordViewModel {
  userId?: number;
  currentPassWord?: string | undefined;
  newPassWord?: string | undefined;
}

interface ComplaintProccessViewModel {
  id?: number;
  note?: string | undefined;
  status?: number;
  newPoint?: number | undefined;
}

interface CreateAccountViewModel {
  id?: number;
  isEnabled?: boolean;
  isBlocked?: boolean;
  roleId?: number | undefined;
  userName?: string | undefined;
  passwordHash?: string | undefined;
  passWord?: string | undefined;
  code?: string | undefined;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  address?: string | undefined;
  avatarPath?: string | undefined;
  fullName?: string | undefined;
  lockoutEnd?: Date | undefined;
  securityStamp?: string | undefined;
  expiresDate?: Date | undefined;
  facultyId?: number | undefined;
  majorsId?: number | undefined;
  classId?: number | undefined;
  workingUnitId?: number | undefined;
}

interface DocumentViewModel {
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
  fileDetail?: FileViewModel;
}

interface EventComplaintViewModel {
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
  fileDetail?: FileViewModel;
}

interface EventFillterViewModel {
  standardId?: number | undefined;
  host?: number | undefined;
  searchText?: string | undefined;
  facultyId?: number | undefined;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  isOrganization?: boolean | undefined;
  pageNumber?: number | undefined;
  pageSize?: number | undefined;
}

interface EventViewModel {
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

interface FileViewModel {
  fileName?: string | undefined;
  fileExtension?: string | undefined;
  fileBase64String?: string | undefined;
}

interface ImportStudentPaticipationViewModel {
  studentCode?: string | undefined;
  enrollName?: string | undefined;
  enrollPoint?: number;
}

interface PagePermissionViewModel {
  pageId?: number;
  isCreate?: boolean;
  isUpdate?: boolean;
  isDelete?: boolean;
  isRead?: boolean;
  isPrint?: boolean;
  isExport?: boolean;
}

interface RolePermissionViewModel {
  roleId?: number;
  pagePermissions?: PagePermissionViewModel[] | undefined;
}

interface SRMUserinfoViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  userId?: number;
  isEmailVerified?: boolean | undefined;
  isExternal?: boolean | undefined;
  isBlocked?: boolean | undefined;
  isLocked?: boolean | undefined;
  gender?: number | undefined;
  birthDate?: Date | undefined;
  birthPlace?: string | undefined;
  hometown?: string | undefined;
  ethnicity?: string | undefined;
  highestDegree?: string | undefined;
  degreeYear?: number | undefined;
  degreeCountry?: string | undefined;
  highestScientificTitle?: string | undefined;
  scientificTitleAppointmentYear?: number | undefined;
  workingTitle?: string | undefined;
  woringPlace?: string | undefined;
  officePhoneNumber?: string | undefined;
  personalPhoneNumber?: string | undefined;
  mobilePhoneNumber?: string | undefined;
  fax?: string | undefined;
  nationalId?: string | undefined;
  idIssueDate?: Date | undefined;
  idIssuePlace?: string | undefined;
  contactAddress?: string | undefined;
}

interface ScientificProfileProjectUserViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  projectId?: number | undefined;
  userId?: number | undefined;
  isLeader?: boolean | undefined;
  role?: string | undefined;
  linkFileId?: number | undefined;
}

interface ScientificProfileResearchGroupUserViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  userId?: number | undefined;
  isGroupLeader?: boolean | undefined;
  researchGroupId?: number | undefined;
  isCollaborator?: boolean | undefined;
}

interface ScientificProfileResearchGroupViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  nameEnglish?: string | undefined;
  abbreviation?: string | undefined;
  strategicObjective?: string | undefined;
  fieldOfExpertiseId?: number | undefined;
  researchGroupType?: string | undefined;
}

interface ScientificProfileResearchProjectViewModel {
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

interface SignInViewModel {
  userName?: string | undefined;
  passWord?: string | undefined;
}

interface SystemCatalogAcademicYearViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  administrativeYearStart?: Date | undefined;
  administrativeYearEnd?: Date | undefined;
  academicYearStart?: Date | undefined;
  academicYearEnd?: Date | undefined;
  isCurrentYear?: boolean;
}

interface SystemCatalogDomainCategoryViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  notes?: string | undefined;
}

interface SystemCatalogProjectLevelCategoryViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  notes?: string | undefined;
}

interface SystemCatalogProjectTypeCategoryViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  notes?: string | undefined;
}

interface Role {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  notes?: string | undefined;
}

interface SystemCatalogTaskCategoryViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  notes?: string | undefined;
}

interface SystemManagementAcademicHistoryViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  userId?: number;
  degreeEducationLevel?: string | undefined;
  degreeInstitution?: string | undefined;
  degreeFieldOfStudy?: string | undefined;
  degreeCountry?: string | undefined;
  degreeGraduationYear?: number | undefined;
  degreeSecondBachelor?: string | undefined;
  degreeSecondBachelorGraduationYear?: number | undefined;
  masterSpecializedThesis?: string | undefined;
  masterGraduationYear?: number | undefined;
  masterInstitution?: string | undefined;
  doctoralSpecializedThesis?: string | undefined;
  doctoralGraduationYear?: number | undefined;
  doctoralInstitution?: string | undefined;
  doctoralThesisTitle?: string | undefined;
  foreignLanguage1?: string | undefined;
  foreignLanguage1UsageLevel?: string | undefined;
  foreignLanguage2?: string | undefined;
  foreignLanguage2UsageLevel?: string | undefined;
  foreignLanguage3?: string | undefined;
  foreignLanguage3UsageLevel?: string | undefined;
}

interface SystemManagementProfessionalWorkHistoryViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  userId?: number | undefined;
  timePeriod?: string | undefined;
  workPlace?: string | undefined;
  responsibilities?: string | undefined;
}

interface SystemManagementPublishedScientificWorkViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  userId?: number;
  projectName?: string | undefined;
  publicationYear?: string | undefined;
  journalName?: string | undefined;
}

interface SystemManagementRoleGroupMenuPermissionViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  roleGroupId?: number;
  menuId?: number;
  isRead?: boolean | undefined;
  isAdd?: boolean | undefined;
  isUpdate?: boolean | undefined;
  isPrint?: boolean | undefined;
  isExport?: boolean | undefined;
  isDelete?: boolean | undefined;
}

interface SystemManagementRoleGroupViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  roleGroupName?: string | undefined;
  description?: string | undefined;
}

interface SystemManagementScientificResearchProjectViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  userId?: number;
  projectName?: string | undefined;
  startYear?: string | undefined;
  endYear?: string | undefined;
  projectLevel?: string | undefined;
  responsibilities?: string | undefined;
}

interface SystemManagementUserMenuPermissionViewModel {
  id?: number;
  code?: string | undefined;
  name?: string | undefined;
  concurrencyStamp?: string | undefined;
  isEnabled?: boolean;
  userId?: number;
  menuId?: number;
  isRead?: boolean | undefined;
  isAdd?: boolean | undefined;
  isUpdate?: boolean | undefined;
  isPrint?: boolean | undefined;
  isExport?: boolean | undefined;
  isDelete?: boolean | undefined;
}

interface UpdateAccountViewModel {
  isBlocked?: boolean;
  id?: number;
  isEnabled?: boolean;
  fullName?: string | undefined;
  code?: string | undefined;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  address?: string | undefined;
  concurrencyStamp?: string | undefined;
  workingUnitId?: number | undefined;
}

interface UserPermissionViewModel {
  userId?: number;
  pagePermissions?: PagePermissionViewModel[] | undefined;
}
