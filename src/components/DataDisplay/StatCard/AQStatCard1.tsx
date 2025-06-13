import { Box, Button, Flex, Group, Paper, Text } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { ReactNode } from "react";

export default function AQStatCard1(
    { title, value, unit = "", description, icons, diff }: { title: string, value: string, unit?: string, description: string, icons: ReactNode, diff: number }
) {
    return (
        <>
            <Paper withBorder
                p="md"
                radius="md"
                key={title}>
                <Group justify="space-between">
                    <Flex direction={"column"}>
                        <Text
                            tt="uppercase"
                            size="lg"
                            c="dimmed"
                        >
                            {title}
                        </Text>
                        {unit == "" ?
                            <Text size="xs" style={{ visibility: 'hidden' }}>Đơn vị: <strong>{unit}</strong></Text>
                            :
                            <Text size="xs">Đơn vị: <strong>{unit}</strong></Text>
                        }
                    </Flex>
                    <Box>
                        {icons}
                    </Box>
                </Group>

                <Group
                    mt={"5"}
                    align="flex-end"
                    gap={"xs"}
                >
                    <Text
                        fw={700}
                        fz="h1"
                    >{value}
                    </Text>
                    <Text
                        mb={"2"}
                        c={diff > 0 ? 'teal' : 'red'}
                        fz="h2"
                        fw={500}
                    >
                        <span>{diff}%</span>{diff > 0 ? <IconArrowUpRight /> : <IconArrowDownRight />}
                    </Text>
                </Group>

                <Group justify="space-between">
                    <Text tt="uppercase" fz="xs" c="dimmed">
                        {description}
                    </Text>
                    <Button
                        variant="light"
                        size="xs"
                    >
                        Xem chi tiết
                    </Button>
                </Group>
            </Paper>
        </>
    );
}