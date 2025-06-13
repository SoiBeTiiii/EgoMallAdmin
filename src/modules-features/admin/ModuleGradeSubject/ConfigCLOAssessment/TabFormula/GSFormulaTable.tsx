"use client"
import baseAxios from '@/api/baseAxios';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { Button, Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import GSFormulaCreateButton from './GSFormulaCreateButton';
import GSFormulaDeleteActionIconModal from './GSFormulaDeleteActionIcon';
import GSFormulaUpdateActionIcon from './GSFormulaUpdateActionIcon';
import { IGSFormula } from './Interfaces';

enum formulaType {
    "Chuyên cần" = 1, // Chuyên cần
    "Quá trình" = 2, // Quá trình
    "Cuối kỳ" = 3  // Cuối kỳ
}

export default function GSFormulaTable({ gradeSubjectId }: { gradeSubjectId?: number }) {

    const allGSFormula = useQuery<IGSFormula[]>({
        queryKey: [`GSFormulaTableByGradeSubjectId${gradeSubjectId}`],
        queryFn: async () => {
            // return mockData
            if (!gradeSubjectId) return [];
            const response = await baseAxios.get(`/COESubjectFormula/FindByGradeSubject?coeGradeSubjectId=${gradeSubjectId}`);
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    })

    const columns = useMemo<MRT_ColumnDef<IGSFormula>[]>(() =>
        [
            {
                header: "Hình thức đánh giá",
                accessorFn: (originalRow) => originalRow.formulaType === null ? "" : formulaType[originalRow.formulaType!],
            },
            {
                header: "Tỷ trọng CA",
                accessorFn: (originalRow) => originalRow.rate,
                Cell: ({ row }) => {
                    return (
                        <>
                            {row.original.rate} %
                        </>
                    )
                }
            },
            // {
            //     header: "Người cập nhật",
            //     accessorKey: "nguoiCapNhat",
            // },
            // {
            //     header: "Ngày cập nhật",
            //     accessorKey: "ngayCapNhat",
            //     accessorFn(originalRow) {
            //         return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            //     },
            // },
        ],
        []
    );

    return (
        <MyDataTable
            columns={columns}
            data={allGSFormula.data || []}
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <GSFormulaCreateButton gradeSubjectId={gradeSubjectId} />
                            <Button color='teal'>Export</Button>
                            <Button color='green'>Import</Button>
                            <Button color='red'>Xóa</Button>
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <Group gap={8}>
                            <GSFormulaUpdateActionIcon
                                gradeSubjectFormulaValues={row.original}
                                gradeSubjectId={gradeSubjectId}
                            />
                            <GSFormulaDeleteActionIconModal
                                GSFormulaCode={row.original.code === null ? null : row.original.code}
                                GSFormulaID={row.original.id}
                                gradeSubjectId={gradeSubjectId}
                            />
                        </Group>
                    </MyCenterFull>
                )
            }}
        />
    )
}
