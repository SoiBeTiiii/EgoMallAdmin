"use client"
import baseAxios from '@/api/baseAxios';
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';

interface IUpdateMIT {
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

export default function F_umg0mq7o3x_Update({data}:{data:IUpdateMIT}) {
    const [fileData, setFileData] = useState<any[]>([]);
    
    const form = useForm<IUpdateMIT>({
        initialValues:data,
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
    useEffect(() => {
        form.setValues(data);
    }, [data]);

    return (
        <Group>
            <MyActionIconUpdate
                form={form}
                onSubmit={async() => {
                     await baseAxios.post("COEMITScale/Update", form.values)
                }}
            >
                <MyTextInput label="Mức độ" {...form.getInputProps("name")} />
                <MyTextInput label="Mô tả" {...form.getInputProps("code")} />
                <MyTextArea label="Kiến thức" {...form.getInputProps("knowledge")} />
                <MyTextArea label="Kỹ năng" {...form.getInputProps("skill")} />
                <MyTextArea label="Tự chủ" {...form.getInputProps("autonomy")} />
            </MyActionIconUpdate>
        </Group>
    );
}