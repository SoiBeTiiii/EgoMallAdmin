"use client"
import baseAxios from '@/api/baseAxios';
import { ActionIcon, Button, Modal, MultiSelect, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconEdit } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ICOESubjectMethods, IGSAssessment } from '../TabAssessment/Interfaces';
import { IGSFormula } from '../TabFormula/Interfaces';
import { IGSAssessmentUpdateModel, IGSCLO } from './Interfaces';

enum formulaType {
    "Chuyên cần" = 1,
    "Quá trình" = 2,
    "Cuối kỳ" = 3
}

export default function GSAssessmentUpdateActionIcon({ GSAssessmentValues, gradeSubjectId }: { GSAssessmentValues?: IGSAssessment, gradeSubjectId?: number }) {
    const queryClient = useQueryClient();
    const discUpdateModal = useDisclosure(false);
    const allGSFormulas = useQuery<IGSFormula[]>({
        queryKey: [`GSFormulaTableByGradeSubjectId${gradeSubjectId}`],
        queryFn: async () => {
            if (!gradeSubjectId) return [];
            const response = await baseAxios.get(`/COESubjectFormula/FindByGradeSubject?coeGradeSubjectId=${gradeSubjectId}`);
            return response.data.data || [];
        },
        enabled: discUpdateModal[0],
    })

    const allGSCLOs = useQuery<IGSCLO[]>({
        queryKey: [`GSCLOByGradeSubjectId${gradeSubjectId}`],
        queryFn: async () => {
            if (!gradeSubjectId) return [];
            const response = await baseAxios.get(`/COECLO/GetCLOBygradeSubjectId?gradeSubjectId=${gradeSubjectId}`);
            return response.data.data || [];
        },
        enabled: discUpdateModal[0],
    })

    const [selectedCLO, setSelectedCLO] = useState<string[]>(GSAssessmentValues?.coeSubjectMethods?.map((item) => item.coecloId!.toString()) || []);
    const form = useForm<IGSAssessmentUpdateModel>({
        initialValues: {
            id: GSAssessmentValues?.id!,
            code: GSAssessmentValues?.code ? GSAssessmentValues?.code : null,
            name: GSAssessmentValues?.name ? GSAssessmentValues?.name : null,
            concurrencyStamp: GSAssessmentValues?.concurrencyStamp ? GSAssessmentValues?.concurrencyStamp : 'string',
            isEnabled: GSAssessmentValues?.isEnabled!,
            coeGradeSubjectId: GSAssessmentValues?.coeGradeSubjectId!,
            coeSubjectFormulaId: GSAssessmentValues?.coeSubjectFormulaId ? GSAssessmentValues?.coeSubjectFormulaId : null,
            content: GSAssessmentValues?.content ? GSAssessmentValues?.content : '',
            assessmentWhen: GSAssessmentValues?.assessmentWhen ? GSAssessmentValues?.assessmentWhen : '',
            assessmentDuration: GSAssessmentValues?.assessmentDuration ? GSAssessmentValues?.assessmentDuration : '',
            assessmentTool: GSAssessmentValues?.assessmentTool ? GSAssessmentValues?.assessmentTool : null,
            questionType: GSAssessmentValues?.questionType ? GSAssessmentValues?.questionType : null,
            coeSubjectMethods: GSAssessmentValues?.coeSubjectMethods ? GSAssessmentValues?.coeSubjectMethods : [],
        },
        validate: {
            // rate: (value) => value == 0 ? 'Không được để trống' : null,
            // AssessmentType: (value) => value ? null : 'Không được để trống',
        }
    })

    const mutateGSAssessment = useMutation({
        mutationFn: async (values: IGSAssessmentUpdateModel) => {
            let response = await baseAxios.post('/COESubjectAssessment/Update', values)
            if (response.data.isSuccess === 1) {
                notifications.show({
                    title: 'Thao tác thành công',
                    message: 'Dữ liệu đã được lưu',
                    color: 'green',
                })
            }

            if (response.data.isSuccess !== 1) {
                notifications.show({
                    title: 'Thao tác thất bại',
                    message: 'Dữ liệu chưa được lưu',
                    color: 'red',
                })
            }
        },
        onSuccess: (response) => {
            // form.reset();
            // setSelectedCLO([]);
            queryClient.invalidateQueries({
                queryKey: [`GSAssessmentTableByGradeSubjectId${gradeSubjectId}`]
            });
            discUpdateModal[1].close();
        },
        onError: () => {
            //todo
        },
    });

    const handleOnClickUpdateButton = () => {
        discUpdateModal[1].open();
    }

    const handleOnSubmitUpdateForm = async (values: IGSAssessmentUpdateModel) => {
        handleUpdateSelectedCLO();
        // console.log('update body: ', form.getValues());
        // console.log('update body: ', values);


        mutateGSAssessment.mutate(form.getValues());
    }

    const handleUpdateSelectedCLO = () => {
        const selectedCLOIds = selectedCLO.map(id => parseInt(id));

        // Create a map of existing CLO methods
        const existingCLOMap = form.values.coeSubjectMethods!.reduce((map, method) => {
            if (method.coecloId) {
                map[method.coecloId] = method;
            }
            return map;
        }, {} as Record<number, ICOESubjectMethods>);

        const updatedMethods = [];

        // Handle existing methods (updating isEnabled based on selection)
        for (const existingMethod of form.getValues().coeSubjectMethods!) {
            if (existingMethod.coecloId) {
                const isStillSelected = selectedCLOIds.includes(existingMethod.coecloId);
                updatedMethods.push({
                    ...existingMethod,
                    isEnabled: isStillSelected
                });
            }
        }

        // Add new CLO methods
        for (const cloId of selectedCLOIds) {
            if (!existingCLOMap[cloId]) {
                updatedMethods.push({
                    id: 0,
                    code: null,
                    name: null,
                    concurrencyStamp: 'string',
                    isEnabled: true,
                    coeSubjectAssessmentId: form.values.id,
                    coecloId: cloId,
                    questionQuantity: 0,
                    maxPoint: 0,
                });
            }
        }

        form.setFieldValue("coeSubjectMethods", updatedMethods);
    }

    return (
        <>
            <ActionIcon
                variant="light"
                radius="sm"
                color='yellow'
                onClick={handleOnClickUpdateButton}
            >
                <IconEdit />
            </ActionIcon>
            <Modal
                opened={discUpdateModal[0]}
                onClose={discUpdateModal[1].close}
                title="Chi tiết nội dung đánh giá"
            >
                <form onSubmit={form.onSubmit((values) => {
                    handleOnSubmitUpdateForm(values);
                })}>
                    <Select
                        clearable
                        placeholder='Chọn hình thức đánh giá'
                        label='Hình thức đánh giá'
                        data={
                            allGSFormulas.data?.map((item) => (
                                {
                                    value: item.id?.toString() || "",
                                    label: formulaType[item.formulaType!],
                                }
                            )) || []
                        }
                        value={form.values.coeSubjectFormulaId?.toString()}
                        onChange={(value) => form.setFieldValue("coeSubjectFormulaId", parseInt(value!))}
                    />
                    <TextInput
                        placeholder='Nhập nội dung đánh giá'
                        label='Nội dung đánh giá'
                        {...form.getInputProps('content')}
                    />
                    <TextInput
                        placeholder='Nhập thời điểm đánh giá'
                        label='Thời điểm đánh giá'
                        {...form.getInputProps('assessmentWhen')}
                    />
                    <Select
                        clearable
                        placeholder='Chọn phương pháp đánh giá'
                        label='Phương pháp đánh giá'
                        data={[
                            { value: "1", label: "Trắc nghiệm" },
                            { value: "2", label: "Tự luận" },
                            { value: "3", label: "Trắc nghiệm + Tự luận" },
                            { value: "4", label: "Tiểu luận" },
                            { value: "5", label: "Vấn đáp" },
                        ]}
                        value={form.values.questionType?.toString()}
                        onChange={(value) => form.setFieldValue("questionType", parseInt(value!))}
                    />
                    <MultiSelect
                        clearable
                        placeholder='Chọn CLO'
                        label='CLO'
                        data={
                            allGSCLOs.data?.map((item) => (
                                {
                                    value: item.id?.toString() || "",
                                    label: item.code!,
                                }
                            )) || []
                        }
                        value={selectedCLO}
                        onChange={(setSelectedCLO)}
                    />
                    <TextInput
                        placeholder='Nhập thời gian đánh giá'
                        label='Thời gian đánh giá'
                        {...form.getInputProps('assessmentDuration')}
                    />
                    <Select
                        clearable
                        placeholder='Chọn công cụ đánh giá'
                        label='Loại công cụ đánh giá'
                        data={[
                            { value: "1", label: "Rubrics" },
                        ]}
                        value={form.values.assessmentTool?.toString()}
                        onChange={(value) => form.setFieldValue("assessmentTool", parseInt(value!))}
                    />
                    <Button mt={32} w={"100%"} type="submit">Lưu</Button>
                </form>
            </Modal>
        </>
    )
}

