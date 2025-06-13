"use client"
import baseAxios from '@/api/baseAxios';
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

interface IUpdateSubjectGroup {
    code?: string; // Mã nhóm môn học
    name?: string; // Tên nhóm môn học
    note?: string; // Ghi chú
}

export default function F_zudcgcvda8_Update({ data }: { data: IUpdateSubjectGroup }) {
    const form = useForm<IUpdateSubjectGroup>({
        initialValues: data,
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống'
        }
    });

    useEffect(() => {
        form.setValues({ ...data });
    }, [data]);

    return (
        <Group>
            <MyActionIconUpdate
                form={form}
                onSubmit={async (values) => {
                    await baseAxios.post(`/COESubjectGroup/Update`, { ...values });
                }}
            >
                <MyTextInput disabled label="Mã nhóm môn học" {...form.getInputProps("code")} />
                <MyTextInput label="Tên nhóm môn học" {...form.getInputProps("name")} />
                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyActionIconUpdate>
        </Group>
    );
}