import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_t5sip6yyka_Filter from "@/modules-features/admin/t5sip6yyka/F_t5sip6yyka_Filter";
import F_t5sip6yyka_Read from "@/modules-features/admin/t5sip6yyka/F_t5sip6yyka_Read";
import { Space } from "@mantine/core";

export default function Page() {
    return (
        <MyPageContent>
            <F_t5sip6yyka_Filter />
            <Space />
            <F_t5sip6yyka_Read />
        </MyPageContent>
    )
}
