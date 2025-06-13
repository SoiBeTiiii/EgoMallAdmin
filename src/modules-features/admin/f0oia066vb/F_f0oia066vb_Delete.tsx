'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F_f0oia066vb_Delete({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={async () => {
        await baseAxios.post("/COERatingPLO/Delete", {
            "id": id,
            "isEnabled": true
        })
    }}></MyActionIconDelete>
}