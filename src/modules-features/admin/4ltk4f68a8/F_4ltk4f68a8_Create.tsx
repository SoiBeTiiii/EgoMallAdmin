"use client"
import { MyButton } from '@/components/Buttons/Button/MyButton';
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import useM_COEClass_Create, { ICOEClass_Create } from '@/hooks/mutation-hooks/COEClass/useM_COEClass_Create';
import useQ_COEGrade_GetAll from '@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetAll';
import { utils_notification_show } from '@/utils/notification';
import { Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';

export default function F_4ltk4f68a8_Create() {
    const disc = useDisclosure()
    const [fileData, setFileData] = useState<any[]>([]);
    const courseSectionMutation = useM_COEClass_Create()
    const gradeQuery = useQ_COEGrade_GetAll()
    const form = useForm<ICOEClass_Create>({
        initialValues: {
            code: "",
            name: "",
            // note: ""
        },
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
            <MyButtonModal
                crudType='create'
                title='Thêm lớp' disclosure={disc}>
                <form onSubmit={form.onSubmit(value => {
                    courseSectionMutation.mutate(value, {
                        onSuccess: () => {
                            utils_notification_show({ crudType: 'create', })
                            form.reset()
                            disc[1].close()
                        }
                    })
                })}>

                    <MyTextInput label="Mã lớp" {...form.getInputProps("code")} />
                    <MyTextInput label="Tên lớp" {...form.getInputProps("name")} />
                    <MySelect label="Khóa" data={gradeQuery.data?.map(e => ({ value: e.id!.toString(), label: e?.name || '' })) || []}
                        defaultValue={1?.toString()}
                        onChange={(value) => form.setFieldValue("coeGradeId", parseInt(value?.toString()!))} />
                    <Textarea label="Ghi chú" {...form.getInputProps("note")} />
                    <Group grow mt={5}>

                        <MyButton crudType="create" type="submit" />
                    </Group>
                </form>
            </MyButtonModal>
        </Group>
    );
}