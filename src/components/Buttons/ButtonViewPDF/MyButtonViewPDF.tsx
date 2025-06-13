'use client'
import baseAxios from "@/api/baseAxios";
import { ActionIcon, Button, Group, LoadingOverlay, Modal, Paper, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLivePhoto, IconMaximize, IconMinimize } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
interface IMyButtonViewPDF {
    modalSize?: string,
    label?: string,
    id?: number
    src?: string
}
export default function MyButtonViewPDF({ id, modalSize = "80%", label = "Xem file", src = "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf" }: IMyButtonViewPDF) {
    const disc = useDisclosure(false);
    const fullScreen = useState(false);
    const hSize = useState("80vh");
    const query = useQuery({
        queryKey: ['MyButtonViewPDF', id],
        queryFn: async () => {
            return (await baseAxios.get("/Document/Get?id=" + id)).data.data
        },
        enabled: id != undefined && disc[0] == true
    })
    return (
        <>
            <Tooltip label="Xem tài liệu trực tiếp">
                <Button color="cyan" onClick={() => {
                    disc[1].open()
                }} leftSection={<IconLivePhoto />}>
                    {label}
                </Button>
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
                <Paper h={hSize[0]} p={"lg"} pos={"relative"}>
                    <LoadingOverlay visible={query.isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                    {query.data ? <iframe
                        src={`data:application/pdf;base64, ${query.data?.fileDetail?.fileBase64String}`}
                        width={"100%"}
                        height={"100%"}
                    /> :
                        <iframe
                            src={src}
                            width={"100%"}
                            height={"100%"}
                        />
                    }


                </Paper>
            </Modal>
        </>
    );
}
