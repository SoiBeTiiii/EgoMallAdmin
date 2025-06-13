import MyPageContent from '@/components/Layouts/PageContent/MyPageContent'
import F_hxrvhadcfm_Read from '@/modules-features/admin/hxrvhadcfm/F_hxrvhadcfm_Read'
import F_Shared_FilterGrade from '@/modules-features/shared/F_Shared_FilterGrade/F_Shared_FilterGrade'
import { Space } from '@mantine/core'

//hxrvhadcfm
export default function Page() {
    return (
        <MyPageContent >
            <F_Shared_FilterGrade />
            <Space />
            <F_hxrvhadcfm_Read />
        </MyPageContent>
    )
}
