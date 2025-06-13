import F0Login from "@/modules-features/auth/F0Login/F0Login";
import { BackgroundImage, Center } from "@mantine/core";

export default function Page() {
    return (
        <BackgroundImage src="/imgs/0/IMG0AuthBackground.png" h={'100vh'}>
            <Center h={'100vh'}>
                <F0Login />
            </Center>
        </BackgroundImage>
    )
}
