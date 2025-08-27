'use client';
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import Review_Read from "@/modules-features/admin/review/review_Read";

export default function Page() {
    return (
        <MyPageContent>
            <Review_Read />
        </MyPageContent>
    );
}