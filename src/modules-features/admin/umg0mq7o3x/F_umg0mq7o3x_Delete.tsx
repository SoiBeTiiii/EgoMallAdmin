'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F_ukagvjhxgy_Delete({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={async() => {
        await baseAxios.post("COEMITScale/Delete", {
            "id": id,
            "isEnabled": true
          })
    }}></MyActionIconDelete>
}

