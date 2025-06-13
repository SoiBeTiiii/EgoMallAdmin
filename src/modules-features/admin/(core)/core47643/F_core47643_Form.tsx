import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

interface I {
    id?: number
    code?: string,
    name?: string
}
export default function F_core47643_Form({ values }: { values?: I }) {
    const form = useForm<I>({
        mode: "uncontrolled",
        initialValues: values
    })

    if (values) return (
        <MyActionIconUpdate form={form} onSubmit={async () => {
            return await baseAxios.post("/Role/Update", form.getValues())
        }}>
            <MyTextInput readOnly variant="filled" label="Mã" {...form.getInputProps("code")} />
            <MyTextInput label="Quyền"  {...form.getInputProps("name")} />
        </MyActionIconUpdate>
    )
    return (
        <MyButtonCreate form={form} onSubmit={async () => {
            return await baseAxios.post("/Role/Create", form.getValues())
        }}>
            <MyTextInput label="Mã" {...form.getInputProps("code")} />
            <MyTextInput label="Quyền"  {...form.getInputProps("name")} />
        </MyButtonCreate>
    )
}
