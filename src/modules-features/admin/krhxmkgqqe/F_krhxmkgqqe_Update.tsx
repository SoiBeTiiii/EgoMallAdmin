'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
export interface I {
    id?: number; // STT
    courseCode?: string; // Mã chương trình
    name?: string //Tên chương trình
    khoaQuanLyId?:number;
    khoaQuanLy?: string; // Khoa quản lý
}

export default function F_krhxmkgqqe_Update({ doituong }: { doituong: I }) {
    const form = useForm<I>({
        initialValues: doituong
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label='Mã chương trình' {...form.getInputProps("courseCode")} readOnly />
            <MyTextInput label='Tên chương trình' {...form.getInputProps("name")} />
            <Select
                label="Khoa quản lý"
                data={[
                    { value: "1", label: "Khoa công nghệ thông tin" },
                    { value: "2", label: "Khoa ngoại ngữ" },
                    { value: "3", label: "Khoa kinh tế" },
                ]}
                defaultValue={form.values.khoaQuanLyId?.toString()}
                onChange={(value) => form.setFieldValue("khoaQuanLyId", parseInt(value?.toString()!))}
            />

            <MyTextInput label='Ghi chú' {...form.getInputProps("ghiChu")} />

        </MyActionIconUpdate>
    )
}