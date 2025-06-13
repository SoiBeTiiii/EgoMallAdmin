import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import useM_COEGradeSubject from "@/hooks/mutation-hooks/COEGradeSubject/useM_COEGradeSubject";
import useQ_COEGrade_GetDetail from "@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetDetail";
import { utils_notification_show } from "@/utils/notification";
import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import useS_t5sip6yyka from "./useS_t5sip6yyka";

const title = "Chi tiết chương trình đào tạo khóa"
export default function F_t5sip6yyka_Create() {
    const disc = useDisclosure()
    const store = useS_t5sip6yyka()
    const mutation = useM_COEGradeSubject({
        endpointSuffix: "/updatelist"
    })
    const gradeSubjectSelected = useState<ICoeGradeSubject[]>([])
    const COEGradeGetDetailQuery = useQ_COEGrade_GetDetail({
        params: `?gradeId=${store.state.gradeId}&IsCore=false`
    })

    function handleSelect() {
        if (gradeSubjectSelected[0].length == 0) {
            notifications.show({
                message: "Vui lòng chọn"
            })
            return
        }
        mutation.mutate(gradeSubjectSelected[0].map(item => ({
            id: item.id,
            code: item.code,
            name: item.name,
            concurrencyStamp: item.concurrencyStamp,
            isEnabled: true,
            coeGradeId: item.coeGradeId,
            coeSubjectId: item.coeSubjectId,
            coeSemesterId: item.coeSemesterId,
            coeSubjectGroupId: item.coeSubjectGroupId,
            order: item.order,
            isCore: true,
        })), {
            onSuccess: () => {
                utils_notification_show({ crudType: "create" })
                disc[1].close()
            }
        })
    }

    const columns = useMemo<MRT_ColumnDef<ICoeGradeSubject>[]>(() => [
        {
            header: "Năm học Học kỳ",
            accessorKey: "coeSemester.name"
        },
        {
            header: "Thứ tự",
            accessorKey: "order"
        },
        {
            header: "Mã môn học",
            accessorKey: "coeSubject.code"
        },
        {
            header: "Tên môn học",
            accessorKey: "coeSubject.name"
        },
        {
            header: "Nhóm môn học",
            accessorKey: "coeSubjectGroup.name"
        },
        {
            header: "Số tín chỉ",
            accessorKey: "coeSubject.numberCredit"
        },
        {
            header: "Số tiết",
            accessorKey: "coeSubject.numberPeriod"
        }
    ], [])
    if (COEGradeGetDetailQuery.isLoading) return "Đang tải dữ liệu..."
    if (COEGradeGetDetailQuery.isError) return "Có lỗi xảy ra!"
    return (
        <MyButtonModal crudType="create" disclosure={disc} title={title} modalSize={'80%'}>
            <MyDataTable
                enableRowSelection
                data={COEGradeGetDetailQuery.data!}
                columns={columns}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <MyButton crudType="select" onClick={handleSelect} />
                    </Group>
                )}
                setSelectedRow={gradeSubjectSelected[1]}
            />
        </MyButtonModal>
    )
}
