'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

interface I {
    code?: string,
    name?: string,
    notes?: string
}

export default function CreateTemplate() {
    const form = useForm<I>({
        initialValues: {
            code: "",
            name: "",
            notes: ""
        }
    })
    return (
        <MyButtonCreate objectName="cấp đề tài" form={form} onSubmit={() => { }}>
            <MyTextInput label="Mã" {...form.getInputProps("code")} />
            <MyTextInput label="Tên" {...form.getInputProps("name")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
        </MyButtonCreate>
    )
}
