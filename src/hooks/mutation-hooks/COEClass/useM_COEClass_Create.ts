import baseAxios from '@/api/baseAxios'
import { useMutation } from '@tanstack/react-query'
export interface ICOEClass_Create extends IBaseEntity {
  order?: number,
  gender?: number,
  fullName?: string,
  dateOfBirth?: Date,
  coeCourseSectionId?: number
  note?: string
}
export default function useM_COEClass_Create() {
  const ENDPOINT = "/COEClass/Create"
  const mutation = useMutation({
    mutationFn: async (body: ICOEClass_Create) => {
      const res = await baseAxios.post(ENDPOINT, body)
      return res
    }
  })
  return mutation
}
` `