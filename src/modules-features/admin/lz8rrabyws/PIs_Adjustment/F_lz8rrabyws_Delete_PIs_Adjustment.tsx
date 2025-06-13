'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F_lz8rrabyws_Delete_PIs_Adjustment({ id }: { id: number }) {
    const contentDelete = "Chỉ số thực hiện PIs"

    return <MyActionIconDelete contextData={contentDelete} onSubmit={async () => await baseAxios.post("/COEPI/Delete", { id: id })}></MyActionIconDelete>
}

