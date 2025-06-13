import baseAxios from '@/api/baseAxios'
import { useMutation } from '@tanstack/react-query'
export interface ICOEClass_Update extends IBaseEntity {
  order?: number,
  gender?: number,
  fullName?: string,
  dateOfBirth?: Date,
  coeCourseSectionId?: number
  note?: string
}
export default function useM_COEClass_Update() {
  const ENDPOINT = "/COEClass/Update"
  const mutation = useMutation({
    mutationFn: async (body: ICOEClass_Update) => {
      const res = await baseAxios.post(ENDPOINT, body)
      return res
    }
  })
  return mutation
}
