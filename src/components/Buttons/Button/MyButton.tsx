import { T0CRUD } from "@/types/types";
import { Button, ButtonProps } from "@mantine/core";
import { IconDeviceFloppy, IconEdit, IconFileExport, IconFileImport, IconPlus, IconPrinter, IconTrash, IconX } from "@tabler/icons-react";
import { ReactNode } from "react";

interface IMyButton extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style">, ButtonProps {
    crudType?: T0CRUD
    children?: ReactNode;
}

export function MyButton({ children, crudType = "delete", ...rest }: IMyButton) {
    if (crudType == "default") {
        return (
            <Button color="indigo" {...rest}>
                {children}
            </Button>
        );
    }
    if (crudType == "create") {
        return (
            <Button color="indigo" type="submit" leftSection={<IconPlus />} {...rest}>
                {children ? children : "Lưu"}
            </Button>
        );
    }
    if (crudType == "createMultiple") {
        return (
            <Button color="green" type="submit" leftSection={<IconPlus />} {...rest}>
                {children ? children : "Thêm danh sách"}
            </Button>
        );
    }
    if (crudType == "delete") {
        return (
            <Button color="red" leftSection={<IconTrash />} {...rest}>
                {children ? children : "Xác nhận xóa"}
            </Button>
        );
    }
    if (crudType == "update") {
        return (
            <Button color="yellow" type="submit" leftSection={<IconEdit />} {...rest}>
                {children ? children : "Chỉnh sửa"}
            </Button>
        );
    }
    if (crudType == "save") {
        return (
            <Button color="blue" leftSection={<IconDeviceFloppy />} {...rest}>
                {children ? children : "Lưu"}
            </Button>
        );
    }
    if (crudType == "import") {
        return (
            <Button color="green.8" leftSection={<IconFileImport />} {...rest}>
                {children ? children : "Import"}
            </Button>
        );
    }
    if (crudType == "print") {
        return (
            <Button color="orange.7" leftSection={<IconPrinter />} {...rest}>
                {children ? children : "In"}
            </Button>
        );
    }
    if (crudType == "export") {
        return (
            <Button color="green.8" leftSection={<IconFileExport />} {...rest}>
                {children ? children : "In"}
            </Button>
        );
    }
    if (crudType == "cancel") {
        return (
            <Button color="gray" leftSection={<IconX />} {...rest}>
                {children ? children : "Hủy thao tác"}
            </Button>
        );
    }
    if (crudType == "select") {
        return (
            <Button  {...rest}>
                {children ? children : "Chọn"}
            </Button>
        );
    }

}
