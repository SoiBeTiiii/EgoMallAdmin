import baseAxios from '@/api/baseAxios'
import { useMutation } from '@tanstack/react-query'
export interface ICOECourseSectionStudent_Update extends IBaseEntity {
  order?: number,
  gender?: number,
  fullName?: string,
  dateOfBirth?: Date,
  coeCourseSectionId?: number
  note?: string
  coeCourseSection?: ICOEClass

}
export default function useM_COEClassStudent_Update() {
  const ENDPOINT = "/Account/Update"
  const mutation = useMutation({
    mutationFn: async (body: ICOECourseSectionStudent_Update) => {
      const res = await baseAxios.post(ENDPOINT, body)
      return res
    }
  })
  return mutation
}
