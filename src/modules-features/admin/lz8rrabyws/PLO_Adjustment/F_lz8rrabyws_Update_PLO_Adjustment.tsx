'use client'
import baseAxios from '@/api/baseAxios';
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';


export default function F_lz8rrabyws_Update_PLO_Adjustment({ data }: { data: any }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<any>({
        initialValues: data,
        validate: {
            densityPLO: (value) => value >= 100 ? "Vui lòng nhập nhỏ hơn 100" : null
        }
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={async (values) => {

            try {
                const response = await baseAxios.post("/COEPLO/Update", values);

                // Kiểm tra API phản hồi có lỗi hay không
                if (response.data.isSuccess === 0) {
                    notifications.show({ message: "Vui lòng nhập tổng tỷ trọng nhỏ hơn 100", color: "red" });
                    return Promise.reject(new Error)
                } else {
                    return Promise.resolve()
                }
            } catch (error) {
                form.setErrors({ densityPLO: "Lỗi kết nối đến server!" });
            }
        }} >
            <MyTextInput disabled required label='Mã PLO' {...form.getInputProps("code")} readOnly />
            <MyTextArea label='Mô tả'
                value={form.values.description ?? ""}
                {...form.getInputProps("description")} />
            <MyNumberInput label='Tỷ trọng PLO' {...form.getInputProps("densityPLO")} />
        </MyActionIconUpdate>
    )
}