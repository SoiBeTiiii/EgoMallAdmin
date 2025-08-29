"use client";
import MyPageContent from '@/components/Layouts/PageContent/MyPageContent';
import Blog_Create from '@/modules-features/admin/blog/F_blog_Create';

export default function Page() {
  return (
    <MyPageContent>
      <Blog_Create />
    </MyPageContent>
  );
}