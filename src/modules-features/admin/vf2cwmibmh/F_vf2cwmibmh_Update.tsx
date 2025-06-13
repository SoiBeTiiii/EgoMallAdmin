'use client';
import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { useEffect } from "react";
import { I_vf2cwmibmh_Read } from './F_vf2cwmibmh_Read';

export default function F_vf2cwmibmh_Update({ values }: { values: I_vf2cwmibmh_Read }) {
    const form = useForm<I_vf2cwmibmh_Read>({
        initialValues: {
            ...values,
        },
        validate: {
            code: (value) => value ? null : "Không được để trống",
            name: (value) => value ? null : "Không được để trống",
        }
    });

    useEffect(() => {
        form.setValues({ ...values });
    }, [values]);

    return (
        <MyActionIconUpdate form={form} onSubmit={async (values) => {
            console.log(values);
            return await baseAxios.post("/COETrainingLevel/Update", {
                ...values,
            })
        }} >
            <MyTextInput disabled label="Mã bậc" {...form.getInputProps("code")} />
            <MyTextInput label="Tên bậc" {...form.getInputProps("name")} />
            <MyTextInput label="Tên bậc Eg" {...form.getInputProps("nameEg")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </MyActionIconUpdate>);
}
