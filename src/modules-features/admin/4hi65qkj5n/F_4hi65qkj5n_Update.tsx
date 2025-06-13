'use client';

import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface I_TrainingSystem {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    nameEg: string;
    note: string;
    updatedBy?: string;
    updatedAt?: Date | undefined;
}

export default function F_4hi65qkj5n_Update({ values }: { values: I_TrainingSystem }) {
    const form = useForm<I_TrainingSystem>({
        mode: "uncontrolled",
        initialValues: values,
        validate: {
            code: (value) => (value.trim().length > 0 ? null : "Không được để trống"),
            name: (value) => (value.trim().length > 0 ? null : "Không được để trống"),
        },
    });
    useEffect(() => {
        if (values) {
            form.setValues(values);
        }
    }, [values]);
    

    return (
        <MyActionIconUpdate
            form={form}
            onSubmit={async (values) => {
                return await baseAxios.post("/COETrainingSystem/Update", values);
            }}
        >
            <MyTextInput disabled label="Mã hệ" {...form.getInputProps("code")} />
            <MyTextInput label="Tên hệ" {...form.getInputProps("name")} />
            <MyTextInput label="Tên hệ Eg" {...form.getInputProps("nameEg")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </MyActionIconUpdate>
    );
}
