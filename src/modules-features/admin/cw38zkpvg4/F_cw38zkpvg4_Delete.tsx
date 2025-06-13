'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import { useQueryClient } from "@tanstack/react-query";


export default function F_cw38zkpvg4_Delete({ id }: { id: number }) {
    const queryClient = useQueryClient();

    const contentDelete = "Khóa";
    return <MyActionIconDelete contextData={contentDelete} onSubmit={() => {
        try {
            baseAxios.post('/COESemester/Delete', { 
                id: id, 
                isEnabled: false
            });

            queryClient.invalidateQueries({ queryKey: ["F_cw38zkpvg4_Read"] });
        } catch (error) {
            console.log(error);
        }
    }}></MyActionIconDelete>
}

