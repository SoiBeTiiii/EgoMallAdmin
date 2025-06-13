'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
export interface I {
    id?: number;
    courseCode?: string
    coCode?: string;
    cloCode?: string;
    nhomDoLuong?: string
    moTa?: string

}

export default function F_krhxmkgqqe_Create() {
    const form = useForm<I>({
        initialValues: {
            id: 0,
            courseCode: "",
            coCode: "",
            cloCode: "",
            nhomDoLuong: "",
            moTa: ""
        },
    })

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết chuẩn đầu ra môn học'>
            <MySelect data={["NNA21"]} label="Mã môn học" {...form.getInputProps("courseCode")} defaultValue="NNA01" />
            <MySelect data={["CO01"]} label="Mã CO"  {...form.getInputProps("coCode")} defaultValue="CO01" />
            <MyTextInput label="Mã CLO" {...form.getInputProps("cloCode")} />
            <MyTextInput label="Nội dung chương" {...form.getInputProps("noiDungChuong")} />
            <MyTextInput label="Mô tả" {...form.getInputProps("moTa")} />
        </MyButtonCreate>
    )
}