"use client"
import { Button, Group } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { ConfigOptions, download, generateCsv, mkConfig } from 'export-to-csv';
import {
    MantineReactTable,
    MRT_Row,
    MRT_TableInstance,
    useMantineReactTable,
    type MRT_ColumnDef,
    type MRT_RowData,
    type MRT_TableOptions
} from 'mantine-react-table';
import { MRT_Localization_VI } from "mantine-react-table/locales/vi/index.cjs";
import { ReactNode, useEffect } from 'react';

type FormatFunction<TData extends MRT_RowData> = (value: any) => any;

interface IDataTable<TData extends MRT_RowData> extends MRT_TableOptions<TData> {
    columns: MRT_ColumnDef<TData>[]; // Table columns
    data: TData[]; // Table data
    rowActionSize?: number; // Row action button size
    exportAble?: boolean; // Flag to enable export all data
    renderTopToolbarCustomActions?: ((props: {
        table: MRT_TableInstance<TData>;
    }) => ReactNode) | undefined,
    csvConfigProps?: ConfigOptions,
    formats?: {
        [K in keyof TData]?: FormatFunction<TData>;
    };
    setSelectedRow?: (data: any) => void;
}

function formatData<TData extends MRT_RowData>(
    data: TData[],
    formats: {
        [K in keyof TData]?: FormatFunction<TData>;
    }
): TData[] {
    return data.map((row) => {
        const transformedRow: Partial<TData> = {};
        Object.entries(row).forEach(([key, value]) => {
            // Type-safe format application
            const formatFn = formats[key as keyof TData];

            // Special handling for Date type
            if (value instanceof Date) {
                transformedRow[key as keyof TData] = formatFn
                    ? formatFn(value.toISOString())
                    : value.toISOString();
            }
            // Special handling for objects (excluding null)
            else if (value !== null && typeof value === "object") {
                transformedRow[key as keyof TData] = formatFn
                    ? formatFn(JSON.stringify(value))
                    : JSON.stringify(value);
            }
            // General case
            else {
                transformedRow[key as keyof TData] = formatFn ? formatFn(value) : value;
            }
        });
        return transformedRow as TData;
    });
}


export function MyDataTable<TData extends MRT_RowData>(
    { formats = {}, exportAble = false, csvConfigProps, rowActionSize, columns, data, renderTopToolbarCustomActions, setSelectedRow, ...rest }: IDataTable<TData>) {
    const { renderRowActions } = { ...rest };
    const csvConfig = mkConfig({
        fieldSeparator: ',',
        decimalSeparator: '.',
        useKeysAsHeaders: csvConfigProps?.columnHeaders ? false : true,
        ...csvConfigProps
    });

    const handleExport = (rows: MRT_Row<TData>[]) => {
        if (rows.length == 0) {
            const transformedData = formatData(data, formats); // Sử dụng formats từ props
            const csv = generateCsv(csvConfig)(transformedData);
            download(csvConfig)(csv);
            return
        }
        const rowData = rows.map((row) => row.original);
        const transformedRows = formatData(rowData, formats);
        const csv = generateCsv(csvConfig)(transformedRows);
        download(csvConfig)(csv);
    };

    const table = useMantineReactTable({
        columns,
        data,
        renderTopToolbarCustomActions: ({ table }) => {
            return (
                <Group>
                    {renderTopToolbarCustomActions && renderTopToolbarCustomActions({ table: table })}
                    {exportAble &&
                        <>
                            {/* <Button
                                color='green.8'
                                onClick={() => handleExport(table.getSelectedRowModel().rows)}
                                leftSection={<IconDownload />}
                                variant="filled"
                            >
                                Import
                            </Button> */}

                            <Button
                                color='green.8'
                                onClick={() => handleExport(table.getSelectedRowModel().rows)}
                                leftSection={<IconDownload />}
                                variant="filled"
                            >
                                Export
                            </Button>

                        </>

                    }
                </Group>
            );
        },
        enableRowNumbers: true,
        enableRowSelection: exportAble,
        enableEditing: renderRowActions ? true : false,
        positionActionsColumn: "last",
        enableColumnResizing: true,
        layoutMode: "semantic",
        displayColumnDefOptions: {
            "mrt-row-actions": {
                header: "Thao tác",
                size: rowActionSize,
            },
            "mrt-row-numbers": {
                Header: "STT",
                size: 1
            },
        },
        enableColumnPinning: true,
        initialState: {
            density: "md",
            pagination: { pageIndex: 0, pageSize: 30 },
            columnPinning: { right: ["mrt-row-actions"] },
            columnVisibility: {
                nguoiCapNhat: false,
                ngayCapNhat: false
            }
        },
        mantineTableHeadCellProps: {
            style: {
                verticalAlign: "middle",
                paddingTop: "2px",
                paddingBottom: "2px",
            },
        },
        mantineTableBodyCellProps: {
            style: {
                paddingTop: "2px",
                paddingBottom: "2px",
            },
        },
        localization: MRT_Localization_VI,
        ...rest, // Override default table options
    });


    useEffect(() => {
        setSelectedRow && setSelectedRow(table.getSelectedRowModel().rows.map((row) => row.original));
    }, [table.getState().rowSelection]);

    if (data == undefined) return
    return <MantineReactTable table={table} />;
}
