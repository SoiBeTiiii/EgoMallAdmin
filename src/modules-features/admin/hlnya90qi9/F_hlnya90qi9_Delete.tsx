'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import useQ_COEGradeSubject_GetSubjectByGrade from "@/hooks/query-hooks/COEGradeSubject/useQ_COEGradeSubject_GetSubjectByGrade";
import { notifications } from "@mantine/notifications";
import { useState } from "react";




export default function F_hlnya90qi9_Delete({ chosenOne }: { chosenOne: ICoeGrade }) {
    const [subjects, setSubjects] = useState<ICoeGradeSubject[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const params = `?COEGradeId=${chosenOne.id}&cols=COESemester,COESubjectGroup,COESubject`
    const subjectByGradeQuery = useQ_COEGradeSubject_GetSubjectByGrade({
        params: params
    })
    try {



        // console.log('subjectByGradeQuery', subjectByGradeQuery.data)
        if (!subjectByGradeQuery) {
            throw new Error("Không lấy data trong subject grade query được")
        }
        // setSubjects(subjectByGradeQuery.data || [])
    } catch (error) {
        notifications.show({
            message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách môn trong chương trình đào tạo',
            color: 'red'
        })
    }

    const handleDelete = async () => {
        if (isLoading) return
        setIsLoading(true)
        const deletedTrainingProgram: ICoeGrade = {
            "id": chosenOne.id,
            "code": chosenOne.code,
            "name": chosenOne.name,
            "concurrencyStamp": chosenOne.concurrencyStamp,
            "isEnabled": chosenOne.isEnabled,
            "coeSemesterStartId": chosenOne.coeSemesterStartId,
            "coeSemesterEndId": chosenOne.coeSemesterEndId,
            "coeTrainingLevelId": chosenOne.coeTrainingLevelId,
            "coeProgramId": 0,
            "note": chosenOne.note,
            "isActive": false,
            "totalSubject": 0,
            "totalCredit": 0,
            "coeSemesterStart": chosenOne.coeSemesterStart,
            "coeSemesterEnd": chosenOne.coeSemesterEnd,
            "coeTrainingLevel": chosenOne.coeTrainingLevel,
            "coeProgram": chosenOne.coeProgram
        };
        console.log('chosenOne', chosenOne)
        try {
            if (!subjectByGradeQuery.data) { throw new Error('Không có dữ liệu môn học để xóa!') }
            await Promise.all(subjectByGradeQuery.data.map(async (item) => {
                await baseAxios.post('/COEGradeSubject/delete', item)
            }))
            await baseAxios.post(`/COEGrade/update`, deletedTrainingProgram)
            setIsLoading(false)
        } catch (error) {
            notifications.show({
                message: error instanceof Error ? error.message : 'Lỗi khi delete trong handle delete',
                color: 'red'
            })
        }
    }

    return <MyActionIconDelete
        contextData={chosenOne.name || ""}
        onSubmit={handleDelete}
    ></MyActionIconDelete>
}
