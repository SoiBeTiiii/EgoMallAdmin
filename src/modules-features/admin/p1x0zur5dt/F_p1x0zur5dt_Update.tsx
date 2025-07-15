'use client';
import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Checkbox } from "@mantine/core";
import { useForm } from '@mantine/form';
import { MyDateInput } from "aq-fe-framework/components";
import { useState } from "react";

export interface I_p1x0zur5dt_Update {
    id: number;
    title: string;
    image_url: string;
    link_url: string;
    position: string;
    start_date: string;   // ISO format date string, e.g., "2025-06-18T00:00:00Z"
    end_date: string;     // ISO format date string
    status: boolean;      // hoặc number nếu trong DB bạn dùng 0/1 thay vì true/false
    created_at: string;   // ISO format date string
    update_at: string;    // ISO format date string
}

export default function F_p1x0zur5dt_Update({ values }: { values: I_p1x0zur5dt_Update }) {
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<I_p1x0zur5dt_Update>({
        initialValues:values,
        validate: {
        }
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={async (values) => {
                    console.log("Thêm thành công: ", form.values);
                    await baseAxios.put(`/banners/update/${form.values.id}`, form.values);

                    }}
                >
                    <MyTextInput label="Tiêu đề" {...form.getInputProps("title")} error={form.errors.name}/>
                    <MyTextInput label="Image URL" {...form.getInputProps("image_url")} />
                    <MyTextArea label="Link URL" {...form.getInputProps("link_url")} />
                    <MyTextInput label="Vị trí" {...form.getInputProps("position")} />
                    <MyDateInput label="Ngày bắt đầu" {...form.getInputProps("start_date")} />
                    <MyDateInput label="Ngày kết thúc" {...form.getInputProps("end_date")} />
                    <Checkbox label="Trạng thái" {...form.getInputProps("status")} />
        </MyActionIconUpdate>);
}
