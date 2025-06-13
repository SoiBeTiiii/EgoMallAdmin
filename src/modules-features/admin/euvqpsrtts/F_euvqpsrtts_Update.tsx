'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { useForm } from '@mantine/form'


interface I {
    id?: number 
    code?: string 
    name?: string 
    ghiChu?: string 
}
export default function F_euvqpsrtts_Update({ values }: { values: I }) {
    const form = useForm<I>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label='Mã khoa' {...form.getInputProps("code")} readOnly />
            <MyTextInput label='Tên khoa' {...form.getInputProps("name")} />
            <MyTextInput label='Ghi chú' {...form.getInputProps("ghiChu")} />

        </MyActionIconUpdate>
    )
}


