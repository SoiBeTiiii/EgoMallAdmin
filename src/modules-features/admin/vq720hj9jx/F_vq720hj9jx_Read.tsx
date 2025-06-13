'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

import baseAxios from "@/api/baseAxios";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { ENUM_ASSESSMENT_TOOL, ENUM_QUESTION_TYPE } from "@/constants/enum/global";
import useS_Shared_FilterGrade from "@/modules-features/shared/F_Shared_FilterGrade/useS_Shared_FilterGrade";
import F_vq720hj9jx_Details from "./F_vq720hj9jx_Details";

export interface ICoeSubjectFomula {
    id?: number;
    code: string;
    name: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    coeTrainingProgramDetail?: number | null;
    formulaType: number;
    rate: number;
}

export interface ICoeSubject {
    nameEg: string;
    numberPeriod: number;
    numberCredit: number;
    note: string;
    coeUnitId: number;
    coeUnit: any | null;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ICoeSubjectMethod {
    coeSubjectAssessmentId: number;
    coecloId: number;
    questionQuantity: number;
    maxPoint: number;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

export interface ICoeSubjectAssessment {
    coeSubjectFormulaId: number;
    content: string;
    assessmentWhen: string;
    assessmentDuration: string;
    assessmentTool: number;
    questionType: number;
    totalQuestion: number;
    coeGradeSubjectId: number;
    coeSubjectAssessmentCLOs: ICoeSubjectAssessmentCLO[];
    coeSubjectMethods: ICoeSubjectMethod[];
    coeSubjectFormula: ICoeSubjectFomula;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

export interface ICoeSubjectAssessmentCLO {
    coeSubjectAssessmentId: number;
    coecloId: number;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

export interface I_vq720hj9jx_Read {
    coeGradeId: number;
    coeSubjectId: number;
    coeSemesterId: number;
    coeSubjectGroupId?: any;
    order?: any;
    isCore?: any;
    totalSubjectGroup: number;
    coecGs: any[];
    coeSubjectFomulas: ICoeSubjectFomula[];
    coeGrade?: any;
    coeSubject: ICoeSubject;
    coeSemester?: any;
    coeSubjectGroup?: any;
    coeSubjectAssessments: ICoeSubjectAssessment[];
    coeSubjectCLO: ICoeSubjectAssessmentCLO[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

export default function F_vq720hj9jx_Read() {
    const [subjectAssessment, setSubjectAssessment] = useState<I_vq720hj9jx_Read[]>([])
    const store = useS_Shared_FilterGrade();

    const AllQuery = useQuery<I_vq720hj9jx_Read[]>({
        queryKey: ["F_vq720hj9jx_Read", store.state.grade?.id],
        queryFn: async () => {
            const response = await baseAxios.get(`/COEGradeSubject/GetSubjectAssessmentByCOEGradeId?COEGradeID=${store.state.grade?.id}`);

            if (!Array.isArray(response.data?.data)) {
                return [];
            }

            const mapArray: I_vq720hj9jx_Read[] = [];
            (response.data?.data ?? []).forEach((item: I_vq720hj9jx_Read) => {
                if (item.coeSubjectAssessments?.length) {
                    item.coeSubjectAssessments.forEach((subjectAssessment: ICoeSubjectAssessment) => {
                        mapArray.push({ ...item, coeSubjectAssessments: [subjectAssessment] });
                    });
                } else {
                    mapArray.push(item);
                }
            });

            setSubjectAssessment(mapArray)
            return response.data?.data || []
        },
        // enabled: !!store.state.grade?.id,
    })

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const columns = useMemo<MRT_ColumnDef<I_vq720hj9jx_Read>[]>(() => [
        {
            header: "Mã môn học",
            accessorKey: "SubjectCode",
            accessorFn: (originalRow) => {
                return originalRow.coeSubject.code
            },
        },
        {
            header: "Tên môn học",
            accessorKey: "SubjectName",
            accessorFn: (originalRow) => {
                return originalRow.coeSubject.name
            },
        },
        {
            header: "Hình thức đánh giá", accessorKey: "SubjectFomulasName",
            accessorFn: (originalRow) => {
                return originalRow.coeSubjectAssessments?.[0]?.coeSubjectFormula?.name || "N/A";
            },
        },
        {
            header: "Tỷ trọng CA", accessorKey: "SubjectFomulasRate",
            accessorFn: (originalRow) => {
                const content = originalRow.coeSubjectAssessments[0]?.coeSubjectFormula?.rate ? `${originalRow.coeSubjectAssessments[0]?.coeSubjectFormula?.rate}% ` : null
                return content
            },
        },
        {
            header: "Nội dung đánh giá", accessorKey: "SubjectAssessmentsContent",
            accessorFn: (originalRow) => {
                return originalRow.coeSubjectAssessments[0]?.content
            }
        },
        {
            header: "CLOi", accessorKey: "coeSubjectAssessmentCLO",
            accessorFn: (originalRow) => {
                return originalRow.coeSubjectAssessments[0]?.coeSubjectAssessmentCLOs
                    ?.map(item => item.name)
                    .join(", ") || ""
            },
        },
        {
            header: "Thời điểm đánh giá", accessorKey: "SubjectAssessmentsAssessmentWhen",
            accessorFn: (originalRow) => {
                return originalRow.coeSubjectAssessments[0]?.assessmentWhen
            }
        },
        {
            header: "Phương pháp đánh giá", accessorKey: "SubjectAssessmentsMethod",
            accessorFn: (originalRow) => {
                return ENUM_QUESTION_TYPE[originalRow.coeSubjectAssessments[0]?.questionType]
            },
        },
        {
            header: "Loại công cụ đánh giá", accessorKey: "assessmentTool",
            accessorFn: (originalRow) => {
                return ENUM_ASSESSMENT_TOOL[originalRow.coeSubjectAssessments[0]?.assessmentTool]
            }
        },
        {
            header: "Thời gian đánh giá", accessorKey: "SubjectAssessmentsAssessmentDuration",
            accessorFn: (originalRow) => {
                return originalRow.coeSubjectAssessments[0]?.assessmentDuration
            }
        },
        {
            header: "Số câu hỏi", accessorKey: "totalQuestion",
            accessorFn: (originalRow) => {
                return originalRow.coeSubjectAssessments[0]?.totalQuestion
            }
        },
        {
            header: "Cấu trúc đề thi", accessorFn: (originalRow) => {
                if (originalRow.coeSubjectAssessments[0]?.id) {
                    return <F_vq720hj9jx_Details id={originalRow.coeSubjectAssessments[0]?.id} />
                }
            },
        },
        { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (originalRow) => U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!)),
        },
    ], [AllQuery.data]);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "SubjectCode", header: "Mã môn học" },
            { fieldName: "SubjectName", header: "Tên môn học" },
            { fieldName: "SubjectFomulasRate", header: "Hình thức đánh giá" },
            { fieldName: "CoeSubjectFomulasCode", header: "Tỷ trọng CA" },
            { fieldName: "SubjectAssessmentsContent", header: "Nội dung đánh giá" },
            { fieldName: "coeSubjectAssessmentCLO", header: "CLOi" },
            { fieldName: "SubjectAssessmentsAssessmentWhen", header: "Thời điểm đánh giá" },
            { fieldName: "SubjectAssessmentsAssessmentDuration", header: "Thời gian đánh giá" },
            { fieldName: "SubjectAssessmentsTotalQuestion", header: "Số câu hỏi" },
            { fieldName: "SubjectAssessmentsQuestionType", header: "Số câu đã nhập" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    useEffect(() => {
        if (store.state?.noData) {
            setSubjectAssessment([])
        } else {
            AllQuery.refetch()
        }
    }, [store.state?.noData]);

    if (AllQuery.isLoading) return "Loading...";
    if (AllQuery.isError) return "Không có dữ liệu...";

    return (
        <MyFlexColumn>
            {
                store.state.grade?.code ? <Text> Danh sách cấu trúc đề thi các Môn học thuộc chương trình đào tạo - Khóa học <b>{store.state.grade?.code}</b></Text> : null
            }
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <AQButtonExportData
                                    isAllData={true}
                                    objectName="dsCauTrucDeThi"
                                    data={AllQuery.data!}
                                    exportConfig={exportConfig}
                                />
                            </Group>
                        </>
                    )
                }}
                columns={columns}
                data={subjectAssessment || []}
            />
        </MyFlexColumn >
    );
}
