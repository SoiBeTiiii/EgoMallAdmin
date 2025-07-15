'use client'
import MyBoxesBackground from "@/components/Aceternity/BoxesBackground/MyBoxesBackground";
import useS0Auth from "@/stores/S0Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()
  const S0Auth = useS0Auth()
  useEffect(() => {
    if (S0Auth.state.token == "") {
      router.push("/auth/login")
      return
    }
    router.push("/auth/login")

  }, [S0Auth.state.token])
  return (
    <MyBoxesBackground title="Hệ thống quản lí trang web EGOMall" />
  );
}
