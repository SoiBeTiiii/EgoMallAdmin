'use client';
import baseAxios from "@/api/baseAxios";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function CLOTable({ gradeSubjectId }: { gradeSubjectId?: number }) {
    const allCLOs = useQuery<ICoeCLO[]>({
        queryKey: [`CLOByGradeSubjectId${gradeSubjectId}`],
        queryFn: async () => {
            if (!gradeSubjectId) return []
            const res = await baseAxios.get(`/COECLO/GetSource?coegradeSubjectId=${gradeSubjectId}`)
            return res.data.data
        },
        refetchOnWindowFocus: false,
    })

    const columns = useMemo<MRT_ColumnDef<ICoeCLO>[]>(() => [
        {
            header: "Mã CG",
            accessorKey: "coecg.code",

        },
        {
            header: "Mã CLO",
            accessorKey: "code",
        },
        {
            header: "Tỷ trọng CLO",
            accessorFn: (originalRow) => originalRow.densityCLO,
            Cell: ({ row }) => {
                return (
                    <>{row.original.densityCLO} %</>
                )
            }
        },
        {
            header: "Mô tả",
            accessorKey: "description",
        },
        // {
        //     header: "Người cập nhật",
        //     accessorKey: "nguoiCapNhat"
        // },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        // }
    ], []);

    return (
        <MyDataTable
            columns={columns}
            data={allCLOs.data || []}
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <Button color="teal">Export</Button>
                </Group>
            )}
        />
    );
}
