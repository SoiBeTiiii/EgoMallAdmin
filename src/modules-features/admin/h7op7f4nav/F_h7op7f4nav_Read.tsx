"use client";

import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

import baseAxios from "@/api/baseAxios";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import F_h7op7f4nav_Create from "./F_h7op7f4nav_Create";
import F_h7op7f4nav_Delete from "./F_h7op7f4nav_Delete";
import F_h7op7f4nav_Update from "./F_h7op7f4nav_Update";

export interface I_h7op7f4nav_Read {
    id?: number;
    code?: string;
    name?: string;
    note?: string;
    coeUnitId?: number;
    coeUnit?: number | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    updatedBy?: string;
    updatedAt?: Date | undefined;
}

export interface IUnit {
    id?: number;
    code?: string;
    name?: string;
    unitType?: number;
    unitId?: number;
    note?: string;
    unit?: IUnit;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

export default function F_h7op7f4nav_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    const programQuery = useQuery<I_h7op7f4nav_Read[]>({
        queryKey: ["F_h7op7f4nav_Read"],
        queryFn: async () => {
            const response = await baseAxios.get("/COEProgram/Getall?cols=COEUnit");
            return response.data.data || [];
        },
    });

    const columns = useMemo<MRT_ColumnDef<I_h7op7f4nav_Read>[]>(() => [
        { header: "Mã chương trình", accessorKey: "code" },
        { header: "Tên chương trình", accessorKey: "name" },
        {
            header: "Khoa quản lý",
            accessorKey: "coeUnit.name",
        },
        { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (originalRow) => U0DateToDDMMYYYString(new Date(originalRow.updatedAt!)),
        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "code", header: "Mã chương trình" },
            { fieldName: "name", header: "Tên chương trình" },
            { fieldName: "coeUnitId", header: "Khoa quản lý" },
            { fieldName: "updatedBy", header: "Người cập nhật" },
            { fieldName: "updatedAt", header: "Ngày cập nhật" },
        ],
    };

    if (programQuery.isLoading) return "Loading...";
    if (programQuery.isError) return 'Không có dữ liệu...';

    return (
        <MyFlexColumn>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <F_h7op7f4nav_Create />
                        <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                            console.log(form_multiple.values);
                        }} />
                        <AQButtonExportData
                            isAllData={true}
                            objectName="dmChuongTrinh"
                            data={programQuery.data || []}
                            exportConfig={exportConfig}
                        />
                        <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                    </Group>
                )}
                columns={columns}
                data={programQuery.data || []}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F_h7op7f4nav_Update values={row.original} />
                        <F_h7op7f4nav_Delete id={row.original.id!} />
                    </MyCenterFull>
                )}
            />
        </MyFlexColumn>
    );
}

