'use client'
import baseAxios from "@/api/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Group, NumberInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { IGSAssessment } from "../TabAssessment/Interfaces";
import { IGSFormula } from "../TabFormula/Interfaces";
import GSAssessmentUpdateActionIcon from "./GSMethodUpdateActionIcon";
import { IGSMethod } from "./Interfaces";

enum formulaType {
    "Chuyên cần" = 1,
    "Quá trình" = 2,
    "Cuối kỳ" = 3
}
export default function GSMethodTable({ gradeSubjectId, assessmentId, formulaValues, assessmentValues }: { gradeSubjectId?: number, assessmentId?: number | null, formulaValues?: IGSFormula, assessmentValues?: IGSAssessment }) {
    const allGSMethods = useQuery<IGSMethod[]>({
        queryKey: [`COESubjectMethodByAssessment`, assessmentId],
        queryFn: async () => {
            if (!assessmentId) return [];
            let cols = "COECLO,COESubjectAssessment"
            const response = await baseAxios.get(`/COESubjectMethod/FindBySubjectAssessment?coeSubjectAssessmentId=${assessmentId}&cols=${cols}`);
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    })

    const [editedGSMethods, setEditedGSMethods] = useState<IGSMethod[]>([]);

    const columns = useMemo<MRT_ColumnDef<IGSMethod>[]>(() => [
        {
            header: "Hình thức đánh giá",
            accessorFn: (originalRow) => {
                return (formulaType[formulaValues?.formulaType!])
            }
        },
        {
            header: "Tỉ trọng CA",
            accessorFn: (originalRow) => {
                return (formulaValues?.rate!)
            }
        },
        {
            header: "Nội dung đánh giá",
            accessorFn: (originalRow) => {
                return (assessmentValues?.content!)
            }
        },
        {
            header: "CLO",
            accessorKey: "coeclo.name",
        },
        {
            header: "Số câu hỏi",
            accessorKey: "questionQuantity",
            Cell: ({ row }) => {
                return <NumberInput
                    placeholder="Nhập số câu hỏi"
                    value={row.original.questionQuantity ?? 0}
                    onBlur={(e) => handleFieldChange(row.original, "questionQuantity", Number(e.currentTarget.value))}
                />
            }
        },
        {
            header: "Điểm tối đa",
            accessorKey: "maxPoint",
            Cell: ({ row }) => {
                return <NumberInput
                    placeholder="Nhập số câu hỏi"
                    value={row.original.maxPoint ?? 0}
                    onBlur={(e) => handleFieldChange(row.original, "maxPoint", Number(e.currentTarget.value))}
                />
            }
        },
        // {
        //     header: "Người cập nhật",
        //     accessorKey: "modifiedBy",
        // },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "modifiedWhen",
        //     accessorFn(originalRow) {
        //         return U0FormatToDateTimetring(new Date(originalRow.modifiedWhen!));
        //     },
        // }
    ], [formulaValues, assessmentValues, allGSMethods.data]);

    const handleFieldChange = (row: IGSMethod, fieldName: keyof IGSMethod, fieldValue: any) => {
        if (fieldValue === undefined || fieldValue === null || fieldValue === "") fieldValue = null

        setEditedGSMethods((prev) => {
            // Check if the row already exists in editedGSMethods
            const existingIndex = prev.findIndex((item) => item.id === row.id);

            if (existingIndex !== -1) {
                // Update existing row
                const updatedGSMethods = [...prev];
                updatedGSMethods[existingIndex] = {
                    ...updatedGSMethods[existingIndex],
                    [fieldName]: fieldValue
                };
                return updatedGSMethods;
            } else {
                // Add new modified row
                return [...prev, {
                    ...row,
                    [fieldName]: fieldValue
                }];
            }
        });
    };

    const handleSaveButton = async () => {
        const updatedExams = editedGSMethods.map((GSMethod) => ({
            id: GSMethod.id,
            code: GSMethod.code,
            name: GSMethod.name,
            concurrencyStamp: GSMethod.concurrencyStamp,
            isEnabled: GSMethod.isEnabled,
            coeSubjectAssessmentId: GSMethod.coeSubjectAssessmentId,
            coecloId: GSMethod.coecloId,
            questionQuantity: GSMethod.questionQuantity,
            maxPoint: GSMethod.maxPoint,
        }));

        let response = await baseAxios.post("/COESubjectMethod/UpdateList", updatedExams);
        if (response.data.isSuccess === 1) {
            notifications.show({
                title: "Lưu thành công",
                message: "Dữ liệu đã được lưu",
                color: "green"
            })
        }
        if (response.data.isSuccess !== 1) {
            notifications.show({
                title: "Thao tác thất bại",
                message: "Dữ liệu chưa được lưu",
                color: "red"
            })
        }
    };

    return (
        <>
            <MyDataTable
                columns={columns}
                data={allGSMethods.data || []}
                // initialState={{
                //     density: "md",
                //     pagination: { pageIndex: 0, pageSize: 10 },
                // }}
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <Button color="blue" onClick={handleSaveButton}>Lưu</Button>
                        <Button color="teal">Export</Button>
                        <Button color="red">Xóa</Button>
                    </Group>
                )}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <Group gap={8}>
                                <GSAssessmentUpdateActionIcon
                                    GSMethodValues={row.original}
                                    gradeSubjectId={gradeSubjectId}
                                    assessmentId={assessmentId}
                                />
                            </Group>
                        </MyCenterFull>
                    )
                }}
            />
        </>
    )
}