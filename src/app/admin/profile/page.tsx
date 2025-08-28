'use client';
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import Profile_Read from "@/modules-features/admin/profile/profile_Read";
export default function Page() {
    return (
        <MyPageContent>
            <Profile_Read />
        </MyPageContent>
    )
}