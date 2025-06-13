interface ICOEClassStudent extends IBaseEntity {
  order?: number,
  gender?: number,
  fullName?: string,
  dateOfBirth?: Date,
  coeCourseSectionId?: number,
  coeCourseSection?: ICOEClass
  email?: string,
  phoneNumber?: string,
  address?: string,
  avatarPath?: string,


}