'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Checkbox, Fieldset, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

import baseAxios from "@/api/baseAxios";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { IconTrash } from "@tabler/icons-react";
import F_f0oia066vb_Create from "./F_f0oia066vb_Create";
import F_f0oia066vb_Delete from "./F_f0oia066vb_Delete";
import F_f0oia066vb_Update from "./F_f0oia066vb_Update";






export interface I_f0oia066vb_Read {
        order: number | null;
        note: string;
        nameEg: string;
        point: number | null;
        isFailed: boolean;
        id: number;
        code: string | null;
        name: string;
        concurrencyStamp: string;
        isEnabled: boolean;

        nguoiCapNhat?: string;
        ngayCapNhat?: Date;
}


export default function F_f0oia066vb_Read() {
   const AllQuery = useQuery<I_f0oia066vb_Read[]>({
           queryKey: ["F_f0oia066vb_Read"],
           queryFn: async () => {
               const result = await baseAxios.get("/COERatingPLO/GetAll");
               return result.data?.data || []
           }
    })
     const form_multiple = useForm<any>({
            initialValues: {
                importedData:[]    
            },
        })

    // Query to fetch the mock data
    // const AllUserQuery = useQuery<I_f0oia066vb_Read[]>({
    //     queryKey: ["F_f0oia066vb_Read"],
    //     queryFn: async () => data,
    // });

    const columns = useMemo<MRT_ColumnDef<I_f0oia066vb_Read>[]>(() => [
        { header: "Thứ tự", accessorKey: "order" },
        { header: "Xếp loại", accessorKey: "name" },
        { header: "Xếp loại tiếng Anh", accessorKey: "nameEg" },
        { header: "Điểm >=", accessorKey: "point" },
        {
            header: "Không đạt",
            accessorKey: "isFailed",
            accessorFn: (row) => {
                return (
                    <Checkbox checked={row.isFailed ?? false}
                        onChange={(event) => {
                            // Cập nhật state nếu có
                            // console.log("Checkbox changed:", event.currentTarget.checked);
                        }}
                    />
                )
            },
        },
        { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (originalRow) => U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!)),
        },
    ], []);
    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "order", header: "Thứ tự" },
            { fieldName: "name", header: "Xếp loại" },
            { fieldName: "nameEg", header: "Xếp loại tiếng Anh" },
            { fieldName: "point", header: "Điểm >= " },
            { fieldName: "isFailed", header: "Không Đạt" },
            { fieldName: "updatedBy", header: "Người cập nhật" },
            { fieldName: "updatedAt", header: "Ngày cập nhật" },
        ],
    };

    if (AllQuery.isLoading) return "Loading...";
    function setImportData(data: any): void {
        throw new Error("Function not implemented.");
    }

    return (
        <Fieldset legend={`Bảng xếp loại PLO`}>

            <MyFlexColumn>
                <MyDataTable

                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>
                                    <F_f0oia066vb_Create />
                                        <AQButtonCreateByImportFile 
                                        setImportedData={setImportData} 
                                        form={form_multiple}
                                        onSubmit={async() => console.log(form_multiple.values)}
                                        >
                                        Import
                                        </AQButtonCreateByImportFile>
                                    <AQButtonExportData
                                        isAllData={true}
                                        objectName="dsBangXepLoai"
                                        data={AllQuery.data!}
                                        exportConfig={exportConfig}
                                    />
                                    <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                                </Group>
                            </>
                        )
                    }}
                    columns={columns}
                    data={AllQuery.data || []}
                    renderRowActions={({ row }) => {
                        return (

                            <MyCenterFull>
                                <F_f0oia066vb_Update values={row.original} />
                                <F_f0oia066vb_Delete id={row.original.id!} />
                            </MyCenterFull>
                        )
                    }}
                />
            </MyFlexColumn>
        </Fieldset>
    );
}

// const data: I_f0oia066vb_Read[] = [
//     {
//         id: 1,
//         code: 1,
//         name: "Xuất sắc",
//         nameEg: "Perfect",
//         gradeEnglish: "",
//         scoreThreshold: 9,
//         notPassed: false,
//         updatedBy: "Nguyễn Văn A",
//         updatedAt: new Date("2024-01-15"),
//     },
//     {
//         id: 2,
//         code: 2,
//         name: "Tốt",
//         nameEg: "Excelent",
//         gradeEnglish: "",
//         scoreThreshold: 8,
//         notPassed: false,
//         updatedBy: "Nguyễn Văn A",
//         updatedAt: new Date("2024-01-15"),
//     },
//     {
//         id: 3,
//         code: 3,
//         name: "Khá",
//         nameEg: "Good",
//         gradeEnglish: "",
//         scoreThreshold: 7,
//         notPassed: false,
//         updatedBy: "Nguyễn Văn A",
//         updatedAt: new Date("2024-01-15"),
//     },
//     {
//         id: 4,
//         code: 4,
//         name: "Đạt",
//         nameEg: "Pass",
//         gradeEnglish: "",
//         scoreThreshold: 5,
//         notPassed: false,
//         updatedBy: "Nguyễn Văn A",
//         updatedAt: new Date("2024-01-15"),
//     },
//     {
//         id: 5,
//         code: 5,
//         name: "Không đạt",
//         nameEg: "Not pass",
//         gradeEnglish: "",
//         scoreThreshold: 0,
//         notPassed: true,
//         updatedBy: "Nguyễn Văn A",
//         updatedAt: new Date("2024-01-15"),
//     },

// ];