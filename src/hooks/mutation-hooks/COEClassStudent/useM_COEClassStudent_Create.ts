import baseAxios from '@/api/baseAxios'
import { useMutation } from '@tanstack/react-query'
export interface ICOECourseSectionStudent_Create extends IBaseEntity {
  order?: number,
  gender?: number,
  fullName?: string,
  dateOfBirth?: Date,
  coeclassId?: number
  passwordHash?: string,

}
export default function useM_COEClassStudent_Create() {
  const ENDPOINT = "/Account/Create"
  const mutation = useMutation({
    mutationFn: async (body: ICOECourseSectionStudent_Create) => {
      const res = await baseAxios.post(ENDPOINT, body)
      return res
    }
  })
  return mutation
}
` `