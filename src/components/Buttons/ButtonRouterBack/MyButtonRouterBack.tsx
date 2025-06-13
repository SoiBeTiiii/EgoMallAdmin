"use client";
import { Button, ButtonProps } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface IMyButtonRouterBack extends ButtonProps {
    url?: string; label?: string
}

export default function MyButtonRouterBack({ url, label, ...rest }: IMyButtonRouterBack) {
    const router = useRouter();
    return (
        <Button
            variant="light"
            leftSection={<IconArrowBack stroke={2} />}
            onClick={() => {
                if (url) {
                    router.replace(url);
                    return;
                }
                router.back();
            }}
            {...rest}
        >
            {label ? label : "Trở về"}
        </Button>
    );
}
