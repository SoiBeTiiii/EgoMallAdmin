import F0ForgotPassword from "@/modules-features/auth/F0ForgotPassword/F0ForgotPassword";
import { BackgroundImage, Center } from "@mantine/core";

export default function Page() {
    return (
        <BackgroundImage src="/imgs/0/IMG0AuthBackground.png" h={'100vh'}>
            <Center h={'100vh'}>
                <F0ForgotPassword />
            </Center>
        </BackgroundImage>
    )
}
