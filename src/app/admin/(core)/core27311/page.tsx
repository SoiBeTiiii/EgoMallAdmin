import MyPageContent from '@/components/Layouts/PageContent/MyPageContent'
import F_core27311_Create from '@/modules-features/admin/(core)/core27311/F_core27311_Create'
import F_core27311_Read from '@/modules-features/admin/(core)/core27311/F_core27311_Read'


export default function Page() {
    return (
        <MyPageContent rightTopBar={<F_core27311_Create />}>
            <F_core27311_Read />
        </MyPageContent>
    )
}
