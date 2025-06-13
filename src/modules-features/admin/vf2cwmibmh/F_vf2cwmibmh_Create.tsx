'use client'
import baseAxios from '@/api/baseAxios';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { I_vf2cwmibmh_Read } from './F_vf2cwmibmh_Read';

export default function F_4hi65qkj5n_Create() {
    const form = useForm<I_vf2cwmibmh_Read>({
        initialValues: {
            code: "",
            name: "",
            nameEg: "",
            note: "",
        },
        validate: {
            code: (value) => value ? null : "Không được để trống",
            name: (value) => value ? null : "Không được để trống",
        }
    })

    return (
        <MyButtonCreate form={form} onSubmit={async (values) => {
            const res = await baseAxios.post("/COETrainingLevel/Create",
                {
                    ...values,
                })

            if (res?.data?.isSuccess === 0) {
                notifications.show({
                    color: "red",
                    message: res?.data?.data.Code
                })
            }
        }} objectName='Chi tiết Danh mục hệ đào tạo'>
            <MyTextInput label='Mã bậc' {...form.getInputProps("code")} />
            <MyTextInput label='Tên bậc' {...form.getInputProps("name")} />
            <MyTextInput label="Tên bậc Eg" {...form.getInputProps("nameEg")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </MyButtonCreate>
    )
}


function utils_file_fileToAQDocumentType(arg0: any) {
    throw new Error('Function not implemented.');
}

