import { Box, Fieldset, FieldsetProps, Text } from '@mantine/core'
import { ReactNode } from 'react'

interface MyFieldsetProps extends FieldsetProps {
    chilren?: ReactNode,
    title?: string
}

export default function MyFieldset({
    children,
    title,
    ...rest
}: MyFieldsetProps) {
    return (
        <Fieldset
            {...rest}
            legend={(
                <Box
                    bg="blue.4"
                    px="xs"
                    py={2}
                    style={{ borderRadius: 4 }}
                >
                    <Text c="white" fw={500}>
                        {title}
                    </Text>
                </Box>
            )}>
            {children}
        </Fieldset>
    )
}
