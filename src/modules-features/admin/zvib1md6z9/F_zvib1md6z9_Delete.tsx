'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F_zvib1md6z9_Delete({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={async() => {
        await baseAxios.post("/COEDegreeLevel/Delete", {
            "id": id,
            "isEnabled": true
          })
    }}></MyActionIconDelete>
}