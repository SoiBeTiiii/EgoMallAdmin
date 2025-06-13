'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F_l9bml18o7p_Delete({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={async () => {
        await baseAxios.post(`/COEUnit/Delete`, {
            id: id,
            isEnabled: true
        });
    }}></MyActionIconDelete>
}

