import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

interface I {
    id?: number
    userName?: string,
    code?: string
    fullName?: string,
    email?: string,
    phoneNumber?: string
}
export default function F_core71678_Update({ user }: { user: I }) {
    const form = useForm({
        initialValues: user
    })

    useEffect(() => {
        console.log(form.values);
    }, [form.values])


    return (
        <MyActionIconUpdate form={form} onSubmit={async (values) => {
            return await baseAxios.post("/Account/update",
                {
                    ...values,
                    id: values.id,
                    address: "",
                    concurrencyStamp: "",
                    isBlocked: false,
                    isEnabled: true,
                    workingUnitId: null
                })
        }} >
            <MyFlexColumn>
                <MyTextInput disabled label='Mã tài khoản' {...form.getInputProps("code")} />
                <MyTextInput disabled label='Tên tài khoản' {...form.getInputProps("userName")} />
                <MyTextInput label='Họ và tên' {...form.getInputProps("fullName")} />
                <MyTextInput label='Email' {...form.getInputProps("email")} />
                <MyTextInput label='Số điện thoại' {...form.getInputProps("phoneNumber")} />
            </MyFlexColumn>
        </MyActionIconUpdate>

    )
}
