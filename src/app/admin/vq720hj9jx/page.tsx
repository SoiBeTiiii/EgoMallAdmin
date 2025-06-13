'use client'
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_vq720hj9jx_Read from "@/modules-features/admin/vq720hj9jx/F_vq720hj9jx_Read";
import F_Shared_FilterGrade from "@/modules-features/shared/F_Shared_FilterGrade/F_Shared_FilterGrade";
import { Space } from "@mantine/core";

export default function Page() {
    return (
        <MyPageContent>
            <F_Shared_FilterGrade />
            <Space />
            <F_vq720hj9jx_Read />
        </MyPageContent>
    )
}