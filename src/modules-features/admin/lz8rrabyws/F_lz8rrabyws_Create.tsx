"use client"
import baseAxios from '@/api/baseAxios';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';


export default function F_lz8rrabyws_Create({ id }: { id: number }) {
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<any>({
        initialValues: {
            code: "",
            coeGradeId: id,
            densityPLO: 0,
            description: ""
        },
    });

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData })
    }, [fileData])

    return (
        <Group>
            <MyButtonCreate
                form={form}
                onSubmit={
                    async (value) => {
                        try {
                            const response = await baseAxios.post("/COEPLO/Create", value)
                            if (response.data.isSuccess === 0) {
                                notifications.show({ message: "Mã đã tồn tại", color: "red" });
                                return Promise.reject(new Error)
                            } else {
                                console.log("Cập nhật thành công!", response.data);
                                return Promise.resolve()
                            }
                        } catch (error) {
                            console.error("Lỗi khi gọi API:", error);
                            form.setErrors({ densityPLO: "Lỗi kết nối đến server!" });
                        }
                    }
                }>
                <MyTextInput required label='Mã PLO' {...form.getInputProps("code")} />
                <MyTextArea label='Mô tả'
                  value={form.values.description ?? ""} 
                {...form.getInputProps("description")} />
                <MyNumberInput label='Tỷ trọng PLO' {...form.getInputProps("densityPLO")} />
            </MyButtonCreate>
        </Group>
    )
}

