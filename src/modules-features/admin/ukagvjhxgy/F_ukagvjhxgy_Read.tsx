'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_ukagvjhxgy_Create from "./F_ukagvjhxgy_Create";
import F_ukagvjhxgy_Delete from "./F_ukagvjhxgy_Delete";
import F_ukagvjhxgy_Update from "./F_ukagvjhxgy_Update";
import baseAxios from "@/api/baseAxios";



export interface I_ukagvjhxgy_Read {
    id?: number; // STT
    code?: string; // Mã khóa
    name?: string; // Tên khóa
    coeSemesterStartId?: number; // Học kì bắt đầu
    coeSemesterEndId?: number; // Học kì kết thúc
    coeTrainingLevelId?: number; // 
    coeProgramId?: number;
    coeUnitId?: number;
    coeSemesterStart?: string | null;
    coeSemesterEnd?: string | null;
    coeTrainingLevel?: string | null;
    coeProgram?: string | null;
    coeProgramName?: string | null;
    coeUnit?: string | null;
    coeUnitName?: string | null;
    note?: string; // Ghi chú
    concurrencyStamp?: string; // ID thay đổi
    isEnabled?: boolean; // Đã xóa
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date | undefined; // Ngày cập nhật
}

export default function F_ukagvjhxgy_Read() {
    const [importData, setImportData] = useState(false);
    
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const form = useForm<I_ukagvjhxgy_Read>({
        initialValues: {},
    });

    // Query to fetch the mock data
    const query = useQuery<I_ukagvjhxgy_Read[]>({
        queryKey: ["F_ukagvjhxgy_Read"],
        queryFn: async () => {
            try {
                const response = await baseAxios.get("/COEGrade/GetAll");
                const unitResponse = await baseAxios.get("/COEUnit/GetAll");
                const programResponse = await baseAxios.get("/COEProgram/GetAll");

                response.data.data.forEach((item: any) => {
                    item.coeProgram = programResponse.data.data.find((program: any) => program.id === item.coeProgramId);
                    item.coeProgramName = item.coeProgram?.name;

                    if (item.coeProgramName) {
                        item.coeUnitId = item.coeProgram.coeUnitId;
                        item.coeUnit = unitResponse.data.data.find((program: any) => program.id === item.coeUnitId);
                        item.coeUnitName = item.coeUnit?.name;
                    }
                });

                return response.data.data as I_ukagvjhxgy_Read[];
            } catch (error) {
                console.error('Error fetching data:', error);
                return [] as I_ukagvjhxgy_Read[];
            }
        },
    });

    const columns = useMemo<MRT_ColumnDef<I_ukagvjhxgy_Read>[]>(() => [
        { header: "Mã khóa", accessorKey: "code" },
        { header: "Tên khóa", accessorKey: "name" },
        { header: "Chương trình", accessorKey: "coeProgramName" },
        { header: "Khoa", accessorKey: "coeUnitName" },
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
        }


    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "code", header: "Mã khóa" },
            { fieldName: "name", header: "Tên khóa" },
            { fieldName: "coeProgramName", header: "Chương trình" },
            { fieldName: "coeUnitName", header: "Khoa" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };
    if (query.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <F_ukagvjhxgy_Create />
                                <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                    console.log(form_multiple.values);

                                }} >s</AQButtonCreateByImportFile>
                                <AQButtonExportData
                                    isAllData={true}
                                    objectName="dsKhoa"
                                    data={query.data!}
                                    exportConfig={exportConfig}
                                />
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
                            <F_ukagvjhxgy_Update values={row.original} />
                            <F_ukagvjhxgy_Delete id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    );
}