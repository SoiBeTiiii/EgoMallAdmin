import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_mxmrddxhnz_Filter from "@/modules-features/admin/mxmrddxhnz/F_mxmrddxhnz_Filter";
import F_mxmrddxhnz_Read from "@/modules-features/admin/mxmrddxhnz/F_mxmrddxhnz_Read";
//mxmrddxhnz
export default function Page() {
    return (
        <MyPageContent>
            <F_mxmrddxhnz_Filter/>
            <F_mxmrddxhnz_Read />
        </MyPageContent>
    )
}
