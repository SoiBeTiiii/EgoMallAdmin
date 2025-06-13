'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import useQ_COEGradeSubject_GetSubjectByGrade from "@/hooks/query-hooks/COEGradeSubject/useQ_COEGradeSubject_GetSubjectByGrade";
import { Fieldset } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_mxmrddxhnz_Update from "./F_mxmrddxhnz_Update";
import useS_mxmrddxhnz from "./useS_mxmrddxhnz";

//mxmrddxhnz
export default function F_mxmrddxhnz_Read() {
    const store = useS_mxmrddxhnz()
    const subjectByGradeQuery = useQ_COEGradeSubject_GetSubjectByGrade({
        params: `?COEGradeId=${store.state.gradeId}&cols=COESubject,COESemester`
    })

    const columns = useMemo<MRT_ColumnDef<ICoeGradeSubject>[]>(() => [
        {
            header: "Năm học Học kỳ",
            accessorKey: "coeSemester.name",

        },
        {
            header: "Thứ tự",
            accessorKey: "order",

        },
        {
            header: "Mã môn học",
            accessorKey: "coeSubject.code",

        },

        {
            header: "Tên môn học",
            accessorKey: "coeSubject.name",

        },
        {
            header: "Số tín chỉ",
            accessorKey: "coeSubject.numberCredit",

        },
        {
            header: "Số tiết",
            accessorKey: "coeSubject.numberPeriod",

        },
        {
            header: "Phương pháp đánh giá",
            accessorKey: "phuongPhapDanhGia",
            accessorFn: (originalRow) => {
                return <F_mxmrddxhnz_Update
                    data={originalRow}
                
                />
            }

        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
        }
    ], []);

    if (subjectByGradeQuery.isLoading) return "Đang tải dữ liệu...";
    if (subjectByGradeQuery.isError) return "Không có dữ liệu...";
    return (
        <MyFlexColumn>
            <Fieldset legend={`Danh sách CLO Môn học thuộc chương trình đào tạo - Khóa học ${store.state.gradeCode}`}>
                <MyDataTable
                    exportAble
                    enableRowSelection
                    columns={columns}
                    data={subjectByGradeQuery.data || []}
                />
            </Fieldset>
        </MyFlexColumn>
    );
}


