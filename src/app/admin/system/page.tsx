'use client';
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import System_Read from "@/modules-features/admin/system/system_Read";

export default function Page() {
    return (
        <MyPageContent>
            <System_Read />
        </MyPageContent>
    )
}