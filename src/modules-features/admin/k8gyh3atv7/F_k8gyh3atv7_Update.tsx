import baseAxios from "@/api/baseAxios"
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyCheckbox from "@/components/Checkbox/MyCheckbox"
import ImageUploaderBox from "@/components/ImageUploaderBox/brands/ImageUploaderBox"
import { Box, Checkbox } from "@mantine/core"
import { useForm } from "@mantine/form"
import { MyTextArea, MyTextInput } from "aq-fe-framework/components"
import { useState } from "react"

export interface I_k8gyh3atv7_Update {
    id: number;
    name: string;
    description: string;
    estimated_time: string;
    is_active: boolean;
    is_default: boolean;
    created_at?: string; // dạng ISO hoặc datetime string
}

export default function F_k8gyh3atv7_Update({ values }: { values: I_k8gyh3atv7_Update }) {
    const form = useForm<I_k8gyh3atv7_Update>({
        initialValues: values,
        validate: {
            name: (value) =>
                value.trim().length === 0 ? "Vui lòng nhập phương thức giao hàng" : null,
            description: (value) =>
                value.trim().length < 10
                    ? "Mô tả phải có ít nhất 10 ký tự"
                    : null,
            estimated_time: (value) =>
                value.trim().length === 0
                    ? "Vui lòng nhập thời gian giao hàng"
                    : !/^[0-9]+( ngày| giờ| phút)?$/i.test(value.trim())
                        ? "Thời gian giao hàng không hợp lệ (vd: '3 ngày')"
                        : null,
        },
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={async (values) => {
            await baseAxios.put(`/shipping-methods/${form.values.id}`, form.values);
        }}>
            <MyTextInput label="Phương thức giao hành" {...form.getInputProps("name")} />
            <MyTextArea label="Mô tả" {...form.getInputProps("description")} />
            <MyTextInput label="Thời gian giao hàng" {...form.getInputProps("estimated_time")} />
            <MyCheckbox label="Trạng thái" {...form.getInputProps("is_active", { type: "checkbox" })} />
            <MyCheckbox label="Giao hàng tiêu chuẩn" {...form.getInputProps("is_default", { type: "checkbox" })} />
        </MyActionIconUpdate>
    )
}