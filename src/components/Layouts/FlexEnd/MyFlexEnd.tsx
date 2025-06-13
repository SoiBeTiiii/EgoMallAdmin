import { Group, GroupProps } from "@mantine/core";
import { ReactNode } from "react";

interface IMyFlexEnd extends GroupProps {
    children: ReactNode;
}

export default function MyFlexEnd({ children, ...rest }: IMyFlexEnd) {
    return (
        <Group justify="end" mt={"md"} {...rest}>
            {children}
        </Group>
    );
}
