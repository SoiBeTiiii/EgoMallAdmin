import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_0mnhzm4fjb_Chart_1 from "@/modules-features/admin/0mnhzm4fjb/F_0mnhzm4fjb_Chart_1";
import F_0mnhzm4fjb_Chart_2 from "@/modules-features/admin/0mnhzm4fjb/F_0mnhzm4fjb_Chart_2";
import F_0mnhzm4fjb_ChiTietGiaTriDoLuong from "@/modules-features/admin/0mnhzm4fjb/F_0mnhzm4fjb_ChiTietGiaTriDoLuong";
import F_0mnhzm4fjb_Condition from "@/modules-features/admin/0mnhzm4fjb/F_0mnhzm4fjb_Condition";

export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_0mnhzm4fjb_Condition />
                <F_0mnhzm4fjb_Chart_1 />
                <F_0mnhzm4fjb_Chart_2 />
                <F_0mnhzm4fjb_ChiTietGiaTriDoLuong />
            </MyFlexColumn>
        </MyPageContent>
    )
}
