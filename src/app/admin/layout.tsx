import { BasicAppShell } from "@/components/Layouts/BasicAppShell/BasicAppShell";
import { ReactNode } from "react";
import { menuData } from "../../data/menuData";

export default function Layout({ children }: { children?: ReactNode }) {
    return <BasicAppShell menu={menuData}>{children}</BasicAppShell>;
}


