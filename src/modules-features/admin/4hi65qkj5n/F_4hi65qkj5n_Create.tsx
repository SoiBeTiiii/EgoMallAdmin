'use client'
import baseAxios from '@/api/baseAxios'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { useForm } from '@mantine/form'

interface I {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    nameEg: string;
    note: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
interface I_4hi65qkj5n_Read extends I {
    file?: File
}

export default function F_4hi65qkj5n_Create() {
    const form = useForm<I_4hi65qkj5n_Read>({
        mode: "uncontrolled", // Chuyển từ "uncontrolled" -> "controlled"
        initialValues: {
            id: 0,
            code: "",
            name: "",
            concurrencyStamp: "",
            isEnabled: true,
            nameEg: "",
            note: "",
        },
        validate: {
            code: (value) => (value.trim().length > 0 ? null : "không được để trống"),
            name: (value) => (value.trim().length > 0 ? null : "không được để trống"),
        }
    });


    return (
        <MyButtonCreate objectName='Chi tiết Danh mục hệ đào tạo' form={form} onSubmit={async (values) => {
            return await baseAxios.post("/COETrainingSystem/Create", values)
        }}>
            <MyTextInput label='Mã hệ' {...form.getInputProps("code")} error={form.errors.code} />
            <MyTextInput label='Tên hệ' {...form.getInputProps("name")} error={form.errors.name} />
            <MyTextInput label='Tên hệ Eg' {...form.getInputProps("nameEg")} />
            <MyTextArea label='Ghi chú' {...form.getInputProps("note")} />
        </MyButtonCreate>
    )
}
