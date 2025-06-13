import { Group, Text } from "@mantine/core";


interface I {
    keyLabel?: string,
    label?: string
}
export default function MyKeyLabel({ keyLabel, label }: I) {
    return (
        <Group gap={5}>
            <Text fw={'bold'}>{keyLabel}:</Text>
            <Text>{label}</Text>
        </Group>
    )
}
