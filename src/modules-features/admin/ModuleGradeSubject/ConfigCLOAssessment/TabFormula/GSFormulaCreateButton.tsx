"use client"
import baseAxios from '@/api/baseAxios';
import { Button, Modal, NumberInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface ICOESubjectFormulaCreateModel {
    id?: number;
    code: string | null;
    name: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
    coeGradeSubjectId?: number | null;
    formulaType?: number | null;
    rate: number | null;
}

export default function GSFormulaCreateButton({ gradeSubjectId }: { gradeSubjectId?: number }) {
    const queryClient = useQueryClient();
    const discCreateModal = useDisclosure(false);
    const form = useForm<ICOESubjectFormulaCreateModel>({
        initialValues: {
            id: 0,
            code: 'gsf',
            name: 'gsf',
            concurrencyStamp: 'string',
            isEnabled: true,
            coeGradeSubjectId: gradeSubjectId ? gradeSubjectId : null,
            rate: 0,
            formulaType: null,
        },
        validate: {
            // rate: (value) => value == 0 ? 'Không được để trống' : null,
            // formulaType: (value) => value ? null : 'Không được để trống',
        }
    })

    const mutateGSFormula = useMutation({
        mutationFn: async (values: ICOESubjectFormulaCreateModel) => {
            let response = await baseAxios.post('/COESubjectFormula/Create', values)
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
                queryKey: [`GSFormulaTableByGradeSubjectId${gradeSubjectId}`]
            });
            form.reset();
            discCreateModal[1].close();
        },
        onError: () => {
            //todo
        },
    });

    const handleOnClickCreateButton = () => {
        discCreateModal[1].open();
    }

    const handleOnSubmitCreateForm = async (values: ICOESubjectFormulaCreateModel) => {
        mutateGSFormula.mutate(values);
    }

    return (
        <>
            <Button onClick={handleOnClickCreateButton}>Thêm</Button>
            <Modal
                opened={discCreateModal[0]}
                onClose={discCreateModal[1].close}
                title="Thêm chi tiết CA"
            >
                <form onSubmit={form.onSubmit((values) => {
                    handleOnSubmitCreateForm(values);
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

