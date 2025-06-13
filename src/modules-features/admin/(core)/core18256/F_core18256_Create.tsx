'use client'
import baseAxios from "@/api/baseAxios"
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { useForm } from "@mantine/form"
interface I {
    name?: string,
    code?: string,
    documentType?: number
}

export default function F_core18256_Create(
    { documentType }: { documentType: number }
) {
    const form = useForm<I>({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            code: "",
            documentType: documentType
        },
        validate: {
            name: (value) => value ? null : 'Không được để trống'
        }
    })
    return (
        <MyButtonCreate objectName="Loại văn bản" form={form} onSubmit={(values) => baseAxios.post("/DocumentAttribute/Create", values)}>
            <MyTextInput label="Mã loại văn bản" {...form.getInputProps("code")} />
            <MyTextInput label="Tên loại văn bản" {...form.getInputProps("name")} />
        </MyButtonCreate>
    )
}


