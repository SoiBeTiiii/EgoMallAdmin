'use client';
import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { I_j9ul1u9c2n_Read } from './F_j9ul1u9c2n_Read';

export default function F_j9ul1u9c2n_Update({ values }: { values: I_j9ul1u9c2n_Read }) {
    const form = useForm<I_j9ul1u9c2n_Read>({
        initialValues: {
            ...values
        },
        validate: {
            name: (value) => value ? null : 'Không được để trống',
            nameEg: (value) => value ? null : 'Không được để trống',
            regulationId: (value) => value ? null : 'Không được để trống',
        },
    });

    const GetAllRegulation = useQuery<I_j9ul1u9c2n_Read[]>({
        queryKey: ["F_j9ul1u9c2n_GetAllRegulation"],
        queryFn: async () => {
            const result = await baseAxios.get<{ data: I_j9ul1u9c2n_Read[] }>('/COERegulation/getall');
            return result.data?.data || [];
        },
    });

    useEffect(() => {
        form.setValues(values)
    }, [values]);

    return (
        <MyActionIconUpdate form={form}
            onSubmit={async (values) => {
                return await baseAxios.post("/COERegulation/update", {
                    ...values,
                })
            }}
        >
            <MyTextInput disabled label='Mã quy chế' {...form.getInputProps("code")} />
            <MyTextInput label='Tên quy chế' {...form.getInputProps("name")} />
            <MyTextInput label='Tên quy chế Eg' {...form.getInputProps("nameEg")} />
            <MySelect
                label="Trực thuộc"
                data={GetAllRegulation.data?.filter(item => item.id !== form.values.id).map((item: I_j9ul1u9c2n_Read) => ({
                    value: item.id?.toString() || "",
                    label: item.name || ""
                })) || []}
                value={form.values.regulationId?.toString() || ""}
                onChange={(value) => form.setFieldValue("regulationId", Number(value))}
                error={form.errors.regulationId}
            />
            <MyTextArea label='Ghi chú' {...form.getInputProps("note")} />
        </MyActionIconUpdate>);
}
