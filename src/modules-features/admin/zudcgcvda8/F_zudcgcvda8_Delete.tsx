'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F_zudcgcvda8_Delete({ id }: { id: number }) {
    const contentDelete = "Khóa";
    return <MyActionIconDelete contextData={contentDelete} onSubmit={() => baseAxios.post("/COESubjectGroup/Delete", { id: id })}></MyActionIconDelete>
}

