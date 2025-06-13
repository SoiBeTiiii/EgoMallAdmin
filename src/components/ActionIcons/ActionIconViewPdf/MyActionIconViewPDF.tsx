"use client";
import { ActionIcon, ActionIconProps, Group, Modal, Paper, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLivePhoto, IconMaximize, IconMinimize } from "@tabler/icons-react";
import { useState } from "react";


interface IActionIconViewPDF extends ActionIconProps {
    modalSize?: string; pdfLink: string
}

export default function MyActionIconViewPDF({ modalSize = "80%", pdfLink = "https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/07/17-bgd.signed.pdf", ...rest }: IActionIconViewPDF) {
    const disc = useDisclosure(false);
    const fullScreen = useState(false);
    const hSize = useState("80vh");
    return (
        <>
            <Tooltip label="Xem tài liệu trực tiếp" >
                <ActionIcon color="cyan" onClick={disc[1].open} {...rest}>
                    <IconLivePhoto />
                </ActionIcon>
            </Tooltip>
            <Modal
                fullScreen={fullScreen[0]}
                opened={disc[0]}
                onClose={disc[1].close}
                size={modalSize}
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
                <Paper h={hSize[0]} p={"lg"}>
                    <iframe src={pdfLink} width={"100%"} height={"100%"} />
                </Paper>
            </Modal>
        </>
    );
}
