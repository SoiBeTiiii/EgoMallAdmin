'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Button, Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_cw38zkpvg4_Create from "./F_cw38zkpvg4_Create";
import F_cw38zkpvg4_Delete from "./F_cw38zkpvg4_Delete";
import F_cw38zkpvg4_Update from "./F_cw38zkpvg4_Update";
import baseAxios from "@/api/baseAxios";



export interface I_cw38zkpvg4_Read {
    id?: number; // STT
    code?: string; // Mã năm học - học kì
    name?: string; // Tên năm học - học kì
    note?: string; // Ghi chú
    isEnabled?: boolean; // Cho phép hiện
    concurrencyStamp?: string; // ID thay đổi
    coeSchoolYearId?: number; // Mã năm học
    coeSchoolYear?: Array<any>; // Năm học
    coeSchoolYearNew?: string; // Năm học mới
    numberWeek?: number; // Số tuần
    isCurrent?: boolean; // Hiện hành
    startDate?: Date | undefined; // Ngày bắt đầu
    endDate?: Date | undefined; // Ngày kết thúc
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date | undefined; // Ngày cập nhật
}

export default function F_cw38zkpvg4_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const form = useForm<I_cw38zkpvg4_Read>({
        initialValues: {},
    });

    // Query to fetch the mock data
    const query = useQuery<I_cw38zkpvg4_Read[]>({
        queryKey: ["F_cw38zkpvg4_Read"],
        queryFn: async () => {
            try {
                var response = await baseAxios.get("/COESemester/GetAll", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                var schoolYearResponse = await baseAxios.get("/COESchoolYear/GetAll", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                response.data.data.map((item: any) => {
                    item.coeSchoolYear = schoolYearResponse.data.data.find((year: any) => year.id === item.coeSchoolYearId);
                    item.coeSchoolYearName = item.coeSchoolYear?.name;
                })

                return response.data.data as I_cw38zkpvg4_Read[];
            } catch (error) {
                console.error('Error fetching data:', error);
                return [] as I_cw38zkpvg4_Read[];
            }
        },
    });

    const columns = useMemo<MRT_ColumnDef<I_cw38zkpvg4_Read>[]>(() => [
        { header: "Năm học - Học kì", accessorKey: "code", size: 200 },
        { header: "Tên năm học - Học kì", accessorKey: "name", size:220 },
        { header: "Năm học", accessorKey: "coeSchoolYearName" },
        {
            header: "Ngày bắt đầu", accessorKey: "startDate",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.startDate!));
            },
        },
        {
            header: "Ngày kết thúc", accessorKey: "endDate",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.endDate!));
            },
        },
        { header: "Số tuần", accessorKey: "numberWeek" },
        {
            header: "Hiện hành", accessorKey: "isCurrent",
            accessorFn: (row) => {

                return (
                    <Checkbox
                        checked={row.isCurrent}
                        disabled={true}
                    />
                )
            }
        },
        { header: "Ghi chú", accessorKey: "note" },
        { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        {
            header: "Ngày cập nhật", accessorKey: "ngayCapNhat",
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
            { fieldName: "note", header: "Ghi chú" },

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
                                <F_cw38zkpvg4_Create />
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
                            <F_cw38zkpvg4_Update values={row.original} />
                            <F_cw38zkpvg4_Delete id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    );
}