import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function F_t5sip6yyka_Delete({ data }: { data: ICoeGradeSubject }) {
    const disc = useDisclosure()
    const loadingState = useState<boolean>(false)
    async function handleSubmit() {
        const res = await baseAxios.post("/COEGradeSubject/update", {
            id: data.id,
            code: data.code,
            name: data.name,
            concurrencyStamp: data.concurrencyStamp,
            isEnabled: true,
            coeGradeId: data.coeGradeId,
            coeSubjectId: data.coeSubjectId,
            coeSemesterId: data.coeSemesterId,
            coeSubjectGroupId: data.coeSubjectGroupId,
            order: data.order,
            isCore: false,
        })
        return res
    }
    return (
        <MyActionIconDelete
            contextData={data.code}
            loading={loadingState[0]}
            onSubmit={handleSubmit}
        />
    )
}
