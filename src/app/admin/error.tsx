'use client' // Error components must be Client Components

import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn'
import { OBJECT_COlORS } from '@/constants/object/color'
import { Button, Center, Container, Paper, Title } from '@mantine/core'
import { IconRefresh } from '@tabler/icons-react'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <Container >
            <Center h={'80vh'}>
                <MyFlexColumn>
                    <Title>Chúng tôi đã ghi nhận lỗi và đang khắc phục!</Title>
                    <Paper p={'md'} bg={OBJECT_COlORS.mantineBackgroundBlueLight}>
                        Thông tin lỗi: {error.message}
                    </Paper>
                    <Button
                        leftSection={<IconRefresh />}
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                    >
                        Thử lại
                    </Button>
                </MyFlexColumn>
            </Center>
        </Container>
    )
}