'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { useForm } from '@mantine/form'


interface I {
    id?: number 
    code?: string 
    name?: string 
    ghiChu?: string 
}
export default function F_euvqpsrtts_Create() {
    const form = useForm<I>({
        initialValues: {
            code: "",
            name: "",
            ghiChu: "",
        },
    })

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết khoa'>
            <MyTextInput label='Mã khoa' {...form.getInputProps("code")} />
            <MyTextInput label='Tên khoa' {...form.getInputProps("name")} />
            <MyTextInput label='Ghi chú' {...form.getInputProps("ghiChu")} />

        </MyButtonCreate>
    )
}


