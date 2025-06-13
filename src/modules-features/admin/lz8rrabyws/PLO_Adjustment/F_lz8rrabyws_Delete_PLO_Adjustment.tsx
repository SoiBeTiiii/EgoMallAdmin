'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F_lz8rrabyws_Delete_PLO_Adjustment({ id }: { id: number }) {
    const contentDelete = "Chuẩn đầu ra PLOs"

    return <MyActionIconDelete contextData={contentDelete} onSubmit={async () => await baseAxios.post("/COEPLO/Delete", { id: id })}></MyActionIconDelete>
}

