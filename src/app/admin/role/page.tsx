'use client';
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import Role_Read from "@/modules-features/admin/role/role_Read";
export default function Page() {
    return (
        <MyPageContent>
            <Role_Read />
        </MyPageContent>
    )
}