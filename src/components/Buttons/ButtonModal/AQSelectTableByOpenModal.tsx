import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { T0MANTINE_SIZE } from "@/types/types";
import { Button, ButtonProps, Fieldset, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef, MRT_RowData, MRT_TableOptions } from "mantine-react-table";

interface IAQSelectTableByOpenModal<TData extends MRT_RowData> extends Omit<MRT_TableOptions<TData>, "data">, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style">, ButtonProps {
    label?: string;
    listLabel?: string;
    title?: string;
    modalSize?: T0MANTINE_SIZE;
    objectName?: string
    fullScreen?: boolean;
    setSelectedData: (data: any) => void;
    data?: any;
    columns: MRT_ColumnDef<TData>[];
    API?: string;
    closeAfterSelect?: boolean;
}

export default function AQSelectTableByOpenModal<TData extends MRT_RowData>({
    setSelectedData,
    data,
    columns,
    API,
    modalSize,
    title,
    label,
    listLabel,
    objectName,
    fullScreen = false,
    closeAfterSelect = true,
    ...rest
}: IAQSelectTableByOpenModal<TData>) {
    const disclosure = useDisclosure(false)
    return (
        <>
            <Button
                onClick={disclosure[1].open}
                {...rest}
            >
                {label ? label : `Chọn từ danh sách`}
            </Button>
            <Modal
                fullScreen={fullScreen}
                size={modalSize}
                title={title}
                opened={disclosure?.[0]}
                onClose={disclosure[1].close}
            >
                <MyFlexColumn>
                    <Fieldset legend={listLabel ? listLabel : "Danh sách"}>
                        <MyDataTable
                            renderTopToolbarCustomActions={({ table }) => {
                                return <Button onClick={() => {
                                    setSelectedData(table.getSelectedRowModel().rows.map((row) => row.original))
                                    closeAfterSelect && disclosure[1].close()
                                }}>Chọn</Button>
                            }}
                            enableRowSelection
                            data={data!}
                            columns={columns}
                            {...rest}
                        />
                    </Fieldset>
                </MyFlexColumn>
            </Modal>
        </>
    )
}