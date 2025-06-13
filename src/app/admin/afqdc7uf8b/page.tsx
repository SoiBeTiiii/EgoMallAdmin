import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_afqdc7uf8b_Filter from "@/modules-features/admin/afqdc7uf8b/F_afqdc7uf8b_Filter";
import F_afqdc7uf8b_Read from "@/modules-features/admin/afqdc7uf8b/F_afqdc7uf8b_Read";
import { Space } from "@mantine/core";

export default function Page() {
  return (
    <MyPageContent>
      <F_afqdc7uf8b_Filter />
      <Space />
      <F_afqdc7uf8b_Read />
    </MyPageContent>
  )
}