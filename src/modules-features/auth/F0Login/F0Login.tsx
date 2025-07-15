"use client";

import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import useS0Auth from "@/stores/S0Auth";
import {
    Anchor,
    Button,
    Checkbox,
    Flex,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "./css.module.css";

export default function F0Login() {
    const router = useRouter()
    const S0Auth = useS0Auth()
    const loadingState = useState<boolean>(false)
    const mutation = useM_Account_Sigin()
    const form = useForm({
        initialValues: {
            account: "admin@egomall.local",
            password: "Admin123!"
        },
        validate: {
            account: (value) => value ? null : 'Không được để trống',
            password: (value) => value ? null : 'Không được để trống'
        }
    })
    function handleSubmit(account?: string, password?: string) {
        loadingState[1](true)
        mutation.mutate({
            "account": account,
            "password": password
        }, {
            onSuccess: (data) => {
                if (data.isSuccess === false) {
                    form.setFieldError("account", "Tài khoản không tồn tại!")
                    return
                }
                if (data.isSuccess == 0) {
                    form.setFieldError("password", "Mật khẩu đăng nhập không chính xác!")
                    return
                }
                loadingState[1](false)
                S0Auth.setProperty("token", data.data.token)
                router.replace("/admin/dashboard")
            },
            onSettled: () => {
                loadingState[1](true)
            }
        })
    }
    return (
        <Paper withBorder w={400} m={"md"} shadow="md" p={30} mt={30} radius="md">
            <Flex direction={"column"} mb={"md"}>
                <Title ta="center" className={classes.title}>
                    Đăng nhập!
                </Title>
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Bạn gặp vấn đề kỹ thuật?&nbsp;
                    <Anchor size="sm" component="button">
                        Vào link này
                    </Anchor>
                </Text>
            </Flex>
            <form onSubmit={form.onSubmit(async values => handleSubmit(values.account, values.password))}>
                <MyFlexColumn>
                    <TextInput
                        {...form.getInputProps("account")}
                        label="Tài khoản"
                        placeholder="Nhập tài khoản của bạn"
                        withAsterisk
                    />
                    <PasswordInput
                        {...form.getInputProps("password")}
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu của bạn"
                        withAsterisk
                    />
                    <Group justify="space-between" >
                        <Checkbox label="Lưu đăng nhập" />
                        <Anchor component={Link} href={"quen-mat-khau"} size="sm">
                            Quên mật khẩu?
                        </Anchor>
                    </Group>
                    <Button
                        loading={loadingState[0]}
                        type="submit"
                        fullWidth >
                        Đăng nhập
                    </Button>
                    <Button
                        onClick={() => {
                            S0Auth.setProperty("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NTA4IiwiY19oYXNoIjoiNjgxNTMzZjI1OTU5NjIxOGY5ZWQ4YjRjZGU2Nzk5ODAyYWNlOTVmZjdiODQ3MWE3MjY4ZmM1NTc3ZDkxOTJjNiIsImp0aSI6IjljYjk2N2E4LTRlMWMtNDFkMi05NmU0LTExYzhlOThlYjEyOCIsImlhdCI6MTczNjEyODA2OCwibmJmIjoxNzM2MTI4MDY3LCJleHAiOjE3NDM5MDQwNjcsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.qCv-erjW74az5C9_Llh5N5aXO9yyLm6smB5NCnjm_uc")
                            router.replace("/admin/dashboard")
                        }}
                        type="button"
                        fullWidth >
                        Vào trang chủ (Sử dụng token tạo sẵn)
                    </Button>

                </MyFlexColumn>
            </form>
        </Paper>
    );
}

function useM_Account_Sigin() {
    const ENDPOINT = process.env.NEXT_PUBLIC_API2 + "/login"
    const mutation = useMutation({
        mutationFn: async (values: { account?: string, password?: string }) => {
            const result = await axios.post(ENDPOINT, values, {
                withCredentials: true // 👈 thêm dòng này!
            })
            return result.data
        }
    })
    return mutation
}
