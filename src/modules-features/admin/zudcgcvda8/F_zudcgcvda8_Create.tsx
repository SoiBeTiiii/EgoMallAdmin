"use client"
import baseAxios from '@/api/baseAxios';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';

interface ICreateSubjectGroup {
    code?: string; // Mã nhóm môn học
    name?: string; // Tên nhóm môn học
    note?: string; // Ghi chú
}

export default function F_zudcgcvda8_Create() {
    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<ICreateSubjectGroup>({
        initialValues: {
            code: "",
            name: "",
            note: ""
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống'
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
            <MyButtonCreate
                objectName='Chi tiết Danh mục nhóm môn học'
                form={form}
                onSubmit={async (values) => {
                    const res = await baseAxios.post("/COESubjectGroup/Create",
                        {
                            ...values,
                        })

                    if (res?.data?.isSuccess === 0) {
                        notifications.show({
                            color: "red",
                            message: res?.data?.data.Code
                        })
                    }
                }}
            >
                <MyTextInput label="Mã nhóm môn học" {...form.getInputProps("code")} />
                <MyTextInput label="Tên nhóm môn học" {...form.getInputProps("name")} />
                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyButtonCreate>
        </Group>
    );
}