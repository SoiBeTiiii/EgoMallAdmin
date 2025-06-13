import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow';
import { Badge, Card, Center, Image, Text } from '@mantine/core';
import Link from 'next/link';
import { ReactNode } from 'react';
export interface IAQCardProps {
    imgSrc?: string | null,
    title?: string
    description?: string,
    children?: ReactNode,
    date?: string
    status?: string,
    href?: string
}

export default function AQCard({
    imgSrc = "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    title,
    description,
    date,
    children,
    status,
    href = ""
}: IAQCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder component={Link} href={href}>
            <Card.Section >
                <Center>
                    <Image
                        src={imgSrc}
                        h={200}
                        w="auto"
                        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                        alt="Norway"
                    />
                </Center>
            </Card.Section>

            <MyFlexRow justify="space-between" mt="md" mb="xs">
                <Text fw={500} >{title}</Text>
                {status && <Badge color='violet.5' w={'150px'}>{status}</Badge>}
            </MyFlexRow>

            <Text size="sm" c="dimmed" lineClamp={2}>
                {description}
            </Text>
            {children}
        </Card>
    );
}