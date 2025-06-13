"use client"
import baseAxios from '@/api/baseAxios';
import AQButtonCreateByImportFile from '@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile';
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import F_mxmrddxhnz_Create_SubjectMethod from './F_mxmrddxhnz_Create_SubjectMethod';
import F_mxmrddxhnz_Delete_SubjectMethod from './F_mxmrddxhnz_Delete_SubjectMethod';
import F_mxmrddxhnz_Update_SubjectMethod from './F_mxmrddxhnz_Update_SubjectMethod';
// mxmrddxhnz

export interface ICoeSubjectMethod {
    coeSubjectAssessmentId?: number;
    coecloId?: number;
    questionQuantity?: number;
    maxPoint?: number;
    id: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;

    CLOData?: ICoeCLO;

    coeSubjectFormulaName?: string;

    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

interface ICoeCLO {
    order?: number;
    coecgId?: number;
    description?: string;
    densityCLO?: number;
    coecg?: any;
    coeclopi?: any[];
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

interface ICoeSubjectFormula {
    coeTrainingProgramDetail: any;
    formulaType?: number;
    rate?: number;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

interface ICoeSubjectAssessment {
    coeSubjectFormulaId?: number;
    content?: string;
    assessmentWhen?: any;
    assessmentDuration?: any;
    assessmentTool?: any;
    questionType?: number;
    COEGradeSubjectId?: number;
    totalQuestion?: number;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

export interface I_SubjectMethod_Read {
    subjectMethod: ICoeSubjectMethod[]
    subjectFormula: ICoeSubjectFormula[]
}

export default function F_mxmrddxhnz_Read_SubjectMethod() {

    const mergedQuery = useQuery<I_SubjectMethod_Read>({
        queryKey: ["useQ_PhuongPhapDanhGia_Read"],
        queryFn: async () => {
            try {
                const subjectMethodRes = await baseAxios.get("/COESubjectMethod/getAll");
                const cloRes = await baseAxios.get("/COECLO/getAll");
                const subjectFormulaRes = await baseAxios.get("/COESubjectFormula/getAll");
                const coeSubjectAssessmentRes = await baseAxios.get("/COESubjectAssessment/getAll");
    
                subjectMethodRes.data.data.forEach((subjectMethod: ICoeSubjectMethod) => {
                    subjectMethod.CLOData = cloRes.data.data.find((clo: ICoeCLO) => clo.id === subjectMethod.coecloId) as ICoeCLO;
    
                    const coeSubjectAssessmentData = coeSubjectAssessmentRes.data.data.find(
                        (subjectAssessment: ICoeSubjectAssessment) => subjectAssessment.id === subjectMethod.coeSubjectAssessmentId
                    ) as ICoeSubjectAssessment;
    
                    if (coeSubjectAssessmentData && coeSubjectAssessmentData.coeSubjectFormulaId) {
                        subjectMethod.coeSubjectFormulaName = subjectFormulaRes.data.data.find(
                            (subjectFormula: ICoeSubjectFormula) => subjectFormula.id === coeSubjectAssessmentData?.coeSubjectFormulaId
                        )?.name;
                    }
                });
    
                return {
                    subjectMethod: subjectMethodRes.data.data || [],
                    subjectFormula: subjectFormulaRes.data.data || [],
                };
            } catch (error) {
                console.error("Error fetching data:", error);
                return {
                    subjectMethod: [],
                    subjectFormula: [],
                };
            }
        },
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const formatFunctions = {
        birthDate: (value: string) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
        },
        isEnabled: (value: boolean) => (value ? "Đã kích hoạt" : "Chưa kích hoạt")
    };

    const exportConfig = {
        fields: [
            {
                header: "Hình thức đánh giá",
                fieldName: "coeSubjectFormulaName"
            },
            {
                header: "Tỷ trọng CA",
                fieldName: "CLODensity"
            },
            {
                header: "Nội dung đánh giá",
                fieldName: "CLODescription"
            },
            {
                header: "CLO",
                fieldName: "CLOCode"
            },
            {
                header: "Số câu hỏi",
                fieldName: "questionQuantity"
            },
            {
                header: "Điểm tối đa",
                fieldName: "maxPoint"
            },

            {
                header: "Người cập nhật",
                fieldName: "nguoiCapNhat",
            },
            {
                header: "Ngày cập nhật",
                fieldName: "ngayCapNhat",
            },

        ]
    };

    const columns = useMemo<MRT_ColumnDef<ICoeSubjectMethod>[]>(
        () => [
            {
                header: "Hình thức đánh giá",
                accessorKey: "coeSubjectFormulaName"
            },
            {
                header: "Tỷ trọng CA",
                accessorFn: (row) => row.CLOData?.densityCLO, 
            },
            {
                header: "Nội dung đánh giá",
                accessorFn: (row) => row.CLOData?.description,
            },
            {
                header: "CLO",
                accessorFn: (row) => row.CLOData?.code,
            },
            {
                header: "Số câu hỏi",
                accessorKey: "questionQuantity"
            },
            {
                header: "Điểm tối đa",
                accessorKey: "maxPoint"
            },

            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat",

            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },

            },

        ],
        []
    );

    if (mergedQuery.isLoading) return "Đang tải dữ liệu..."
    if (mergedQuery.isError) return "Không có dữ liệu..."

    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={mergedQuery.data?.subjectMethod ?? []}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <MyFlexColumn>
                        <MyFlexRow>
                            <MySelect
                                label="Hình thức đánh giá"
                                style={{ flex: "1" }}
                                data={
                                    mergedQuery.data?.subjectFormula?.map((formula) => ({
                                        value: formula.id?.toString() ?? '',
                                        label: formula.name ?? '',
                                    })) ?? []
                                }
                                defaultValue={mergedQuery.data?.subjectFormula?.[0]?.id?.toString() ?? ''}
                            />
                            <MySelect
                                label="Nội dung đánh giá"
                                style={{ flex: "1" }}
                                data={
                                    mergedQuery.data?.subjectFormula.map((formula) => ({
                                        value: formula.id?.toString() ?? '',
                                        label: formula.code ?? ''
                                    })) ?? []
                                }
                                defaultValue={mergedQuery.data?.subjectFormula?.[0]?.id?.toString() ?? ''}
                            />
                            <MySelect
                                label="Phương pháp đánh giá"
                                style={{ flex: "1" }}
                                data={
                                    mergedQuery.data?.subjectFormula.map((formula) => ({
                                        value: formula.id?.toString() ?? '',
                                        label: formula.code ?? ''
                                    })) ?? []
                                }
                                defaultValue={mergedQuery.data?.subjectFormula?.[0]?.id?.toString() ?? ''}
                            />
                        </MyFlexRow>
                        <Group>

                            <F_mxmrddxhnz_Create_SubjectMethod />
                            <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                console.log(form_multiple.values);

                            }} >s</AQButtonCreateByImportFile>
                            <AQButtonExportData
                                isAllData={true}
                                objectName="dsCauHoi"
                                data={mergedQuery.data?.subjectFormula ?? []}
                                exportConfig={exportConfig}
                            />
                            <Button color="red" leftSection={<IconTrash />}>
                                Xóa
                            </Button>
                        </Group>
                    </MyFlexColumn>
                )
            }}
            renderRowActions={({ row }) => {
                return (

                    <MyCenterFull>
                        <F_mxmrddxhnz_Update_SubjectMethod data={row.original} />
                        <F_mxmrddxhnz_Delete_SubjectMethod id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}