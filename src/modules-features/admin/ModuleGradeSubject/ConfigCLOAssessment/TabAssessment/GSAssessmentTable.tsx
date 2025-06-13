"use client"
import baseAxios from '@/api/baseAxios';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { Button, Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import GSAssessmentCreateButton from './GSAssessmentCreateButton';
import GSAssessmentDeleteActionIconModal from './GSAssessmentDeleteActionIcon';
import GSAssessmentUpdateActionIcon from './GSAssessmentUpdateActionIcon';
import { IGSAssessment } from './Interfaces';

enum formulaType {
    "Chuyên cần" = 1,
    "Quá trình" = 2,
    "Cuối kỳ" = 3
}

enum questionType {
    "Trắc nghiệm" = 1,
    "Tự luận" = 2,
    "Trắc nghiệm + Tự luận" = 3,
    "Tiểu luận" = 4,
    "Vấn đáp" = 5,
}

enum toolType {
    "Rubrics" = 1
}

export default function GSAssessmentTable({ gradeSubjectId }: { gradeSubjectId?: number }) {
    const allGSAssessment = useQuery<IGSAssessment[]>({
        queryKey: [`GSAssessmentTableByGradeSubjectId${gradeSubjectId}`],
        queryFn: async () => {
            if (!gradeSubjectId) return [];
            let cols = "COESubjectMethods,COESubjectFormula";
            const response = await baseAxios.get(`/COESubjectAssessment/FindByGradeSubject?coeGradeSubjectId=${gradeSubjectId}&cols=${cols}`);
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    })

    const columns = useMemo<MRT_ColumnDef<IGSAssessment>[]>(() =>
        [
            {
                header: "Hình thức đánh giá",
                accessorFn: (originalRow) => originalRow.coeSubjectFormula?.formulaType === null ? "" : formulaType[originalRow.coeSubjectFormula?.formulaType!],
            },
            {
                header: "Tỷ trọng CA",
                accessorFn: (originalRow) => originalRow.coeSubjectFormula?.rate,
                Cell: ({ row }) => {
                    return (
                        <>
                            {row.original.coeSubjectFormula?.rate} %
                        </>
                    )
                }
            },
            {
                header: "Nội dung đánh giá",
                accessorKey: "content",
            },
            {
                header: "CLOi",
                accessorFn: (originalRow) => originalRow.coeSubjectMethods?.map((item) => item.coecloId).join(", "),
                Cell: ({ row }) => {
                    return (
                        <>
                            CLOId: {row.original.coeSubjectMethods?.map((item) => item.coecloId).join(", ")}
                        </>
                    )
                }
            },
            {
                header: "Thời điểm đánh giá",
                accessorKey: "assessmentWhen",
            },
            {
                header: "Phương pháp đánh giá",
                accessorFn: (originalRow) => originalRow.questionType === null ? "" : questionType[originalRow.questionType!],
            },
            {
                header: "Loại công cụ đánh giá",
                accessorFn: (originalRow) => originalRow.assessmentTool === null ? "" : toolType[originalRow.assessmentTool!],
            },
            {
                header: "Thời gian đánh giá",
                accessorKey: "assessmentDuration",
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
            data={allGSAssessment.data || []}
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <GSAssessmentCreateButton
                                gradeSubjectId={gradeSubjectId}
                            />
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
                            <GSAssessmentUpdateActionIcon
                                GSAssessmentValues={row.original}
                                gradeSubjectId={gradeSubjectId}
                            />
                            <GSAssessmentDeleteActionIconModal
                                GSAssessmentCode={row.original.code === null ? null : row.original.code}
                                GSAssessmentID={row.original.id}
                                gradeSubjectId={gradeSubjectId}
                            />
                        </Group>
                    </MyCenterFull>
                )
            }}
        />
    )
}
