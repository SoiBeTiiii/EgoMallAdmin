'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

interface I {
    code?: string,
    name?: string,
    notes?: string
}

export default function CreateTemplate() {
    const disc = useDisclosure(false)
    const form = useForm<I>({
        initialValues: {
            code: "",
            name: "",
            notes: ""
        }
    })
    return (
        <MyButtonModal label="Tạo" title="Tạo dữ liệu mới" disclosure={disc}>
            <form onSubmit={form.onSubmit(values => { })}>
                <MyFlexColumn>
                    <MyTextInput label="Mã" {...form.getInputProps("code")} />
                    <MyTextInput label="Tên" {...form.getInputProps("name")} />
                    <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
                    <MyButton crudType="create" />
                </MyFlexColumn>
            </form>
        </MyButtonModal>
    )
}
