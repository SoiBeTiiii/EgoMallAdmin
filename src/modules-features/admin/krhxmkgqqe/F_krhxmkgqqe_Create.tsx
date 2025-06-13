'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
export interface I {
    id?: number; // STT
    courseCode?: string; // Mã chương trìnhtrình
    name?: string //Tên chương trìnhtrình
    khoaQuanLy?: number; // Khoa quản lý
    ghiChu?: string
}

export default function F_krhxmkgqqe_Create() {
    const form = useForm<I>({
        initialValues: {
            courseCode: "",
            name: "",
            khoaQuanLy: 1,
            ghiChu: ""
        },
    })

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Danh mục chương trình '>
            <MyTextInput label='Mã chương trình' {...form.getInputProps("courseCode")} />
            <MyTextInput label='Tên chương trình' {...form.getInputProps("name")} />
            <Select
                label="Khoa quản lý"
                data={[
                    { value: "1", label: "Khoa công nghệ thông tin" },
                    { value: "2", label: "Khoa ngoại ngữ" },
                    { value: "3", label: "Khoa kinh tế" },
                ]}
                defaultValue={1?.toString()}
                onChange={(value) => form.setFieldValue("khoaQuanLy", parseInt(value?.toString()!))}
            />
            <MyTextInput label='Ghi chú' {...form.getInputProps("ghiChu")} />

        </MyButtonCreate>
    )
}