'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import { useQueryClient } from "@tanstack/react-query";


export default function F_ukagvjhxgy_Delete({ id }: { id: number }) {
    const queryClient = useQueryClient();

    const contentDelete = "Khóa";
    return <MyActionIconDelete contextData={contentDelete} onSubmit={async () => {
        try {
            return await baseAxios.post('/COEGrade/Delete', {
                id: id,
                isEnabled: false
            });

        } catch (error) {
            console.log(error);
        }
    }}></MyActionIconDelete>
}

