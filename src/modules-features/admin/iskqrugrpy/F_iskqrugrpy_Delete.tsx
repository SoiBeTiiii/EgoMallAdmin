'use client'
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F_iskqrugrpy_Delete({ id }: { id: number }) {
    const contentDelete = "dữ liệu"
    return <MyActionIconDelete contextData={contentDelete} onSubmit={() => {
    }}></MyActionIconDelete>
}

