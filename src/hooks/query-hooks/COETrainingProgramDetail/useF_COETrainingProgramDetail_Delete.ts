import baseAxios from '@/api/baseAxios';

export default async function useF_COETrainingProgramDetail_Delete(chosenOne: ICoeSubjectByTrainingProgram) {
  const deletedSubject: ICoeSubjectByTrainingProgram = {
    "id": chosenOne.id,
    "code": chosenOne.code,
    "name": chosenOne.name,
    "concurrencyStamp": chosenOne.concurrencyStamp,
    "isEnabled": chosenOne.isEnabled,
    "coeGradeId": chosenOne.coeGradeId,
    "coeSubjectId": chosenOne.coeSubjectId,
    "coeSemesterId": chosenOne.coeSemesterId,
    "coeSubjectGroupId": chosenOne.coeSubjectGroupId,
    "order": chosenOne.order,
  };
  const handleDelete = await baseAxios.post(`/COEGradeSubject/Delete`, deletedSubject)
  return handleDelete;
}
