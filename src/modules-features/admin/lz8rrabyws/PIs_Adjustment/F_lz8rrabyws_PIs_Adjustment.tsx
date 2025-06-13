'use client'
import baseAxios from "@/api/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_lz8rrabyws_Create_PIs_Adjustment from "./F_lz8rrabyws_Create_PIs_Adjustment";
import F_lz8rrabyws_Delete_PIs_Adjustment from "./F_lz8rrabyws_Delete_PIs_Adjustment";
import F_lz8rrabyws_Update_PIs_Adjustment from "./F_lz8rrabyws_Update_PIs_Adjustment";


export default function IPis_Read({ id }: { id: number }) {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const form = useForm<any>({
        initialValues: {},
    });

    const query = useQuery<any>({
        queryKey: ["IPis_Read", id],
        queryFn: async () => {
            const result = await baseAxios.get(`/COEPI/GetSubjectByGradeId?COEGradeId=${id}&cols=COEPLO`);
            return result.data?.data ?? []
        },
    });
    const ploId = useQuery<any>({
        queryKey: ["ploID", id],
        queryFn: async () => {
            const result = await baseAxios.get(`/COEPLO/GetCOEPLOByGrade?COEGradeId=${id}`)

            return result.data?.data || []
        },
    });

    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        { header: "Mã PLO", accessorKey: "ploCode", Cell: ({ row }) => row.original.coeplo?.code },
        { header: "Tỷ trọng PLO", accessorKey: "ploDensity", Cell: ({ row }) => `${row.original.coeplo?.densityPLO}%` },
        { header: "Mã PIs", accessorKey: "pisCode", Cell: ({ row }) => row.original.code },
        { header: "Tỷ trọng PIs", accessorKey: "pisDensity", Cell: ({ row }) => `${row.original.densityPI}%` },
        { header: "Mô tả", accessorKey: "description", Cell: ({ row }) => row.original.description },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "ploCode", header: "Mã PLO" },
            { fieldName: "ploDensity", header: "Tỷ trọng PLO" },
            { fieldName: "pisCode", header: "Mã PIs" },
            { fieldName: "pisDensity", header: "Tỷ trọng PIs" },
            { fieldName: "description", header: "Mô tả" },
        ],
    };

    if (query.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <MyDataTable
                exportAble
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <F_lz8rrabyws_Create_PIs_Adjustment data={ploId.data} />
                        <AQButtonCreateByImportFile
                            setImportedData={setImportData}
                            form={form_multiple}
                            onSubmit={() => console.log(form_multiple.values)}
                        >
                            Import
                        </AQButtonCreateByImportFile>
                        {/* <AQButtonExportData
                            isAllData={true}
                            objectName="dsIPis"
                            data={query.data!}
                            exportConfig={exportConfig}
                        /> */}
                        <Button leftSection={<IconTrash />} color="red">
                            Xóa
                        </Button>

                    </Group>
                )}
                columns={columns}
                data={query.data || []}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F_lz8rrabyws_Update_PIs_Adjustment data={row.original} />
                        <F_lz8rrabyws_Delete_PIs_Adjustment id={row.original.id!} />
                    </MyCenterFull>
                )}
            />
        </MyFlexColumn>
    );
}
