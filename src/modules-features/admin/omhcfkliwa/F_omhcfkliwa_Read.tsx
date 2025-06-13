'use client'
import baseAxios from "@/api/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Button, Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_omhcfkliwa_Create from "./F_omhcfkliwa_Create";
import F_omhcfkliwa_Delete from "./F_omhcfkliwa_Delete";
import F_omhcfkliwa_Update from "./F_omhcfkliwa_Update";



export interface F_omhcfkliwa_Read {
    id?: number;
    code?: string;
    name?: string;
    startDate?: Date;
    endDate?: Date;
    startDateHC?: Date;
    endDateHC?: Date;
    isEnabled?: boolean;
    isCurrent?: boolean;
    concurrencyStamp?: string;
    note?: string;
}



export default function F_omhcfkliwa_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const form = useForm<F_omhcfkliwa_Read>({
        initialValues: {},
    });

    const formatDate = (dateString?: Date) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    // Query to fetch the mock data
    const query = useQuery<any[]>({
        queryKey: ["F_ukagvjhxgy_Read"],
        queryFn: async () => {
            const result = await baseAxios.get("/COESchoolYear/getAll");

            return result.data.data
        },
    });




    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        { header: "Năm học", accessorKey: "code" },
        { header: "Tên năm học", accessorKey: "name" },
        {
            header: "Ngày bắt đầu năm học",
            accessorKey: "startDate",
            accessorFn: (row) => formatDate(row.startDate),
        },
        {
            header: "Ngày kết thúc năm học",
            accessorKey: "endDate",
            accessorFn: (row) => formatDate(row.endDate),
        },
        {
            header: "Ngày bắt đầu năm hành chính",
            accessorKey: "startDateHC",
            accessorFn: (row) => formatDate(row.startDateHC),
        },
        {
            header: "Ngày kết thúc năm hành chính",
            accessorKey: "endDateHC",
            accessorFn: (row) => formatDate(row.endDateHC),
        },
        { header: "Hiện hành", accessorKey: "isCurrent", accessorFn: (row) => <Checkbox checked={row.isCurrent} onChange={() => { }}></Checkbox> },
        { header: "Ghi chú", accessorKey: "note" },
    ], [query.data]);





    if (query.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <MyDataTable
                exportAble
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <F_omhcfkliwa_Create />
                                <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                    console.log(form_multiple.values);

                                }} >s</AQButtonCreateByImportFile>

                                <Button
                                    leftSection={<IconTrash />}
                                    color="red"
                                >
                                    Xóa
                                </Button>
                            </Group>
                        </>
                    )
                }}
                columns={columns}
                data={query.data || []}
                renderRowActions={({ row }) => {
                    return (

                        <MyCenterFull>
                            <F_omhcfkliwa_Update values={row.original} />
                            <F_omhcfkliwa_Delete id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    );
}



