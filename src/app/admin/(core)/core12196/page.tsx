import MyPageContent from '@/components/Layouts/PageContent/MyPageContent'
import F_core12196_Create from '@/modules-features/admin/(core)/core12196/F_core12196_Create'
import F_core12196_Read from '@/modules-features/admin/(core)/core12196/F_core12196_Read'

export default function Page() {
    return (
        <MyPageContent rightTopBar={<F_core12196_Create />}>
            <F_core12196_Read />
        </MyPageContent>
    )
}
