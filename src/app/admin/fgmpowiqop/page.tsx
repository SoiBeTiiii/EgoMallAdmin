import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_fgmpowiqop_Filter from "@/modules-features/admin/fgmpowiqop/F_fgmpowiqop_Filter";
import F_fgmpowiqop_Read from "@/modules-features/admin/fgmpowiqop/F_fgmpowiqop_Read";
import { Space } from "@mantine/core";

//fgmpowiqop
export default function Page() {
    return (
        <MyPageContent>
            <F_fgmpowiqop_Filter />
            <Space />
            <F_fgmpowiqop_Read />
        </MyPageContent>
    )
}
