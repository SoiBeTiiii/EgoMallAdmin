"use client"
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useQ_COECLO_GetAll from '@/hooks/query-hooks/COECLO/useQ_COECLO_GetAll';
import baseAxios from '@/api/baseAxios';

export interface I_SubjectMethod_UpdateViewModel {
    coeSubjectAssessmentId?: number;
    coecloId?: number | null;
    questionQuantity?: number;
    maxPoint?: number;
    id: number,
    code?: string,
    name?: string,
    concurrencyStamp?: string,
    isEnabled?: boolean,
}

export default function F_mxmrddxhnz_Update_SubjectMethod({ data }: { data: I_SubjectMethod_UpdateViewModel }) {
    const [fileData, setFileData] = useState<any[]>([]);
    const queryClient = useQueryClient();

    const coeCLOQuery = useQ_COECLO_GetAll();

    const { data: cloData, error, isLoading } = useQuery({
        queryKey: ["useQ_PhuongPhapDanhGia_Update"],
        queryFn: async () => {
            const [cloRes] = await Promise.all([
                coeCLOQuery,
            ]);

            return cloRes.data || [];
        },
        enabled: coeCLOQuery.isSuccess
    });

    const form = useForm<I_SubjectMethod_UpdateViewModel>({
        initialValues: data,
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

    useEffect(() => {
        if (data) {
            form.setValues(data);
        }
    }, [data]);

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
            const updateData = {
                coeSubjectAssessmentId: form.values.coeSubjectAssessmentId,
                coecloId: form.values.coecloId,
                questionQuantity: form.values.questionQuantity,
                maxPoint: form.values.maxPoint,
                id: form.values.id,
                code: form.values.code,
                name: form.values.name,
                concurrencyStamp: form.values.concurrencyStamp,
                isEnabled: form.values.isEnabled,
            }

            await baseAxios.post("/COESubjectMethod/Update", updateData);

            queryClient.invalidateQueries({ queryKey: ["useQ_PhuongPhapDanhGia_Read"] });
        } catch (error) {
            console.log(error);
        };
    }

    return (
        <Group>
            <MyActionIconUpdate form={form} onSubmit={handleSubmit} >
                <MySelect label="CLO"
                    defaultValue={form.values.coecloId?.toString() ?? ''}

                    data={
                        [
                        { value: '', label: 'None' },
                        ...cloData?.map((clo) => ({
                            value: clo.id?.toString() ?? '',
                            label: clo.code ?? '',
                          })) || []
                    ]}
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

            </MyActionIconUpdate>
        </Group>
    )
}

