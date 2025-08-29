"use client";
import { useEffect, useState } from "react";
import { BasicAppShell } from "@/components/Layouts/BasicAppShell/BasicAppShell";
import { I0LinkItem } from "@/components/Layouts/BasicAppShell/BasicAppShell";
import { getMenuForRole } from "@/data/menuData";
import useS0Auth from "@/stores/S0Auth";

export default function Layout({ children }: { children?: React.ReactNode }) {
  const [menu, setMenu] = useState<I0LinkItem[]>([]);
  const S0Auth = useS0Auth();
  const role = S0Auth.getProfile()?.role;
  useEffect(() => {
    (async () => {
      const menuData = await getMenuForRole(role);
      setMenu(menuData);
    })();
  }, []);

  return <BasicAppShell menu={menu}>{children}</BasicAppShell>;
}