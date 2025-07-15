
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { Checkbox, Select } from "@mantine/core"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I_569re3pt0f_Read } from "./F_569re3pt0f_Read"
import { MyFileInput } from "aq-fe-framework/components"

export default function F_569re3pt0f_Update(
    { values }: { values: I_569re3pt0f_Read }
) {
    const form = useForm<I_569re3pt0f_Read>({
        initialValues: values
    })
    

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
                
                            <MyTextInput label="Họ và tên" {...form.getInputProps("name")} />
                            <MyTextInput label="Email" {...form.getInputProps("email")} />
                            <MyTextInput label="Mật khẩu" {...form.getInputProps("password")} />
                            <MyTextInput 
                                label="Số điện thoại" 
                                type="tel" 
                                {...form.getInputProps("phone")} 
                                />
                            <MyTextInput label="Google ID" {...form.getInputProps("google_id")} />
                            <MyTextInput label="Facebook ID" {...form.getInputProps("facebook_id")} />
                            <MyTextInput label="Địa chỉ" {...form.getInputProps("address")} />
                            <MyFileInput label="Ảnh đại diện" {...form.getInputProps("image")} />
                            <MyTextInput label="Phân quyền" {...form.getInputProps("role_id")} />
                            <Checkbox label="Trạng thái" {...form.getInputProps("is_active")} />
                            <MyTextInput label="Ngày xác nhận" {...form.getInputProps("email_verified_at")} />
                            <MyTextInput label="OTP" {...form.getInputProps("otp")} />
                            <MyTextInput label="Ngày OTP" {...form.getInputProps("otp_expires_at")} />
                            <MyTextInput label="Số lần gửi OTP" {...form.getInputProps("otp_send_count")} />
                            <MyTextInput label="Ngày gửi OTP" {...form.getInputProps("otp_sent_at")} />
                
                
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

