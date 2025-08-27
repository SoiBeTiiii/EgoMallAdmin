import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { T0CRUD, T0MANTINE_SIZE } from "@/types/types";

import { Button, ButtonProps, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { ReactNode } from "react";

interface IMyButtonModal extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style">, ButtonProps {
    label?: string;
    title?: string;
    children?: ReactNode;
    crudType?: T0CRUD;
    modalSize?: T0MANTINE_SIZE;
    objectName?: string
    disclosure: ReturnType<typeof useDisclosure>;
    fullScreen?: boolean;
}

export function MyButtonModal({
    fullScreen = false,
    crudType = "default",
    disclosure,
    modalSize,
    title,
    label,
    children,
    objectName = "",
    ...rest
}: IMyButtonModal) {
    const objectNameLower = objectName?.toLowerCase()
    if (crudType == "default") {
        return (
            <>
                <Button onClick={disclosure?.[1].open} color="indigo" {...rest}>
                    {label}
                </Button>
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
                <Button onClick={disclosure?.[1].open} leftSection={<IconPlus />} {...rest}>
                    {label ? label : `Thêm`}
                </Button>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title ? title : `Tạo ${objectNameLower} mới`}
                    opened={disclosure?.[0]}
                    onClose={disclosure[1].close}>
                    <MyFlexColumn>{children}</MyFlexColumn>
                </Modal>
            </>
        );
    }
    if (crudType == "createMultiple") {
        return (
            <>
                <Button onClick={disclosure?.[1].open} color="green" leftSection={<IconPlus />} {...rest}>
                    {label ? label : `Import ${objectNameLower}`}
                </Button>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title ? title : `Thêm danh sách ${objectNameLower}`}
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
                <Button onClick={disclosure?.[1].open} color="yellow" leftSection={<IconEdit />} {...rest}>
                    {label ? label : `Chỉnh sửa ${objectNameLower}`}
                </Button>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title ? title : `Chỉnh sửa ${objectNameLower}`}
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
                <Button onClick={disclosure?.[1].open} color="red" leftSection={<IconTrash />} {...rest}>
                    {label ? label : `Xóa ${objectNameLower}`}
                </Button>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title ? title : `Xóa ${objectNameLower}`}
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
                <Button onClick={disclosure?.[1].open} color="indigo" {...rest}>
                    {label ? label : `Chi tiết ${objectNameLower}`}
                </Button>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title ? title : `Chi tiết ${objectNameLower}`}
                    opened={disclosure?.[0]}
                    onClose={disclosure[1].close}>
                    <MyFlexColumn>{children}</MyFlexColumn>
                </Modal>
            </>
        );
    }
    // if (crudType == "register") {
    //     return (
    //         <>
    //             <Button onClick={disclosure?.[1].open} color="blue" leftSection={<IconPlus />} {...rest}>
    //                 {label ? label : `Đăng ký ${objectNameLower}`}
    //             </Button>
    //             <Modal
    //                 fullScreen={fullScreen}
    //                 size={modalSize}
    //                 title={title ? title : `Đăng ký ${objectNameLower}`}
    //                 opened={disclosure?.[0]}
    //                 onClose={disclosure[1].close}>
    //                 <MyFlexColumn>{children}</MyFlexColumn>
    //             </Modal>
    //         </>
    //     );
    // }


}
