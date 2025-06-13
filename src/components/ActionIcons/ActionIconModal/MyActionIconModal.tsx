import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { T0CRUD, T0MANTINE_SIZE } from "@/types/types";
import { ActionIcon, ActionIconProps, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { ReactNode } from "react";

interface IMyActionIconModal extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style">, ActionIconProps {
    title?: string;
    children?: ReactNode;
    crudType?: T0CRUD;
    modalSize?: T0MANTINE_SIZE;
    disclosure: ReturnType<typeof useDisclosure>;
    fullScreen?: boolean;
    icon?: ReactNode;
}

export function MyActionIconModal({
    fullScreen = false,
    crudType = "default",
    disclosure,
    modalSize,
    title,
    children,
    icon,
    ...rest
}: IMyActionIconModal) {
    if (crudType == "default") {
        return (
            <>
                <ActionIcon onClick={disclosure?.[1].open} color="indigo" {...rest}>
                    {icon}
                </ActionIcon>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title}
                    opened={disclosure?.[0]}
                    onClose={disclosure[1].close}>
                    <MyFlexColumn>{children}</MyFlexColumn>
                </Modal>
            </>
        );
    }
    if (crudType == "create") {
        return (
            <>
                <ActionIcon onClick={disclosure?.[1].open}  {...rest}>
                    {icon ? icon : <IconPlus />}
                </ActionIcon>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title ? title : "Tạo dữ liệu mới"}
                    opened={disclosure?.[0]}
                    onClose={disclosure[1].close}>
                    <MyFlexColumn>{children}</MyFlexColumn>
                </Modal>
            </>
        );
    }
    if (crudType == "update") {
        return (
            <>
                <ActionIcon onClick={disclosure?.[1].open} color="yellow"  {...rest}>
                    {icon ? icon : <IconEdit />}
                </ActionIcon>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title ? title : "Sửa dữ liệu"}
                    opened={disclosure?.[0]}
                    onClose={disclosure[1].close}>
                    <MyFlexColumn>{children}</MyFlexColumn>
                </Modal>
            </>
        );
    }
    if (crudType == "delete") {
        return (
            <>
                <ActionIcon onClick={disclosure?.[1].open} color="red"  {...rest}>
                    {icon ? icon : <IconTrash />}
                </ActionIcon>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title ? title : "Xóa dữ liệu"}
                    opened={disclosure?.[0]}
                    onClose={disclosure[1].close}>
                    <MyFlexColumn>{children}</MyFlexColumn>
                </Modal>
            </>
        );
    }
    if (crudType == "check") {
        return (
            <>
                <ActionIcon onClick={disclosure?.[1].open} color="green"  {...rest}>
                    {icon ? icon : <IconTrash />}
                </ActionIcon>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title ? title : "Kiểm tra"}
                    opened={disclosure?.[0]}
                    onClose={disclosure[1].close}>
                    <MyFlexColumn>{children}</MyFlexColumn>
                </Modal>
            </>
        );
    }
}
