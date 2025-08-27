'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F_ibdt9veg94_Delete({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={async () => {
        await baseAxios.delete(`/brands/${id}`);
    }}></MyActionIconDelete>
}

