import { Flex, FlexProps } from "@mantine/core";
import { ReactNode } from "react";

interface IMyFlexColumn extends FlexProps {
    children?: ReactNode;
}

export default function MyFlexColumn({ children, ...rest }: IMyFlexColumn) {
    return (
        <Flex direction={"column"} gap={"md"} {...rest}>
            {children}
        </Flex>
    );
}
