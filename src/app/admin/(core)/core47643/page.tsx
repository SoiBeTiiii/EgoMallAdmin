'use client'
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_core47643_Read from "@/modules-features/admin/(core)/core47643/F_core47643_Read";
import { useForm } from "@mantine/form";

export default function Page() {
    const form = useForm()
    return (
        <MyPageContent title="Danh mục quyền" canBack>
            <F_core47643_Read />
        </MyPageContent>
    )
}
