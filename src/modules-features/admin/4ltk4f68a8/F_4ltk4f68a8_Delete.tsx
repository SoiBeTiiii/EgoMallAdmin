'use client'
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import useM_COEClass_Delete from "@/hooks/mutation-hooks/COEClass/useM_COEClass_Delete";


export default function F_4ltk4f68a8_Delete({ id }: { id: number }) {
    const contentDelete = "Khóa";
    const courseSectionMutation = useM_COEClass_Delete()
    return <MyActionIconDelete onSubmit={() => {
        courseSectionMutation.mutate(id)
    }}></MyActionIconDelete>
}

