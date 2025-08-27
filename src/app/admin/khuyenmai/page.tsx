'use client'
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import Khuyenmai_Read from "@/modules-features/admin/khuyenmai/khuyenmai_Read";


export default function Page() {
    return (
        <MyPageContent>
            <Khuyenmai_Read />
        </MyPageContent>
    )
}