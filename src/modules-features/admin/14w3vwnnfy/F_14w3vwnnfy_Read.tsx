'use client'
import baseAxios from "@/api/baseAxios";
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
import F_14w3vwnnfy_Create from "./F_14w3vwnnfy_Create";
import F_14w3vwnnfy_Delete from "./F_14w3vwnnfy_Delete";
import F_14w3vwnnfy_Update from "./F_14w3vwnnfy_Update";

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

const unitType: Record<number, string> = {
    1: "Khoa",
    2: "Bộ môn",
    3: "Phòng",
    4: "Trung tâm",
};

export default function F_14w3vwnnfy_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    // Query to fetch mock data
    const query = useQuery<IUnit[]>({
        queryKey: ["F_14w3vwnnfy_Read"],
        queryFn: async () => {
            const response = await baseAxios.get("/COEUnit/Getall");
            return response.data.data || [];
        },
    });

    const columns = useMemo<MRT_ColumnDef<IUnit>[]>(() => [
        { header: "Mã đơn vị", accessorKey: "code" },
        { header: "Tên đơn vị", accessorKey: "name" },
        {
            header: "Loại đơn vị",
            accessorKey: "unitType",
            accessorFn: (row) => unitType[row.unitType as number] || "",
        },
        {
            header: "Trực thuộc", accessorKey: "unit.name",
            accessorFn: (row) => row.unit?.name || ""
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },
        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "unitCode", header: "Mã đơn vị" },
            { fieldName: "unitName", header: "Tên đơn vị" },
            { fieldName: "unitType", header: "Loại đơn vị" },
            { fieldName: "affiliated", header: "Trực thuộc" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    if (query.isLoading) return "Loading...";
    if (query.isError) return 'Không có dữ liệu...';

    return (
        <Fieldset legend={`Danh mục đơn vị`}>

            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <F_14w3vwnnfy_Create />
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form_multiple}
                                onSubmit={() => console.log(form_multiple.values)}
                            >
                                Import
                            </AQButtonCreateByImportFile>
                            <AQButtonExportData
                                isAllData={true}
                                objectName="dsUnit"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                            <Button leftSection={<IconTrash />} color="red">
                                Xóa
                            </Button>
                        </Group>
                    )}
                    columns={columns}
                    data={query.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <F_14w3vwnnfy_Update data={row.original} />
                            <F_14w3vwnnfy_Delete id={row.original.id!} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </Fieldset>
    );
}

