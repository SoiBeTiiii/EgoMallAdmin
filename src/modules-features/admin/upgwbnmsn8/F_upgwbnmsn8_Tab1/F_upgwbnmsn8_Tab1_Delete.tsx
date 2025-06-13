'use client'

import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F_upgwbnmsn8_Tab1_Delete({ id }: { id: number }) {
    const contentDelete = "trong mục tiêu môn học CG";
    return <MyActionIconDelete contextData={contentDelete} onSubmit={async () => await baseAxios.post("/COECG/Delete", { id: id })}></MyActionIconDelete>
}

