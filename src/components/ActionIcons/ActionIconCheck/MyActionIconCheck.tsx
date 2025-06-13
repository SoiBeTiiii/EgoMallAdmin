"use client";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { ActionIcon, ActionIconProps, Button, Checkbox, Modal, Switch, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChecklist } from "@tabler/icons-react";
import { useState } from "react";


interface IActionIconCheck extends ActionIconProps {
    modalSize?: string; comment?: string
}

export default function MyActionIconCheck({ modalSize = "50%", comment = "", ...rest }: IActionIconCheck) {
    const disc = useDisclosure(false);
    const fullScreen = useState(false);
    const hSize = useState("50vh");
    return (
        <>
            <Tooltip label="Xem tài liệu trực tiếp" >
                <ActionIcon color="cyan" onClick={disc[1].open} {...rest}>
                    <IconChecklist size={24} color="blue" />
                </ActionIcon>
            </Tooltip>

            <Modal
                fullScreen={fullScreen[0]}
                opened={disc[0]}
                onClose={disc[1].close}
                size={modalSize}
                title={
                    <Text>Kiểm tra hồ sơ đã đăng ký</Text>

                }>
                <Switch
                    defaultChecked
                    label="Đạt yêu cầu"
                />
                <MyFlexColumn>
                    <MyTextInput label="Nhận xét" />
                    <Checkbox label="Gửi mail thông báo" />
                    <Button>Cập nhập</Button>
                </MyFlexColumn>

            </Modal>


        </>
    );
}
