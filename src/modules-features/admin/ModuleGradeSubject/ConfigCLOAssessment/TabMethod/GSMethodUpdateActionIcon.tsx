"use client"
import baseAxios from '@/api/baseAxios';
import { ActionIcon, Button, Modal, NumberInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconEdit } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IGSCLO } from '../TabAssessment/Interfaces';
import { IGSMethod, IGSMethodUpdateModel } from './Interfaces';

enum formulaType {
    "Chuyên cần" = 1,
    "Quá trình" = 2,
    "Cuối kỳ" = 3
}

export default function GSAssessmentUpdateActionIcon({ GSMethodValues, gradeSubjectId, assessmentId }: { GSMethodValues?: IGSMethod, gradeSubjectId?: number, assessmentId?: number | null }) {
    const queryClient = useQueryClient();
    const discUpdateModal = useDisclosure(false);

    const allGSCLOs = useQuery<IGSCLO[]>({
        queryKey: [`GSCLOByGradeSubjectId${gradeSubjectId}`],
        queryFn: async () => {
            if (!gradeSubjectId) return [];
            const response = await baseAxios.get(`/COECLO/GetCLOBygradeSubjectId?gradeSubjectId=${gradeSubjectId}`);
            return response.data.data || [];
        },
        enabled: discUpdateModal[0],
        refetchOnWindowFocus: false,
    })

    const form = useForm<IGSMethodUpdateModel>({
        initialValues: {
            id: GSMethodValues?.id,
            code: GSMethodValues?.code,
            name: GSMethodValues?.name,
            concurrencyStamp: GSMethodValues?.concurrencyStamp,
            isEnabled: GSMethodValues?.isEnabled,
            coeSubjectAssessmentId: GSMethodValues?.coeSubjectAssessmentId,
            coecloId: GSMethodValues?.coecloId,
            questionQuantity: GSMethodValues?.questionQuantity,
            maxPoint: GSMethodValues?.maxPoint,
        },
        validate: {
            // rate: (value) => value == 0 ? 'Không được để trống' : null,
            // AssessmentType: (value) => value ? null : 'Không được để trống',
        }
    })

    const mutateGSAssessment = useMutation({
        mutationFn: async (values: IGSMethodUpdateModel) => {
            let response = await baseAxios.post('/COESubjectMethod/Update', form.getValues())
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
            queryClient.invalidateQueries({
                queryKey: [`COESubjectMethodByAssessment`, assessmentId]
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

    const handleOnSubmitUpdateForm = async (values: IGSMethodUpdateModel) => {
        // console.log('update body: ', form.getValues());
        // console.log('update body: ', values);
        mutateGSAssessment.mutate(form.getValues());
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
                        value={form.values.coecloId?.toString()}
                        onChange={(value) => form.setFieldValue("coecloId", parseInt(value!))}
                    />
                    <NumberInput
                        placeholder='Nhập số câu hỏi'
                        label='Số câu hỏi'
                        {...form.getInputProps('questionQuantity')}
                    />
                    <NumberInput
                        placeholder='Nhập điểm tối đa'
                        label='Điểm tối đa'
                        {...form.getInputProps('maxPoint')}
                    />
                    <Button mt={32} w={"100%"} type="submit">Lưu</Button>
                </form>
            </Modal>
        </>
    )
}

