"use client"
import baseAxios from '@/api/baseAxios'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { U0MyValidateEmail } from '@/utils/validateForm'
import { useForm } from '@mantine/form'

interface I extends IBaseEntity {
    userName?: string,
    passwordHash?: string
    address?: string
    fullName?: string,
    isBlocked?: boolean
    email?: string,
    password?: string,
    workingUnitId?: number
    phoneNumber?: string
    AQModuleId?: number
}
const ENDPOINT = "/Account/create"
export default function F_core71678_Create() {
    const form = useForm<I>({
        initialValues: {
            fullName: "",
            code: "",
            userName: "",
            password: "",
            email: "",
            phoneNumber: "",
        },
        validate: {
            email: (value) => U0MyValidateEmail(value),
        }
    })
    async function handleSubmit() {
        return await baseAxios.post(ENDPOINT, {
            ...form.getValues(),
            passwordHash: "",
            id: 0,
            address: "",
            concurrencyStamp: "",
            isBlocked: false,
            isEnabled: true,
            workingUnitId: undefined,
            AQModuleId: 1002
        })
    }
    return (
        <MyButtonCreate form={form} onSubmit={handleSubmit} objectName='người dùng'>
            <MyTextInput label='Mã tài khoản' {...form.getInputProps("code")} />
            <MyTextInput label='Tên tài khoản' {...form.getInputProps("userName")} />
            <MyTextInput label='Mật khẩu' {...form.getInputProps("password")} />
            <MyTextInput label='Họ và tên' {...form.getInputProps("fullName")} />
            <MyTextInput label='Email' {...form.getInputProps("email")} />
            <MyTextInput label='Số điện thoại' {...form.getInputProps("phoneNumber")} />
        </MyButtonCreate>
    )
}


