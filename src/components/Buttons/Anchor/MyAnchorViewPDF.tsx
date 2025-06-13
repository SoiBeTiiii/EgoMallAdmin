import { ActionIcon, Anchor, Group, Modal, Paper, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMaximize, IconMinimize } from "@tabler/icons-react";
import { useState } from "react";

export default function MyAnchorViewPDF({ label, pdfLink }: { label: string; pdfLink: string }) {
    const disc = useDisclosure(false);
    const fullScreen = useState(false);
    const hSize = useState("80vh");
    return (
        <>
            <Anchor onClick={disc[1].open}>{label}</Anchor>
            <Modal
                fullScreen={fullScreen[0]}
                opened={disc[0]}
                onClose={disc[1].close}
                size={"80%"}
                title={
                    <Group>
                        <Text>Xem tài liệu trực tiếp</Text>
                        {fullScreen[0] ? (
                            <ActionIcon
                                onClick={() => {
                                    fullScreen[1](false);
                                    hSize[1]("80vh");
                                }}>
                                <IconMinimize />
                            </ActionIcon>
                        ) : (
                            <ActionIcon
                                onClick={() => {
                                    fullScreen[1](true);
                                    hSize[1]("90vh");
                                }}>
                                <IconMaximize />
                            </ActionIcon>
                        )}
                    </Group>
                }>
                <Paper h={hSize[0]}>
                    <iframe src={pdfLink} width={"100%"} height={"100%"} />
                </Paper>
            </Modal>
        </>
    );
}
