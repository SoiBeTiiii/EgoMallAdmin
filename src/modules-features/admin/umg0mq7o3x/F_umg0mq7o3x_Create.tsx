"use client"
import baseAxios from '@/api/baseAxios';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';

interface ICreateMIT {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    knowledge?: string;
    skill?: string;
    autonomy?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

export default function F_umg0mq7o3x_Create() {
    const [fileData, setFileData] = useState<any[]>([]);
    
    const form = useForm<ICreateMIT>({
        initialValues: {
            id: 0,
            name: "",
            code: "",
            knowledge: "",
            skill: "",
            autonomy: "",
            concurrencyStamp: '',
            isEnabled: true
        },
        validate: {
            name: (value) => value ? null : 'Không được để trống',
            code: (value) => value ? null : 'Không được để trống',
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
                objectName='Chi tiết Danh mục thang đo năng lực (MIT)'
                form={form}
                onSubmit={async(values) => {
                   await baseAxios.post("COEMITScale/Create", form.values)
                }}
            >
                <MyTextInput label="Mức độ" {...form.getInputProps("name")} />
                <MyTextInput label="Mô tả" {...form.getInputProps("code")} />
                <MyTextArea label="Kiến thức" {...form.getInputProps("knowledge")} />
                <MyTextArea label="Kỹ năng" {...form.getInputProps("skill")} />
                <MyTextArea label="Tự chủ" {...form.getInputProps("autonomy")} />
            </MyButtonCreate>
        </Group>
    );
}