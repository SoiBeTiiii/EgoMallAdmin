import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexEnd from "@/components/Layouts/FlexEnd/MyFlexEnd";
import { Button, Fieldset, FileInput, Modal, NumberInput, Select, SimpleGrid, useModalsStack } from "@mantine/core";
import { IconArrowBigRight, IconSquareRoundedX } from "@tabler/icons-react";
import useS_ButtonImport from "./useS_ButtonImport";

export interface SelectFileModalProps {
    onExportStructure?: () => void
    stack: ReturnType<typeof useModalsStack<"select-file-page" | "select-field-page" | "implement-page">>
}

export default function SelectFileModal({ onExportStructure, stack }: SelectFileModalProps) {
    const store = useS_ButtonImport()
    return (
        <Modal
            title="Import"
            fullScreen
            {...stack.register('select-file-page')}
        >
            <FileInput
                value={store.state.file}
                onChange={e => store.setProperty("file", e)}
                label="File dữ liệu"
                placeholder="Chọn file dữ liệu"
                clearable
            />
            <SimpleGrid cols={{ base: 1, md: 2, lg: 2, xl: 4 }}>
                <NumberInput
                    label="Dòng tiêu đề bắt đầu từ"
                    value={(store.state.startTitleIndex)}
                    onChange={e => store.setProperty("startTitleIndex", e)}
                />
                <NumberInput
                    label="Dòng dữ liệu bắt đầu từ"
                    value={(store.state.startDataIndex)}
                    onChange={e => store.setProperty("startDataIndex", e)}
                />
                <Select
                    readOnly
                    label="Định dạng số"
                    data={["100.000"]}
                    defaultValue={"100.000"}
                />
                <Select
                    readOnly
                    label="Định dạng ngày"
                    data={["dd/MM/yyyy"]}
                    defaultValue={"dd/MM/yyyy"}
                />
            </SimpleGrid>
            <Fieldset legend="Danh sách trường thông tin trong file dữ liệu">
                {store.state.data &&
                    <MyDataTable
                        columns={store.columns}
                        data={store.state.data as any}
                    />
                }
            </Fieldset>
            <MyFlexEnd>
                <Button
                    color="teal.8"
                    onClick={onExportStructure}>
                    Xuất file cấu trúc
                </Button>
                <Button
                    disabled={store.state.data?.length == 0}
                    color="blue.8"
                    leftSection={<IconArrowBigRight />}
                    onClick={() => stack.open('select-field-page')}>
                    Tiếp tục
                </Button>
                <Button
                    color="red.6"
                    leftSection={<IconSquareRoundedX />}
                    onClick={stack.closeAll}>
                    Đóng
                </Button>
            </MyFlexEnd>
        </Modal>
    )
}
