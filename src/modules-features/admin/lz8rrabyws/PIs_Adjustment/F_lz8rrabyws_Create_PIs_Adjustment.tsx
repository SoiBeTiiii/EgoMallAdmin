'use client'
import baseAxios from '@/api/baseAxios';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';



export default function F_lz8rrabyws_Create_PIs_Adjustment({ data }: { data: any[] }) {
    const mappedArray = data?.map(item => ({
        value: item.id.toString(),
        label: `${item.code || "N/A"} - ${item.description || "No description"}`
    }));
    const form = useForm<any>({
        initialValues: {
            coeploId: data && data.length > 0 ? data[0].id || 0 : 0,
            code: "",
            description: "",
            densityPI: 0
        }
    })
    return (
        <MyButtonCreate crudType='create' form={form} onSubmit={async (value) => {
            try {
                const response = await baseAxios.post("/COEPI/Create", value)
                if (response.data.isSuccess === 0 || response.data.data === "Tỷ trọng PI của một PLO không vượt quá 100%") {
                    notifications.show({ message: "Vui lòng nhập tổng tỷ trọng nhỏ hơn 100", color: "red" });
                    return Promise.reject(new Error)
                } else {
                    console.log("Cập nhật thành công!", response.data);
                    return Promise.resolve()
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                form.setErrors({ densityPLO: "Lỗi kết nối đến server!" });
            }
        }} mt={10} mb={10} ml={10}>
            <Select required label="Mã PLO" data={mappedArray}
                defaultValue={form.values.coeploId.toString()}
                onChange={(value) => form.setFieldValue("coeploId", Number(value))}
            />
            <MyTextInput required label='Mã PIs' {...form.getInputProps("code")} />
            <MyTextArea label='Mô tả' {...form.getInputProps("description")} />
            <MyNumberInput label='Tỷ trọng PI' {...form.getInputProps("densityPI")} />
        </MyButtonCreate>
    )
}