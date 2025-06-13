import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { ActionIcon, Button, Fieldset, Group, MantineSize, Modal } from "@mantine/core";
import { useDisclosure, useListState } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { MRT_ColumnDef, MRT_RowData, MRT_TableInstance, MRT_TableOptions } from "mantine-react-table";
import { ReactNode } from "react";

interface IDataTable<TData extends MRT_RowData> extends Omit<MRT_TableOptions<TData>, "data"> {
    listLabel?: string;
    columns: MRT_ColumnDef<TData>[];
    data?: TData[];
    renderTopToolbarCustomActions?: ((props: {
        table: MRT_TableInstance<TData>;
    }) => ReactNode) | undefined,
    listState: ReturnType<typeof useListState<TData>>;
    selectButtonlabel?: string,
    modalSize?: MantineSize
}

export default function MyDataTableSelect<TData extends MRT_RowData>({ modalSize, renderTopToolbarCustomActions, data, selectButtonlabel, listState, columns, listLabel, ...rest }: IDataTable<TData>) {
    const disc = useDisclosure(false)
    if (data == undefined) return "Đang tải..."
    return (
        <Fieldset legend={listLabel ? listLabel : "Danh sách"}>
            <MyDataTable
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <Group>
                            {renderTopToolbarCustomActions && renderTopToolbarCustomActions({ table: table })}
                            <Button onClick={disc[1].open}>{selectButtonlabel || "Chọn từ danh sách"}</Button>
                        </Group>
                    )
                }}
                columns={columns}
                data={listState[0] as TData[]}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <ActionIcon color="red" onClick={() => listState[1].remove(row.index)}><IconX /></ActionIcon>
                        </MyCenterFull>
                    )
                }}
                {...rest} />

            <Modal opened={disc[0]} onClose={disc[1].close} size={modalSize || "80%"}>
                <MyDataTable
                    renderTopToolbarCustomActions={({ table }) => {
                        return <Button onClick={() => {
                            table.getSelectedRowModel().rows.map(item => listState[1].append(item.original))
                            disc[1].close()
                        }}>Chọn</Button>
                    }}
                    enableRowSelection
                    data={data!}
                    columns={columns}
                    {...rest} />
            </Modal>
        </Fieldset>
    )
}
