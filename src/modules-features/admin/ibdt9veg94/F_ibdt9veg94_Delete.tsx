'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F_p1x0zur5dt_Delete({ id }: { id: string }) {
    return <MyActionIconDelete onSubmit={async () => {
        await baseAxios.delete(`/brands/${id}`);
        console.log(id);
    }}></MyActionIconDelete>
}

