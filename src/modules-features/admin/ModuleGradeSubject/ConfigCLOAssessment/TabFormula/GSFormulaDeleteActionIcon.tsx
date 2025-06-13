"use client"
import baseAxios from '@/api/baseAxios';
import { ActionIcon, Button, Flex, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function GSFormulaDeleteActionIconModal({ GSFormulaID, GSFormulaCode, gradeSubjectId }: { GSFormulaID?: number, GSFormulaCode?: string | null, gradeSubjectId?: number }) {
    const queryClient = useQueryClient();
    const discDeleteModal = useDisclosure(false);
    const mutateGSFormula = useMutation({
        mutationFn: async () => {
            let body = {
                id: GSFormulaID,
                isEnabled: false
            }
            let response = await baseAxios.post('/COESubjectFormula/Delete', body)
            if (response.data.isSuccess === 1) {
                notifications.show({
                    title: 'Thao tác thành công',
                    message: 'Dữ liệu đã được xóa',
                    color: 'green',
                })
            }

            if (response.data.isSuccess !== 1) {
                notifications.show({
                    title: 'Thao tác thất bại',
                    message: 'Dữ liệu chưa được xóa',
                    color: 'red',
                })
            }
        },
        onSuccess: (response) => {
            //todo
            queryClient.invalidateQueries({
                queryKey: [`GSFormulaTableByGradeSubjectId${gradeSubjectId}`]
            });
        },
        onError: () => {
            //todo
        },
    });

    const handleOnClickDeleteIcon = () => {
        discDeleteModal[1].open();
    }

    const handleDeleteGSFormulaAPI = async () => {
        mutateGSFormula.mutate();
    }

    return (
        <>
            <ActionIcon
                variant="light"
                radius="sm"
                color='red'
                onClick={handleOnClickDeleteIcon}
            >
                <IconTrash />
            </ActionIcon>
            <Modal
                size="auto"
                opened={discDeleteModal[0]}
                onClose={discDeleteModal[1].close}
                title="Xóa dữ liệu"
            >
                <Group mb={20}>
                    <span>Bạn sắp xóa dữ liệu &quot;{GSFormulaCode}&quot;. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?</span>
                </Group>
                <Flex
                    gap="sm"
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap"
                >
                    <Button
                        w={{ base: "100%", xs: "48%" }}
                        color="red"
                        variant='filled'
                        onClick={handleDeleteGSFormulaAPI}
                    >
                        Xác nhận xóa
                    </Button>
                    <Button
                        w={{ base: "100%", xs: "48%" }}
                        variant="outline"
                        onClick={discDeleteModal[1].close}>
                        Hủy thao tác
                    </Button>
                </Flex>
            </Modal>
        </>
    )
}

