import baseAxios from '@/api/baseAxios';

export default async function F_COETrainingProgramDetail_Copy({ goalTrainingProgramId, sourceTrainingProgram }: { goalTrainingProgramId: number, sourceTrainingProgram: ICoeSubjectByTrainingProgram, }) {
  const copiedSubject: ICoeSubjectByTrainingProgram = {
    "id": goalTrainingProgramId,
    "code": sourceTrainingProgram.code,
    "name": sourceTrainingProgram.name,
    "concurrencyStamp": sourceTrainingProgram.concurrencyStamp,
    "isEnabled": sourceTrainingProgram.isEnabled,
    "coeGradeId": sourceTrainingProgram.coeGradeId,
    "coeSubjectId": sourceTrainingProgram.coeSubjectId,
    "coeSemesterId": sourceTrainingProgram.coeSemesterId,
    "coeSubjectGroupId": sourceTrainingProgram.coeSubjectGroupId,
    "order": sourceTrainingProgram.order,
  };
  const res = await baseAxios.post(`/COEGradeSubject/create`, copiedSubject)
  return res;
}
