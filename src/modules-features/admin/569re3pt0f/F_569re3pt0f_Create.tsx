'use client';

import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { Button, Checkbox, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { MyTextInput } from "aq-fe-framework/components";



export interface I_569re3pt0f_Create {
    name?: string;        // Course Objective (CO) code
    email?: string; // Description of the CO
    password?: string;  // Course name
    phone?: string;
    google_id?: string;  // Managing unit
    facebook_id?: string;
    address?: string;
    image?: string;
    role_id?: string;
    is_active?: boolean;
    email_verified_at?: string;
    otp?: string;
    otp_expires_at?: string;
    otp_send_count?: number;
    otp_sent_at?: string;
}



export default function F_569re3pt0f_Create() {
    const disc = useDisclosure(false)

    const form = useForm<I_569re3pt0f_Create>({
        initialValues: {
        },
    });

    return (
        <MyButtonModal
            label="Thêm"
            modalSize={"50%"}
            disclosure={disc}
            title="Chi tiết mục tiêu môn học"
            onSubmit={() => {
            }}
        >
            <MyTextArea label="Mota" {...form.getInputProps("description")} />
            <MyTextInput label="Họ và tên" {...form.getInputProps("name")} />
            <MyTextInput label="Email" {...form.getInputProps("email")} />
            <MyTextInput label="Mật khẩu" {...form.getInputProps("password")} />
            <MyTextInput label="Số điện thoại" {...form.getInputProps("phone")} />
            <MyTextInput label="Google ID" {...form.getInputProps("google_id")} />
            <MyTextInput label="Facebook ID" {...form.getInputProps("facebook_id")} />
            <MyTextArea label="Địa chỉ" {...form.getInputProps("address")} />
            <MyFileInput label="Ảnh đại diện" {...form.getInputProps("image")} />
            <MyTextInput label="Phân quyền" {...form.getInputProps("role_id")} />
            <Checkbox label="Trạng thái" {...form.getInputProps("is_active")} />
            <MyTextInput label="Ngày xác nhận" {...form.getInputProps("email_verified_at")} />
            <MyTextInput label="OTP" {...form.getInputProps("otp")} />
            <MyTextInput label="Ngày OTP" {...form.getInputProps("otp_expires_at")} />
            <MyTextInput label="Số lần gửi OTP" {...form.getInputProps("otp_send_count")} />
            <MyTextInput label="Ngày gửi OTP" {...form.getInputProps("otp_sent_at")} />


            <Button
                leftSection={<IconPlus />}
                onClick={() => {
                    disc[1].close();
                    notifications.show({
                        message: "Lưu thành công",
                    });
                }}>
                Lưu
            </Button>
        </MyButtonModal>
    );
}


