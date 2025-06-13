'use client'
import baseAxios from "@/api/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_zudcgcvda8_Create from "./F_zudcgcvda8_Create";
import F_zudcgcvda8_Delete from "./F_zudcgcvda8_Delete";
import F_zudcgcvda8_Update from "./F_zudcgcvda8_Update";

export interface I_subject_group {
    id?: number; // STT
    code?: string; // Mã nhóm môn học
    name?: string; // Tên nhóm môn học
    note?: string; // Ghi chú
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_zudcgcvda8_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    const form = useForm<I_subject_group>({
        initialValues: {},
    });

    // Query to fetch the mock data
    const query = useQuery<I_subject_group[]>({
        queryKey: ["F_zudcgcvda8_Read"],
        queryFn: async () => {
            const result = await baseAxios.get(`/COESubjectGroup/GetAll`);
            return result.data?.data || []
        },
    });

    const columns = useMemo<MRT_ColumnDef<I_subject_group>[]>(() => [
        { header: "Mã nhóm môn học", accessorKey: "code" },
        { header: "Tên nhóm môn học", accessorKey: "name" },
        { header: "Ghi chú", accessorKey: "note" },
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
            { fieldName: "code", header: "Mã nhóm môn học" },
            { fieldName: "name", header: "Tên nhóm môn học" },
            { fieldName: "note", header: "Ghi chú" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    if (query.isLoading) return "Loading...";
    if (query.isError) return 'Không có dữ liệu...';

    return (
        <MyFlexColumn>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <Group>
                            <F_zudcgcvda8_Create />
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form_multiple}
                                onSubmit={() => console.log(form_multiple.values)}
                            >
                                Import
                            </AQButtonCreateByImportFile>
                            <AQButtonExportData
                                isAllData={true}
                                objectName="dsNhomMonHoc"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                            <Button leftSection={<IconTrash />} color="red">
                                Xóa
                            </Button>
                        </Group>
                    );
                }}
                columns={columns}
                data={query.data || []}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F_zudcgcvda8_Update data={row.original} />
                            <F_zudcgcvda8_Delete id={row.original.id!} />
                        </MyCenterFull>
                    );
                }}
            />
        </MyFlexColumn>
    );
}
