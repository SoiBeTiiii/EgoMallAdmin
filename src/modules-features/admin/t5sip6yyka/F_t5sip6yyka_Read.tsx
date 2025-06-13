'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import useQ_COEGrade_GetDetail from "@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetDetail";
import { Fieldset, Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_t5sip6yyka_Create from "./F_t5sip6yyka_Create";
import F_t5sip6yyka_Delete from "./F_t5sip6yyka_Delete";
import useS_t5sip6yyka from "./useS_t5sip6yyka";

const legend = "Danh mục môn học cốt lõi đo lường đầu ra chương trình đào tạo"

export default function F_t5sip6yyka_Read() {
    const store = useS_t5sip6yyka()
    const COEGradeGetDetailQuery = useQ_COEGrade_GetDetail({
        params: `?gradeId=${store.state.gradeId}&IsCore=true`
    })
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
        <Fieldset legend={legend}>
            <MyDataTable
                data={COEGradeGetDetailQuery.data!}
                columns={columns}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <F_t5sip6yyka_Create />
                    </Group>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F_t5sip6yyka_Delete data={row.original} />
                    </MyCenterFull>
                )}
            />
        </Fieldset>
    )
}
