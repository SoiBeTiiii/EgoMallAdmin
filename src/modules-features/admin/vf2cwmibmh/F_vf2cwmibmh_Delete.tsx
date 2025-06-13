'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F_4hi65qkj5n_Delete({ id }: { id: number }) {
    const contentDelete = "Khóa";
    return <MyActionIconDelete contextData={contentDelete} onSubmit={() => baseAxios.post("/COETrainingLevel/Delete", { id: id })}></MyActionIconDelete>
}

