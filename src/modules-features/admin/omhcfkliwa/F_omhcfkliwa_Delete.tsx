'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F_omhcfkliwa_Delete({ id }: { id: number }) {
    const contentDelete = "Mã của đối tượng";
    return <MyActionIconDelete contextData={contentDelete} onSubmit={async () => {
        await baseAxios.post("/COESchoolYear/Delete", { id: id })
    }}></MyActionIconDelete>
}

