'use client';
import baseAxios from "@/api/baseAxios";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function CGTable({ gradeSubjectId }: { gradeSubjectId?: number }) {
    const allGCs = useQuery<ICoeCG[]>({
        queryKey: [`CGByGradeSubjectId${gradeSubjectId}`],
        queryFn: async () => {
            if (!gradeSubjectId) return []
            const res = await baseAxios.get(`/COECG/GetSource?coegradeSubjectId=${gradeSubjectId}`)
            return res.data.data
        },
        refetchOnWindowFocus: false,
    })

    const columns = useMemo<MRT_ColumnDef<ICoeCG>[]>(() => [
        {
            header: "Mã CG",
            accessorKey: "code",
        },
        {
            header: " Mô tả",
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
            data={allGCs.data || []}
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
