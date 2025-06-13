import baseAxios from '@/api/baseAxios'
import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete'

const ENDPOINT = "/Role/Delete"
export default function F_core47643_Delete({ values }: { values: IBaseEntity }) {
    return (
        <MyActionIconDelete
            contextData={values.code}
            onSubmit={() => baseAxios.post(ENDPOINT, { id: values.id })}
        />
    )
}
