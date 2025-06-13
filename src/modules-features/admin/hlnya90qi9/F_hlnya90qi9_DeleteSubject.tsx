'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F_hlnya90qi9_DeleteSubject({ chosenOne }: { chosenOne: ICoeGradeSubject }) {
  const deletedSubject: ICoeGradeSubject = {
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
    "isCore": chosenOne.isCore,
    "courseSectionQuantity": chosenOne.courseSectionQuantity
  };
  return <MyActionIconDelete
    contextData={chosenOne.coeSubject?.name || ""}
    onSubmit={async () => await baseAxios.post(`/COEGradeSubject/Delete`, deletedSubject)}
  ></MyActionIconDelete>
}

