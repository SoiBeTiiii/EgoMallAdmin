"use client"
import baseAxios from "@/api/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { Button, Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import { IAssessment } from "./Interface";


export default function GradeSubjectAssessmentTable({ gradeSubjectId }: { gradeSubjectId: number | null | undefined }) {

    const AllAssessments = useQuery<IAssessment[]>({
        queryKey: [`GradeSubjectAssessmentBy${gradeSubjectId}`],
        queryFn: async () => {
            let response = await baseAxios.get(`/COESubjectAssessment/FindByGradeSubject?coeGradeSubjectId=${gradeSubjectId}&cols=COESubjectMethods,CCOESubjectAssessmentCLOs,COESubjectFormula`)
            return response.data.data;
        },
    })

    const columns = useMemo<MRT_ColumnDef<IAssessment>[]>(
        () => [
            {
                header: "Hình thức đánh giá",
                accessorKey: "coeSubjectFormula.name",
            },
            {
                header: "Tỷ trọng CA",
                accessorKey: "coeSubjectFormula.rate",

            },
            {
                header: "Nội dung đánh giá",
                accessorKey: "content",
            },
            {
                header: "CLOi",
                accessorFn(originalRow) {
                    return originalRow.coeSubjectMethods?.map((item) => item.coecloId).join(", ")
                },
                Cell: ({ row }) => {
                    return (
                        <>
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {row.original.coeSubjectMethods?.map((method) => method.coecloId).join("\n")}
                            </div>
                        </>
                    )
                },
            },
            {
                header: "Thời điểm đánh giá",
                accessorKey: "assessmentTime",
            },
            {
                header: "Phương pháp đánh giá",
                accessorFn(originalRow) {
                    return DisplayQuestionTypeField(originalRow.questionType)
                }
            },
            {
                header: "Công cụ đánh giá",
                accessorFn(originalRow) {
                    return DisplayAssessmentToolField(originalRow.assessmentTool)
                }
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
        ], []);

    if (AllAssessments.isLoading) return "Đang tải dữ liệu..."
    if (AllAssessments.isError) return "Lỗi khi tải dữ liệu..."
    return (
        <MyDataTable
            data={AllAssessments.data || []}
            columns={columns}
            enableRowNumbers={true}
            enableRowSelection={true}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <Button>Tạo</Button>
                            {/* <F_mxmrddxhnz_Create_noidung /> */}
                            <Button color='teal'>Export</Button>
                            <Button color='green'>Import</Button>
                            <Button color="red"> Xóa</Button>
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        Sửa | Xóa
                    </MyCenterFull>
                )
            }}
        />
    )
}

function DisplayQuestionTypeField(questionType: number | undefined | null) {
    if (questionType === undefined || questionType === null) return ""
    switch (questionType) {
        case 1:
            return "Trắc nghiệm"
        case 2:
            return "Tự luận"
        case 3:
            return "Trắc nghiệm + tự luận"
        case 4:
            return "Tiểu luận"
        case 5:
            return "Vấn đáp"
        default:
            return ""
    }
}

function DisplayAssessmentToolField(questionType: number | undefined | null) {
    if (questionType === undefined || questionType === null) return ""
    switch (questionType) {
        case 1:
            return "Rubrics"
        default:
            return ""
    }
}