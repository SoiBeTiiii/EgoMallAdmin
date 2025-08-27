'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F_k8gyh3atv7_Delete({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={async () => {
        await baseAxios.delete(`/shipping-methods/${id}`);
    }}></MyActionIconDelete>
}

