"use client"
import { MyActionIconModal } from '@/components/ActionIcons/ActionIconModal/MyActionIconModal';
import { MyButton } from '@/components/Buttons/Button/MyButton';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import useM_COEClass_update from '@/hooks/mutation-hooks/COEClass/useM_COEClass_Update';
import useQ_COEGrade_GetAll from '@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetAll';
import { utils_notification_show } from '@/utils/notification';
import { Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';


export default function F_4ltk4f68a8_Update({ data }: { data: ICOEClass }) {
    const [fileData, setFileData] = useState<any[]>([]);
    const disc = useDisclosure()
    const courseSectionMutation = useM_COEClass_update()
    const gradeQuery = useQ_COEGrade_GetAll()
    const queryClient = useQueryClient()
    const form = useForm<ICOEClass>({
        initialValues: data,
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',

        }
    });

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData });
    }, [fileData]);

    return (
        <Group>
            <MyActionIconModal
                disclosure={disc}
                crudType='update'
            >
                <form onSubmit={form.onSubmit(value => {
                    const body = {
                        id: value.id,
                        code: value.code,
                        name: value.name,
                        note: value.note,
                        concurrencyStamp: value.concurrencyStamp,
                        isEnabled: true,
                        coeGradeId: value.coeGradeId,
                    }

                    courseSectionMutation.mutate(body, {
                        onSuccess: () => {
                            utils_notification_show({ crudType: 'update' })
                            disc[1].close()
                        }
                    })
                })}>

                    <MyTextInput disabled label="Mã lớp" {...form.getInputProps("code")} />
                    <MyTextInput label="Tên lớp" {...form.getInputProps("name")} />
                    <MySelect label="Khóa" data={gradeQuery.data?.map(e => (
                        {
                            value: e.id!.toString(),
                            label: e?.name || ''
                        }
                    )) || []}
                        defaultValue={form.values.coeGradeId?.toString()}
                        onChange={(value) => form.setFieldValue("coeGradeId", parseInt(value?.toString()!))} />
                    <Textarea label="Ghi chú" {...form.getInputProps("note")} value={form.values.note || ''} />
                    <Group grow mt={5}>
                        <MyButton crudType="update" type="submit" />
                    </Group>
                </form>
            </MyActionIconModal>
        </Group>
    );
}
