'use client'
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_upgwbnmsn8_Filter from "@/modules-features/admin/upgwbnmsn8/F_upgwbnmsn8_Filter";
import F_upgwbnmsn8_Read from "@/modules-features/admin/upgwbnmsn8/F_upgwbnmsn8_Read";
import { Space } from "@mantine/core";

export default function Page() {
    return (
        <MyPageContent>
            <F_upgwbnmsn8_Filter />
            <Space />
            <F_upgwbnmsn8_Read />
        </MyPageContent>
    )
}