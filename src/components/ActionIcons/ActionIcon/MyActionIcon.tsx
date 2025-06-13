import { T0CRUD } from "@/types/types";
import { ActionIcon, ActionIconProps } from "@mantine/core";
import { IconDeviceFloppy, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { ReactNode } from "react";

interface IMyActionIcon extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style">, ActionIconProps {
    crudType?: T0CRUD
    children?: ReactNode;
}

export function MyActionIcon({ children, crudType = "delete", ...rest }: IMyActionIcon) {
    if (crudType == "default") {
        return (
            <ActionIcon color="indigo" {...rest}>
                {children}
            </ActionIcon>
        );
    }
    if (crudType == "create") {
        return (
            <ActionIcon color="indigo"  {...rest}>
                <IconPlus />
            </ActionIcon>
        );
    }
    if (crudType == "delete") {
        return (
            <ActionIcon color="red"  {...rest}>
                <IconTrash />
            </ActionIcon>
        );
    }
    if (crudType == "update") {
        return (
            <ActionIcon color="yellow"{...rest}>
                <IconEdit />
            </ActionIcon>
        );
    }
    if (crudType == "save") {
        return (
            <ActionIcon color="green"  {...rest}>
                <IconDeviceFloppy />
            </ActionIcon>
        );
    }
}
