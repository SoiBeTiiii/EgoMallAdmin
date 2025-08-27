'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F_am7u4vy7yv_Delete({ slug }: { slug: string }) {
    return <MyActionIconDelete onSubmit={async () => {
        await baseAxios.delete(`/categories/${slug}`);
    }}></MyActionIconDelete>
}

