import baseAxios from "@/api/baseAxios";

export default function useF_COETrainingProgramDetail_CreateSubjectByTrainingProgram({
  trainingProgramId,
  subjectId,
  semesterId,
  subjectGroupId,
  orderNumber
}: {
  trainingProgramId: number;
  subjectId: number;
  semesterId: number;
  subjectGroupId: number;
  orderNumber: number
}) {
  const createdSubject: ICoeSubjectByTrainingProgram = {
    "id": 0,
    "code": "string",
    "name": "string",
    "concurrencyStamp": "string",
    "isEnabled": true,
    "coeGradeId": trainingProgramId,
    "coeSubjectId": subjectId,
    "coeSemesterId": semesterId,
    "coeSubjectGroupId": subjectGroupId,
    "order": orderNumber,
  };
  const handleCreate = async () => {
    const res = await baseAxios.post(`/COEGradeSubject/Create`, createdSubject);
    return res;
  };
  return handleCreate;
}
