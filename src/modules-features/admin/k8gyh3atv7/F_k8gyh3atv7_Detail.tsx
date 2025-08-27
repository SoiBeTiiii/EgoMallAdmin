'use client';

import baseAxios from "@/api/baseAxios";
import { Fieldset, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile,  MyCenterFull, MyDataTable, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_k8gyh3atv7_Create from "./F_k8gyh3atv7_Create";
import F_k8gyh3atv7_Delete from "./F_k8gyh3atv7_Delete";
import F_k8gyh3atv7_Update from "./F_k8gyh3atv7_Update";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";

interface Zone {
  id: number;
  province_code: string;
  fee: number;
  is_available: boolean;
  created_at: string; 
}

interface ShippingMethod {
  id: number;
  name: string;
  description: string;
  estimated_time: string;
  is_active: boolean;  
  is_default: boolean; 
  created_at: string; 
  zones: Zone[];
}

export default function F_k8gyh3atv7_Detail() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    const AllQuery = useQuery<ShippingMethod[]>({
        queryKey: ["F_k8gyh3atv7_Detail"],
        queryFn: async () => {
            const AllQuery = await baseAxios.get("/shipping-methods");
            return AllQuery.data.data
        }
    });
    const columns = useMemo<MRT_ColumnDef<ShippingMethod>[]>(() => [
        {
            header: "Phương thức giao hàng",
            accessorKey: "name"
        },
        {
            header: "Mô tả",
            accessorKey: "description"
        },
        {
            header: "Thời gian giao hàng",
            accessorKey: "estimated_time"
        },
        {
            header: "Trạng thái",
            Cell: ({ row }) => row.original.is_active ? "Hoạt động" : "Không hoạt động",
        },
        {
            header: "Giao hàng tiêu chuẩn",
            Cell: ({ row }) => row.original.is_default ? "Có" : "Không",
        },
        {
            header: "Thời gian tạo",
            accessorKey: "created_at"
        },
    ], []);
    const exportConfig = {
        fields: [
            { fieldName: "name", header: "Phương thức giao hàng" },
            { fieldName: "description", header: "Mô tả" },
            { fieldName: "estimated_time", header: "Thời gian giao hàng" },
            { fieldName: "is_active", header: "Trạng thái" },
            { fieldName: "is_default", header: "Giao hàng tiêu chuẩn" },
            { fieldName: "created_at", header: "Thời gian tạo" },
        ],
    };
    if (AllQuery.isLoading) return "Loading";
    if (AllQuery.isError) return "Error";
    return (
        <Fieldset legend="Danh sách phương thức giao hàng">
            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>
                                    <F_k8gyh3atv7_Create />
                                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                        console.log(form_multiple.values);

                                    }}>s</AQButtonCreateByImportFile>
                                    <AQButtonExportData
                                        isAllData={true}
                                        objectName="PTGH"
                                        data={AllQuery.data || []}
                                        exportConfig={exportConfig} />
                                </Group>
                            </>
                        );
                    }}
                    columns={columns}
                    data={AllQuery.data || []}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <F_k8gyh3atv7_Update values={row.original} />
                                <F_k8gyh3atv7_Delete id={row.original.id} />
                            </MyCenterFull>
                        )
                    }
                    }
                />
            </MyFlexColumn>
        </Fieldset>
    )
}