import baseAxios from '@/api/baseAxios'
import { MyButton } from '@/components/Buttons/Button/MyButton'
import { utils_notification_show } from '@/utils/notification'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import useS_core83092 from './useS_core83092'

interface IPagePermission {
    pageId?: number,
    isCreate?: boolean
    isRead?: boolean,
    isUpdate?: boolean
    isDelete?: boolean,
    isPrint?: boolean,
    isExport?: boolean
}
interface IBody {
    pagePermissions?: IPagePermission[]
    userId?: number
}
export default function F_core83092_Save() {
    const store = useS_core83092()
    const disable = useState<boolean>(false)
    const mutation = useMutation({
        mutationFn: async (body: IBody) => {
            const res = await baseAxios.put("/Role/UpdateUserPermission", body)
            return res
        }
    })
    function handleSave() {
        mutation.mutate({
            pagePermissions: store.state.rolePermissions!,
            userId: store.state.roleId
        }, {
            onSuccess: () => {
                utils_notification_show({
                    crudType: "update"
                })
            }
        })
    }
    useEffect(() => {
        if (!store.state.rolePermissions || store.state.rolePermissions.length == 0) {
            disable[1](true)
            return
        }
        disable[1](false)
    }, [store.state.rolePermissions])
    return (
        <MyButton disabled={disable[0]} crudType='save' onClick={handleSave} />
    )
}
