'use client'

import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F_upgwbnmsn8_Tab2_Delete({ id }: { id: number }) {
    const contentDelete = "trong Chuẩn đầu ra môn học CLO";
    return <MyActionIconDelete contextData={contentDelete} onSubmit={async () => await baseAxios.post("/COECLO/Delete", { id: id })}></MyActionIconDelete>
}

