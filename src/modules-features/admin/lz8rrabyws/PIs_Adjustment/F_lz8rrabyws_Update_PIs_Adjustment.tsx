'use client'
import baseAxios from '@/api/baseAxios';
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';



export default function F_lz8rrabyws_Update_PIs_Adjustment({ data }: { data: any }) {
    const form = useForm<any>({
        initialValues: {
            id: data.id,
            coeploId: data?.coeplo.id,
            code: data?.code || "",
            description: data.description || "",
            densityPI: data.densityPI
        }
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={async (values) => {
            try {
                const response = await baseAxios.post("/COEPI/Update", values);

                // Kiểm tra API phản hồi có lỗi hay không
                if (response.data.isSuccess === 0 || response.data.data === "Tỷ trọng PI của một PLO không vượt quá 100%") {
                    notifications.show({ message: "Vui lòng nhập tổng tỷ trọng nhỏ hơn 100", color: "red" });
                    return Promise.reject(new Error)
                } else {
                    return Promise.resolve()
                }
            } catch (error) {
                form.setErrors({ densityPLO: "Lỗi kết nối đến server!" });
            }
        }} >
            <Select disabled required label="Mã PLO" data={[
                { value: data?.code || "", label: `${data?.coeplo.code} - ${data.description}` },
            ]}
                defaultValue={data?.code}
            />

            <MyTextInput required disabled label='Mã PIs' {...form.getInputProps("code")} readOnly />
            <MyTextArea label='Mô tả'
                value={form.values.description ?? ""}
                {...form.getInputProps("description")} />
            <MyNumberInput label='Tỷ trọng PI' {...form.getInputProps("densityPI")} />
        </MyActionIconUpdate>
    )
}