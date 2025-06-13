import { HeaderMegaMenu } from "@/components/Layouts/HeaderMegaMenu/HeaderMegaMenu";
import { ReactNode } from "react";

const menu = [
    { label: "Đăng ký khóa học", href: "/student/dang-ky-khoa-hoc" },
    { label: "Đăng ký khóa thi", href: "/student/dang-ky-khoa-thi" }
]

export default function Layout({ children }: { children?: ReactNode }) {
    return <HeaderMegaMenu menus={menu}>{children}</HeaderMegaMenu>
}
