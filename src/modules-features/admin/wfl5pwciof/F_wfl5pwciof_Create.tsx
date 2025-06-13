"use client"
import baseAxios from '@/api/baseAxios';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import { Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { I_MITScale, I_SubjectGroup, I_SubjectGroupMITScale } from './F_wfl5pwciof_Read';


export default function F_wfl5pwciof_Create() {
    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<I_SubjectGroupMITScale>({
        initialValues: {
            coeSubjectGroupId: 0,
            coemitScaleId: 0
        },
        validate: {
            coeSubjectGroupId: (value) => value ? null : 'Vui lòng chọn nhóm môn học',
            coemitScaleId: (value) => value ? null : 'Vui lòng chọn mức năng lực',
        }
    });

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const subjectGroupsQuery = useQuery<I_SubjectGroup[]>({
        queryKey: ["COESubjectGroup"],
        queryFn: async () => {
            const response = await baseAxios.get("/COESubjectGroup/getall");
            return response.data.data;
        },
    });

    const mitScalesQuery = useQuery<I_MITScale[]>({
        queryKey: ["COEMITScale"],
        queryFn: async () => {
            const response = await baseAxios.get("/COEMITScale/getall");
            return response.data.data;
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
                    return await baseAxios.post("/COESubjectGroupMITScale/create", {
                        ...values,
                    })
                }}
            >
                <MySelect
                    label="Nhóm môn học"
                    data={subjectGroupsQuery.data?.map((item) => ({ value: item.id?.toString() || '', label: `${item.code} - ${item.name}` })) || []}
                    defaultValue={form.values.coeSubjectGroupId?.toString()}
                    onChange={(value) => form.setFieldValue("coeSubjectGroupId", parseInt(value?.toString()!))}
                    error={form.errors.coeSubjectGroupId}
                />
                <MySelect
                    label="Mức năng lực"
                    data={mitScalesQuery.data?.map((item) => ({ value: item.id?.toString() || '', label: `${item.code} - ${item.name}` })) || []}
                    defaultValue={form.values.coemitScaleId?.toString()}
                    onChange={(value) => form.setFieldValue("coemitScaleId", parseInt(value?.toString()!))}
                    error={form.errors.coemitScaleId}
                />
            </MyButtonCreate>
        </Group>
    );
}