'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F_j9ul1u9c2n_Delete({ id }: { id: number }) {
    const contentDelete = "Khóa"
    return <MyActionIconDelete contextData={contentDelete} onSubmit={() => baseAxios.post("/COERegulation/delete", { id: id })}></MyActionIconDelete>
}

