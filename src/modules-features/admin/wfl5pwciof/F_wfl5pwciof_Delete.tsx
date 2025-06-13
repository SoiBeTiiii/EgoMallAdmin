'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F_wfl5pwciof_Delete({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={async () => {
        await baseAxios.post("/COESubjectGroupMITScale/delete", { id: id })
    }}></MyActionIconDelete>
}

