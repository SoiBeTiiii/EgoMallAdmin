import MySelect from "@/components/Combobox/Select/MySelect";
import MyFlexEnd from "@/components/Layouts/FlexEnd/MyFlexEnd";
import { Button, Divider, Fieldset, Group, Modal, SimpleGrid, Space, Table, useModalsStack } from "@mantine/core";
import { IconArrowBackUp, IconArrowBigLeft, IconArrowBigRight, IconSquareRoundedX } from "@tabler/icons-react";
import useS_ButtonImport from "./useS_ButtonImport";

interface SelectFieldModalProps {
    stack: ReturnType<typeof useModalsStack<"select-file-page" | "select-field-page" | "implement-page">>
    onImport: () => void
}
export default function SelectFieldModal({ stack, onImport }: SelectFieldModalProps) {
    const store = useS_ButtonImport()

    return (
        <Modal fullScreen {...stack.register('select-field-page')} title="Import">
            <SimpleGrid cols={{ base: 2 }}>
                <Fieldset legend="Danh sách trường thông tin">
                    <Table stickyHeader stickyHeaderOffset={60}>
                        <Table.Thead bg={'cyan'}>
                            <Table.Tr>
                                <Table.Th>Mã field</Table.Th>
                                <Table.Th>Tên field</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {store.state.fieldConfig?.filter(item => item.isSelected == false || item.isSelected == undefined).map((item, idx) => (
                                <Table.Tr
                                    key={idx}
                                    style={{ cursor: "pointer" }}
                                >
                                    <Table.Td onClick={() => store.changeSelected(item.fieldKey.toString(), true)}>{item.fieldKey.toString()}</Table.Td>
                                    <Table.Td onClick={() => store.changeSelected(item.fieldKey.toString(), true)}>{item.fieldName}</Table.Td>
                                </Table.Tr>
                            ))}

                        </Table.Tbody>
                    </Table>
                    <Space />

                    <Group>
                        <Button
                            onClick={() => { store.changeAllSelected(true) }}
                            leftSection={<IconArrowBigRight />}
                        >Chuyển tất cả</Button>
                    </Group>
                </Fieldset>

                <Fieldset legend="Danh sách trường thông tin được chọn">
                    <Table stickyHeader stickyHeaderOffset={60}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Mã field</Table.Th>
                                <Table.Th>Tên field</Table.Th>
                                <Table.Th>Cột map</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {store.state.fieldConfig?.filter(item => item.isSelected == true).map((item, idx) => (
                                <Table.Tr
                                    key={idx}
                                    style={{ cursor: "pointer" }}
                                >
                                    <Table.Td onClick={() => store.changeSelected(item.fieldKey.toString(), false)}>{item.fieldKey.toString()}</Table.Td>
                                    <Table.Td onClick={() => store.changeSelected(item.fieldKey.toString(), false)}>{item.fieldName}</Table.Td>
                                    <Table.Td><MySelect data={store.state.title!} value={item.fieldToMap} onChange={(e) => store.setFieldToMap(item.fieldKey.toString(), e!)} /></Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                    <Space />
                    <Button
                        onClick={() => { store.changeAllSelected(false) }}
                        leftSection={<IconArrowBigLeft />}
                    >Chuyển tất cả về</Button>
                </Fieldset>
            </SimpleGrid>
            <Divider></Divider>
            <MyFlexEnd>
                <Button
                    leftSection={<IconArrowBackUp />}
                    onClick={() => stack.close("select-field-page")}
                    color="gray.7">
                    Quay lại
                </Button>
                <Button
                    color="blue.8"
                    leftSection={<IconArrowBigRight />}
                    onClick={onImport}>
                    Tiếp tục / Import
                </Button>
                <Button
                    leftSection={<IconSquareRoundedX />}
                    onClick={() => stack.closeAll()}
                    color="red.6">
                    Đóng
                </Button>
            </MyFlexEnd>
        </Modal >
    )
}
