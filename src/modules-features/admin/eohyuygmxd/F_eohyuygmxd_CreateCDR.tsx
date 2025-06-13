'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MySelect from '@/components/Combobox/Select/MySelect'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { useForm } from '@mantine/form'


interface IPIs {
    code?: string
    nganh?: string
    maChuanDauRa?: string
    nhomDoLuong?: string
    moTa?: string
}
export default function F_euvqpsrtts_Create() {
    const form = useForm<IPIs>({
        initialValues: {
            code: 'NNA21',
            nganh: "Ngôn ngữ Anh",
            nhomDoLuong: "",
            maChuanDauRa: "",
            moTa: ""
        },
    })

    return (
        <MyButtonCreate label="Thêm CĐR" form={form} onSubmit={() => { }} objectName='Chi tiết chuẩn đầu ra'>
            <MySelect label='Mã khoá' data={['NNA21']} {...form.getInputProps("code")} />
            <MySelect label='Chương trình' data={['Ngôn ngữ Anh']} {...form.getInputProps("nganh")} />
            <MyTextInput label='Mã chuẩn đầu ra' {...form.getInputProps("maChuanDauRa")} />
            <MySelect label='Nhóm đo lường' data={['Kiến thức', 'Kỹ năng', ' Mức độ tự chủ và trách nhiệm']} {...form.getInputProps("maChuanDauRa")} placeholder="Kiến thức /Kỹ năng / Mức độ tự chủ và trách nhiệm" />
            <MyTextInput label="Mô tả" {...form.getInputProps("moTa")} />
        </MyButtonCreate>
    )
}


