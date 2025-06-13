'use client';
import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Checkbox } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useState } from "react";

export interface I_f0oia066vb_Update {
    order: number | null;
    note: string;
    nameEg: string;
    point: number | null;
    isFailed: boolean;
    id: number;
    code: string | null;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;

    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

export default function F_f0oia066vb_Update({ values }: { values: I_f0oia066vb_Update }) {
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<I_f0oia066vb_Update>({
        initialValues:values,
        validate: {
            order: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            point: (value) => value ? null : 'Không được để trống',
        }
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={async (values) => {
            // console.log("Thêm thành công: ", form.values);
               await baseAxios.post("/COERatingPLO/Update", form.values)
        }}>
            <MyTextInput label='Thứ tự' required {...form.getInputProps("order")} />
            <MyTextInput label='Mức đánh giá' required {...form.getInputProps("name")} />
            <MyTextInput label='Mức đánh giá Eg' {...form.getInputProps("nameEg")} />
            <MyNumberInput label='Điểm >=' {...form.getInputProps("point")} />
            <Checkbox label="Không đạt" {...form.getInputProps("isFailed", { type: 'checkbox' })} />
            <MyTextArea label='Ghi chú' {...form.getInputProps("note")} />

        </MyActionIconUpdate>);
}
