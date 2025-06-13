"use client"
import MySelect from "@/components/Combobox/Select/MySelect";
import { useForm } from '@mantine/form';
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import baseAxios from "@/api/baseAxios";
import { notifications } from "@mantine/notifications";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import useQ_COESubjectMethod_GetAll from "@/hooks/query-hooks/COESubjectMethod/useQ_COESubjectMethod_GetAll";
import useQ_COECLO_GetAll from "@/hooks/query-hooks/COECLO/useQ_COECLO_GetAll";

interface I_SubjectMethod_CreateViewModel {
    coeSubjectAssessmentId?: number;
    coecloId?: number | null;
    questionQuantity?: number;
    maxPoint?: number;
}

const createSubjectMethodCode = (subjectMethod: any[]) => {
    return"PP" + (subjectMethod[subjectMethod.length-1].id + 1);
}

const createSubjectMethodName = (subjectMethod: any[]) => {
    return"Phương pháp đánh giá " + (subjectMethod[subjectMethod.length-1].id + 1);
}

export default function F_mxmrddxhnz_Create_SubjectMethod() {
    const [fileData, setFileData] = useState<any[]>([]);
    const queryClient = useQueryClient();

    const subjectMethodQuery = useQ_COESubjectMethod_GetAll();
    const coeCLOQuery = useQ_COECLO_GetAll();

    const { data: createData, error } = useQuery({
        queryKey: ["useQ_PhuongPhapDanhGia_Create"],
        queryFn: async () => {
            const [subjectMethodRes, cloRes] = await Promise.all([
                subjectMethodQuery,
                coeCLOQuery,
            ]);

            return {
                subjectMethod: subjectMethodRes.data || [],
                coeCLO: cloRes.data || []
            };
        },
        enabled: coeCLOQuery.isSuccess && subjectMethodQuery.isSuccess
    });

    const form = useForm<I_SubjectMethod_CreateViewModel>({
        initialValues: {
            coecloId: null,
            questionQuantity: 0,
            maxPoint: 0
        },
        validate: {
            questionQuantity: (value) => {
                if (value === null || value === undefined) {
                    return 'Không được để trống'
                }

                return (value < 0) ? 'Không được bé hơn 0' : null;
            },
            maxPoint: (value) => {
                if (value === null || value === undefined) {
                    return 'Không được để trống'
                }

                return (value < 0) ? 'Không được bé hơn 0' : null;
            },
        }
    })

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData })
    }, [fileData])

    const handleSubmit = async () => {
        try {
            const createDataValues = {
                coeSubjectAssessmentId: 14,
                ...form.values,
                id: 0,
                code: createSubjectMethodCode(createData?.subjectMethod as any[]),
                name: createSubjectMethodName(createData?.subjectMethod as any[]),
                concurrencyStamp: "string",
                isEnabled: true,
            }

            baseAxios.post("/COESubjectMethod/Create", createDataValues);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MyButtonCreate
            label="Thêm"
            modalSize={"40%"}
            form={form}
            title="Chi tiết phương pháp đánh giá"
            onSubmit={handleSubmit}
        >
            <MySelect label="CLO"
                value={form.values.coecloId?.toString() ?? ''}
                data={[
                    { value: '', label: 'None' },
                    ...(createData?.coeCLO?.map((clo) => ({
                        value: clo.id?.toString() ?? '',
                        label: clo.code ?? '',
                    })) || [])
                ]}
                // da
                onChange={(value) => {
                    if (value && Number(value) > -1) {
                        form.setFieldValue("coecloId", Number(value))
                    } else {
                        form.setFieldValue("coecloId", null)
                    }
                }}
            />
            <MyNumberInput label="Số câu hỏi" {...form.getInputProps("questionQuantity")}
                error={form.errors.questionQuantity}
                hideControls 
            />
            <MyNumberInput label="Điểm tối đa" {...form.getInputProps("maxPoint")}
                error={form.errors.maxPoint}
                hideControls 
            />
        </MyButtonCreate>

    )
}

