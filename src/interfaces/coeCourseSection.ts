interface ICOECourseSection extends IBaseEntity {
  coeGradeSubjectId?: number;
  teachingUnitId?: number;
  measureUnitId?: number;
  collectUnitId?: number;
  coeGradeSubject?: ICoeGradeSubject;

  semesterName?: string;
  semesterCode?: string;
  subjectName?: string;
  subjectCode?: string;
  courseSectionId?: number;
  courseSectionName?: number;
  courseSectionCode?: string;
  numberPeriod?: number;
  numberCredit?: number;
  subjectAssessmentName?: string;
  subjectAssessmentQuestiontype?: number;
  totalStudent?: number;
  pointQuantity?: number;
  pointQuantityActual?: number;
  // coeGradeSubject: null,
  // unitTeaching: null,
  // unitMeasurement: null,
  // unitAggregate: null,
}
