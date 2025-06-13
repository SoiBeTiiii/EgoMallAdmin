'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

const ENDPOINT = "/Account/delete"
export default function F_core71678_Delete({ id }: { id: number }) {
    return (
        <MyActionIconDelete
            onSubmit={async () =>
                await baseAxios.post(ENDPOINT, { id: id })
            }
        />
    )
}

