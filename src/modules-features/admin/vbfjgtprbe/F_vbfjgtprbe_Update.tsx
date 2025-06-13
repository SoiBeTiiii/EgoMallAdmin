'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';

export interface I {
    id?: number;
    coCode?: string;
    cloCode?: string;
    nhomDoLuong?: string
    moTa?: string
    maMonHoc?: string
}

export default function F_krhxmkgqqe_Create({ obj }: { obj: I }) {
    const form = useForm<I>({
        initialValues: obj
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MySelect disabled data={["NNA21", obj.maMonHoc || ""]} label="Mã môn học" {...form.getInputProps("maMonHoc")} readOnly />
            <MySelect data={["CO01"]} label="Mã CO" {...form.getInputProps("coCode")} readOnly />
            <MyTextInput label="Mã CLO" {...form.getInputProps("cloCode")} readOnly />
            <MyTextInput label="Nội dung chương" {...form.getInputProps("noiDungChuong")} />
            <MyTextInput label="Mô tả" {...form.getInputProps("moTa")} />

        </MyActionIconUpdate>
    )
}