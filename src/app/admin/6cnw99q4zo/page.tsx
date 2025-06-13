
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_6cnw99q4zo_Chart1 from "@/modules-features/admin/6cnw99q4zo/F_6cnw99q4zo_Chart1";
import F_6cnw99q4zo_Chart2 from "@/modules-features/admin/6cnw99q4zo/F_6cnw99q4zo_Chart2";
import F_6cnw99q4zo_ChiTietGiaTriDoLuong from "@/modules-features/admin/6cnw99q4zo/F_6cnw99q4zo_ChiTietGiaTriDoLuong";
import F_6cnw99q4zo_Condition from "@/modules-features/admin/6cnw99q4zo/F_6cnw99q4zo_Condition";




export default function Page() {
    return (
        <MyPageContent>
            <F_6cnw99q4zo_Condition />
            <F_6cnw99q4zo_Chart1/>
            <F_6cnw99q4zo_Chart2/>
            <F_6cnw99q4zo_ChiTietGiaTriDoLuong/>
        </MyPageContent>
    )
}