'use client';

import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Checkbox, Fieldset, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_fmc2n1ftq1_Create from "./F_fmc2n1ftq1_Create";
import F_fmc2n1ftq1_Delete from "./F_fmc2n1ftq1_Delete";
import baseAxios from "@/api/baseAxios";
import F_fmc2n1ftq1_Update from "./F_fmc2n1ftq1_Update";


export interface F_fmc2n1ftq1_Read {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    nameEg: string;
    point: number;
    isStorage: boolean;
    note: string;
    order?: number | null;
    isFailed?: boolean | null;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_fmc2n1ftq1_Read() {
    const COERubricsMethodQuery = useQuery<F_fmc2n1ftq1_Read[]>({
        queryKey: ["F_fmc2n1ftq1_Read"],
        queryFn: async () => {
            const response = await baseAxios.get("/COERubricsMethod/GetAll");
            return response.data.data || [];
        },
    })

    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<F_fmc2n1ftq1_Read>[]>(() => [
        { header: "Thứ tự", accessorKey: "order" },
        { header: "Xếp loại", accessorKey: "name" },
        { header: "Xếp loại tiếng Anh", accessorKey: "nameEg" },
        { header: "Điểm >=", accessorKey: "point" },
        {
            header: "Không lưu trữ",
            accessorKey: "isFailed",
            accessorFn: (row) => {
                return (
                    <Checkbox checked={row.isFailed ?? false}
                        onChange={(event) => {}
                    }
                    />
                )
            },
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
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
        }
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "code", header: "Thứ tự" },
            { fieldName: "name", header: "Xếp loại" },
            { fieldName: "nameEg", header: "Xếp loại tiếng Anh" },
            { fieldName: "point", header: "Điểm >=" },
            { fieldName: "isFailed", header: "Không lưu trữ" },
            { fieldName: "note", header: "ghi chú" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    if (COERubricsMethodQuery.isLoading) return "Loading...";
    if (COERubricsMethodQuery.isError) return "Loading...";

    return (

        <Fieldset legend={`Thang đo Rubrics`}>
            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <F_fmc2n1ftq1_Create />
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form_multiple}
                                onSubmit={() => console.log(form_multiple.values)}
                            >
                                Import
                            </AQButtonCreateByImportFile>
                            <AQButtonExportData
                                isAllData={true}
                                objectName="dsRank"
                                data={COERubricsMethodQuery.data!}
                                exportConfig={exportConfig}
                            />
                            <Button leftSection={<IconTrash />} color="red">
                                Xóa
                            </Button>
                        </Group>
                    )}
                    columns={columns}
                    data={COERubricsMethodQuery.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <F_fmc2n1ftq1_Update data={row.original || {}} />
                            <F_fmc2n1ftq1_Delete id={row.original.id!} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </Fieldset>
    );
}

// const rankData: F_fmc2n1ftq1_Read[] = [
//     {
//         id: 1,
//         order: 1,
//         rank: "Xuất sắc",
//         englishRank: "",
//         point: 9,
//         notArchived: false,
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     },
//     {
//         id: 2,
//         order: 2,
//         rank: "Giỏi",
//         englishRank: "",
//         point: 8,
//         notArchived: false,
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     },
//     {
//         id: 3,
//         order: 3,
//         rank: "Khá",
//         englishRank: "",
//         point: 6.5,
//         notArchived: false,
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     },
//     {
//         id: 4,
//         order: 4,
//         rank: "Trung bình",
//         englishRank: "",
//         point: 4,
//         notArchived: false,
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     },
//     {
//         id: 5,
//         order: 5,
//         rank: "Không đạt",
//         englishRank: "",
//         point: 0,
//         notArchived: true,
//         nguoiCapNhat: 'Admin',
//         ngayCapNhat: new Date('2024-12-20'),
//     }
// ];