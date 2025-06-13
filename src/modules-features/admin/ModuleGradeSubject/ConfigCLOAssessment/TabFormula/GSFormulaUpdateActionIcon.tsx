"use client"
import baseAxios from '@/api/baseAxios';
import { ActionIcon, Button, Modal, NumberInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconEdit } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IGSFormula } from './Interfaces';

export interface ICOESubjectFormulaUpdateModel {
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
    coeGradeSubjectId?: number | null;
    formulaType?: number | null;
    rate?: number | null;
}

export default function GSFormulaUpdateActionIcon({ gradeSubjectFormulaValues, gradeSubjectId }: { gradeSubjectFormulaValues: IGSFormula, gradeSubjectId?: number }) {
    const queryClient = useQueryClient();
    const discUpdateModal = useDisclosure(false);
    const form = useForm<ICOESubjectFormulaUpdateModel>({
        initialValues: {
            id: gradeSubjectFormulaValues.id!,
            code: gradeSubjectFormulaValues.code ? gradeSubjectFormulaValues.code : null,
            name: gradeSubjectFormulaValues.name ? gradeSubjectFormulaValues.name : null,
            concurrencyStamp: gradeSubjectFormulaValues.concurrencyStamp ? gradeSubjectFormulaValues.concurrencyStamp : null,
            isEnabled: gradeSubjectFormulaValues.isEnabled,
            coeGradeSubjectId: gradeSubjectFormulaValues.coeGradeSubjectId ? gradeSubjectFormulaValues.coeGradeSubjectId : null,
            rate: gradeSubjectFormulaValues.rate ? gradeSubjectFormulaValues.rate : null,
            formulaType: gradeSubjectFormulaValues.formulaType ? gradeSubjectFormulaValues.formulaType : null,
        },
        validate: {
            // rate: (value) => value == 0 ? 'Không được để trống' : null,
            // formulaType: (value) => value ? null : 'Không được để trống',
        }
    })

    const mutateGSFormula = useMutation({
        mutationFn: async (values: ICOESubjectFormulaUpdateModel) => {
            let response = await baseAxios.post('/COESubjectFormula/Update', values)
            if (response.data.isSuccess === 1) {
                notifications.show({
                    title: 'Thao tác thành công',
                    message: 'Dữ liệu đã được lưu',
                    color: 'green',
                })
                discUpdateModal[1].close();
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
                queryKey: [`GSFormulaTableByGradeSubjectId${gradeSubjectId}`]
            });
        },
        onError: () => {
            //todo
        },
    });

    const handleOnClickUpdateButton = () => {
        discUpdateModal[1].open();
    }

    const handleOnSubmitUpdateForm = async (values: ICOESubjectFormulaUpdateModel) => {
        mutateGSFormula.mutate(values);
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
                title="Thêm chi tiết CA"
            >
                <form onSubmit={form.onSubmit((values) => {
                    handleOnSubmitUpdateForm(values);
                })}>
                    <Select
                        clearable
                        placeholder='Chọn hình thức đánh giá'
                        label='Hình thức đánh giá'
                        data={[
                            { value: "1", label: "CC - Chuyên cần" },
                            { value: "2", label: "QT - Quá trình" },
                            { value: "3", label: "CK - Cuối kỳ" },
                        ]}
                        value={form.values.formulaType?.toString()}
                        onChange={(value) => form.setFieldValue("formulaType", parseInt(value!))}
                    />
                    <NumberInput
                        label="Tỷ trọng CA"
                        placeholder="Nhập tỷ trọng CA"
                        {...form.getInputProps('rate')}
                    />
                    <Button mt={32} w={"100%"} type="submit">Lưu</Button>
                </form>
            </Modal>
        </>
    )
}

