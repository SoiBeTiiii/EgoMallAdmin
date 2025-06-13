import MyPageContent from '@/components/Layouts/PageContent/MyPageContent'
import F_core26965_Create from '@/modules-features/admin/(core)/core26965/F_core26965_Create'
import F_core26965_Read from '@/modules-features/admin/(core)/core26965/F_core26965_Read'

export default function Page() {
    return (
        <MyPageContent rightTopBar={<F_core26965_Create />}>
            <F_core26965_Read />
        </MyPageContent>
    )
}
