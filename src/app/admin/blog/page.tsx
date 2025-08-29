"use clinent";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import Blog_Read from "@/modules-features/admin/blog/F_blog_Read";

export default function Page() {
    return (
        <MyPageContent>
            <Blog_Read />
        </MyPageContent>
    );
}