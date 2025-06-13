'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F_zvib1md6z9_Delete({ id }: { id: number }) {
    const contentDelete = "Khóa"
    return <MyActionIconDelete contextData={contentDelete} onSubmit={async () => {
        await baseAxios.post(`/COEProgram/Delete`, {
            id: id,
            isEnabled: true
        });
    }}></MyActionIconDelete>
}

