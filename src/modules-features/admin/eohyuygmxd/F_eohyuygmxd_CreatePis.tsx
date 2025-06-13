'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MySelect from '@/components/Combobox/Select/MySelect'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { useForm } from '@mantine/form'


interface IPIs {
    code?: string
    chuongTrinh?: string
    maChuanDauRa?: string
    maPi?: string
    moTa?: string
    weight?: number
}
export default function F_euvqpsrtts_Create() {
    const form = useForm<IPIs>({
        initialValues: {
            code: 'NNA21',
            chuongTrinh: "Ngôn ngữ Anh",
            maChuanDauRa: "PL01",
            maPi: "",
            moTa: "",
            weight: 25
        },
    })

    return (
        <MyButtonCreate label="Thêm PI" form={form} onSubmit={() => { }} objectName='Chi tiết PIs'>
            <MySelect label='Mã khoá' data={['NNA21']} {...form.getInputProps("code")} />
            <MySelect label='Chương trình' data={['Ngôn ngữ Anh']} {...form.getInputProps("chuongTrinh")} />
            <MySelect label='Mã chuẩn đầu ra' data={['PL01']} {...form.getInputProps("maChuanDauRa")} />
            <MyTextInput label="Mã Pi" {...form.getInputProps("maPi")} />
            <MyTextInput label="Mô tả" {...form.getInputProps("moTa")} />
            <MyTextInput label="Tỷ trọng %" {...form.getInputProps("weight")} />
        </MyButtonCreate>
    )
}


