'use client'
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_ksaqbmpgmt_Read from "@/modules-features/admin/ksaqbmpgmt/F_ksaqbmpgmt_Read";


export default function Page() {
    return (
        <MyPageContent>
            <F_ksaqbmpgmt_Read />
        </MyPageContent>
    )
}