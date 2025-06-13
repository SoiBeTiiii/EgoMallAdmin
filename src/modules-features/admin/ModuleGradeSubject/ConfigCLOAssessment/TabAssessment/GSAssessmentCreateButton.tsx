"use client"
import baseAxios from '@/api/baseAxios';
import { Button, Modal, MultiSelect, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { IGSFormula } from '../TabFormula/Interfaces';
import { IGSAssessmentCreateModel, IGSCLO } from './Interfaces';

enum formulaType {
    "Chuyên cần" = 1,
    "Quá trình" = 2,
    "Cuối kỳ" = 3
}

export default function GSAssessmentCreateButton({ gradeSubjectId }: { gradeSubjectId?: number }) {
    const queryClient = useQueryClient();
    const discCreateModal = useDisclosure(false);
    const allGSFormulas = useQuery<IGSFormula[]>({
        queryKey: [`GSFormulaTableByGradeSubjectId${gradeSubjectId}`],
        queryFn: async () => {
            if (!gradeSubjectId) return [];
            const response = await baseAxios.get(`/COESubjectFormula/FindByGradeSubject?coeGradeSubjectId=${gradeSubjectId}`);
            return response.data.data || [];
        },
        enabled: discCreateModal[0],
    })

    const allGSCLOs = useQuery<IGSCLO[]>({
        queryKey: [`GSCLOByGradeSubjectId${gradeSubjectId}`],
        queryFn: async () => {
            if (!gradeSubjectId) return [];
            const response = await baseAxios.get(`/COECLO/GetCLOBygradeSubjectId?gradeSubjectId=${gradeSubjectId}`);
            return response.data.data || [];
        },
        enabled: discCreateModal[0],
    })
    const [selectedCLO, setSelectedCLO] = useState<string[]>([]);
    const form = useForm<IGSAssessmentCreateModel>({
        initialValues: {
            id: 0,
            code: null,
            name: null,
            concurrencyStamp: 'string',
            isEnabled: true,
            coeGradeSubjectId: gradeSubjectId!,
            coeSubjectFormulaId: null,
            content: '',
            assessmentWhen: '',
            questionType: null,
            coeSubjectMethods: [],
            assessmentDuration: '',
            assessmentTool: null,
        },
        validate: {
            // rate: (value) => value == 0 ? 'Không được để trống' : null,
            // AssessmentType: (value) => value ? null : 'Không được để trống',
        }
    })

    const mutateGSAssessment = useMutation({
        mutationFn: async (values: IGSAssessmentCreateModel) => {
            let response = await baseAxios.post('/COESubjectAssessment/Create', values)
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
            form.reset();
            setSelectedCLO([]);
            queryClient.invalidateQueries({
                queryKey: [`GSAssessmentTableByGradeSubjectId${gradeSubjectId}`]
            });
            discCreateModal[1].close();
        },
        onError: () => {
            //todo
        },
    });

    const handleOnClickCreateButton = () => {
        discCreateModal[1].open();
    }

    const handleOnSubmitCreateForm = async (values: IGSAssessmentCreateModel) => {
        let methodList = selectedCLO.map((item) => {
            return {
                id: 0,
                code: null,
                name: null,
                concurrencyStamp: 'string',
                isEnabled: true,
                coeSubjectAssessmentId: 0,
                coecloId: parseInt(item),
                questionQuantity: 0,
                maxPoint: 0,
            }
        })
        form.setFieldValue("coeSubjectMethods", methodList);
        mutateGSAssessment.mutate(form.getValues());
    }

    return (
        <>
            <Button onClick={handleOnClickCreateButton}>Thêm</Button>
            <Modal
                opened={discCreateModal[0]}
                onClose={discCreateModal[1].close}
                title="Chi tiết nội dung đánh giá"
            >
                <form onSubmit={form.onSubmit((values) => {
                    handleOnSubmitCreateForm(values);
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

