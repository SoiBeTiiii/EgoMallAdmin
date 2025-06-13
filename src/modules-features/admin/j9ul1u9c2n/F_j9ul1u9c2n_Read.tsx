"use client";
import baseAxios from "@/api/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Button, Fieldset, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_j9ul1u9c2n_Create from "./F_j9ul1u9c2n_Create";
import F_j9ul1u9c2n_Delete from "./F_j9ul1u9c2n_Delete";
import F_j9ul1u9c2n_Update from "./F_j9ul1u9c2n_Update";

export interface I_j9ul1u9c2n_Read {
    nameEg?: string,
    regulationId?: number | null,
    note?: string,
    regulation?: I_j9ul1u9c2n_Read | null,
    id?: number,
    code?: string,
    name?: string,
    concurrencyStamp?: string,
    isEnabled?: boolean,
    // nguoiCapNhat?: string;
    // ngayCapNhat?: Date | undefined;
}

export default function F_j9ul1u9c2n_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const AllRegulation = useQuery<I_j9ul1u9c2n_Read[]>({
        queryKey: ["F_j9ul1u9c2n_Read"],
        queryFn: async () => {
            const result = await baseAxios.get<{ data: I_j9ul1u9c2n_Read[] }>('/COERegulation/getall');
            return result.data?.data || [];
        },
    });

    const columns = useMemo<MRT_ColumnDef<I_j9ul1u9c2n_Read>[]>(() => [
        { header: "Mã quy chế", accessorKey: "code" },
        { header: "Tên quy chế", accessorKey: "name" },
        {
            header: "Trực thuộc",
            accessorFn: (originalRow) => originalRow.regulation ? originalRow.regulation.name : "",
        },
        { header: "Ghi chú", accessorKey: "note" },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "code", header: "Mã quy chế" },
            { fieldName: "name", header: "Tên quy chế" },
            { fieldName: "nameEg", header: "Tên quy chế Eg" },
            { fieldName: "regulation.name", header: "Trực thuộc" },
            { fieldName: "note", header: "Ghi chú" },
        ],
    };

    if (AllRegulation.isLoading) return "Loading...";

    return (
        <Fieldset legend={`Danh mục quy chế`}>
            <MyFlexColumn>
                <MyDataTable
                    columns={columns}
                    data={AllRegulation.data || []}
                    enableRowSelection={true}
                    renderTopToolbarCustomActions={() => (
                        <>
                            <Group>
                                <F_j9ul1u9c2n_Create />
                                <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                    console.log(form_multiple.values);
                                }}>

                                </AQButtonCreateByImportFile>
                                <AQButtonExportData
                                    isAllData={true}
                                    objectName="dsQuyche"
                                    data={AllRegulation.data || []}
                                    exportConfig={exportConfig}
                                />
                                <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                            </Group>
                        </>
                    )}

                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <F_j9ul1u9c2n_Update values={row.original} />
                            <F_j9ul1u9c2n_Delete id={row.original.id!} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </Fieldset>
    );
}
