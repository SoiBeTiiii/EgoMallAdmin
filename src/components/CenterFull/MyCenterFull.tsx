import { Center, Group } from "@mantine/core";
import { ReactNode } from "react";

export default function MyCenterFull({ children }: { children: ReactNode }) {
    return (
        <Center w={"100%"}>
            <Group>{children}</Group>
        </Center>
    );
}
