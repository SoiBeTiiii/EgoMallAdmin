'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F_mxmrddxhnz_Delete_SubjectFormula({ id }: { id: number }) {
    return <MyActionIconDelete onSubmit={async () =>
        await baseAxios.post(`/COESubjectFormula/Delete`, {
            id: id,
            isEnabled: true
        })
    }></MyActionIconDelete>
}

