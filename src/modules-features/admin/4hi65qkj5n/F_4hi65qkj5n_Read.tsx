'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Fieldset, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_4hi65qkj5n_Create from "./F_4hi65qkj5n_Create";
import F_4hi65qkj5n_Delete from "./F_4hi65qkj5n_Delete";
import F_4hi65qkj5n_Update from "./F_4hi65qkj5n_Update";
import baseAxios from "@/api/baseAxios";




export interface I_4hi65qkj5n_Read {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    nameEg: string;
    note: string;
    updatedBy?: string;
    updatedAt?: Date | undefined;
}


export default function F_4hi65qkj5n_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I_4hi65qkj5n_Read[]>({
        queryKey: ["F_hahgkfzpul_Read"],
        queryFn: async () => {
            const result = await baseAxios.get("/COETrainingSystem/GetAll");
            return result.data.data || [];
        }
    });
    const columns = useMemo<MRT_ColumnDef<I_4hi65qkj5n_Read>[]>(() => [
        { header: "Mã hệ", accessorKey: "code" },
        { header: "Tên hệ", accessorKey: "name" },
        { header: "Ghi chú", accessorKey: "note" },
        // { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        //     accessorFn: (originalRow) => U0DateToDDMMYYYString(new Date(originalRow.updatedAt!)),
        // },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "code", header: "Mã quy chế" },
            { fieldName: "name", header: "Tên quy chế" },
            // { fieldName: "base", header: "Trực thuộc" },
            // { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            // { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <Fieldset legend={`Danh mục hệ đào tạo`}>

            <MyFlexColumn>
                <MyDataTable

                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>
                                    <F_4hi65qkj5n_Create />
                                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                        console.log(form_multiple.values);

                                    }} >s</AQButtonCreateByImportFile>
                                    <AQButtonExportData
                                        isAllData={true}
                                        objectName="dmHeDaoTao"
                                        data={AllUserQuery.data || []}
                                        exportConfig={exportConfig}
                                    />
                                    <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                                </Group>
                            </>
                        )
                    }}
                    columns={columns}
                    data={AllUserQuery.data || []}
                    renderRowActions={({ row }) => {
                        return (

                            <MyCenterFull>
                                <F_4hi65qkj5n_Update values={row.original} />
                                <F_4hi65qkj5n_Delete id={row.original.id!} />
                            </MyCenterFull>
                        )
                    }}
                />
            </MyFlexColumn>
        </Fieldset>
    );
}

// const data: I_4hi65qkj5n_Read[] = [
//     {
//         id: 1,
//         code: "CQ",
//         name: "Chính quy",
//         nameEg: "Offline",
//     },
//     {
//         id: 2,
//         code: "TX",
//         name: "Từ xa",
//         nameEg: "Online",

//     },
// ];