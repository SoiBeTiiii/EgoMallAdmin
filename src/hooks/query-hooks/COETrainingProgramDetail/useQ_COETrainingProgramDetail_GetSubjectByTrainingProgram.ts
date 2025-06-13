import baseAxios from '@/api/baseAxios'
import { useQuery } from '@tanstack/react-query'

export default function useQ_COETrainingProgramDetail_GetSubjectByTrainingProgram({ trainingProgramId, cols = "COESubject,COESemester,COESubjectGroup", enabled }: { trainingProgramId: number, cols?: string, enabled: boolean }) {
    const query = useQuery<ICoeSubjectByTrainingProgram[]>({
        queryKey: [`useQ_COETrainingProgramDetail_GetSubjectByTrainingProgram_${trainingProgramId}`],
        queryFn: async () => {
            const res = await baseAxios.get(`/COEGradeSubject/GetSubjectByGrade?COEGradeId=${trainingProgramId}&cols=${cols}`)
            return res.data.data
        },
        enabled: enabled
    })
    return query
}
