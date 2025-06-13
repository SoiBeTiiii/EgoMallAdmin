import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_nugmpmukta_Read from "@/modules-features/admin/nugmpmukta/F_nugmpmukta_Read";
import F_Shared_FilterGrade from "@/modules-features/shared/F_Shared_FilterGrade/F_Shared_FilterGrade";
import { Space } from "@mantine/core";
export default function Page() {
    return (
        <MyPageContent>
            <F_Shared_FilterGrade />
            <Space />
            <F_nugmpmukta_Read />
        </MyPageContent>
    )
}
