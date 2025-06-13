'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_hahgkfzpu_Delete from "./F_hahgkfzpu_Delete";
import F_hahgkfzpu_Update from "./F_hahgkfzpu_Update";
import F_hahgkfzpul_Create from "./F_hahgkfzpul_Create";




export interface I_hahgkfzpul_Read {
    id?: number;          // Unique identifier
    code?: string;        // Course Objective (CO) code
    description?: string; // Description of the CO
    courseCode?: string;  // Course name
    courseName?: string;
    manageUnit?: string;  // Managing unit
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}


export default function F_hahgkfzpul_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const form = useForm<I_hahgkfzpul_Read>({
        initialValues: {},
    });

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I_hahgkfzpul_Read[]>({
        queryKey: ["F_hahgkfzpul_Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I_hahgkfzpul_Read>[]>(() => [
        { header: "Mã CO", accessorKey: "code" },
        { header: "Mô tả", accessorKey: "description" },
        { header: "Mã môn học", accessorKey: "courseCode" },
        { header: "Tên môn học", accessorKey: "courseName" },
        { header: "Khoa quản lý", accessorKey: "manageUnit" },
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

    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <Text>Mục tiêu môn học</Text>
            <MyDataTable
                exportAble

                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <F_hahgkfzpul_Create />
                                <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                    console.log(form_multiple.values);

                                }} >s</AQButtonCreateByImportFile>
                            </Group>
                        </>
                    )
                }}
                columns={columns}
                data={AllUserQuery.data || []}
                renderRowActions={({ row }) => {
                    return (

                        <MyCenterFull>
                            <F_hahgkfzpu_Update values={row.original} />
                            <F_hahgkfzpu_Delete id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    );
}

const data: I_hahgkfzpul_Read[] = [
    {
        id: 1,
        code: "CO1",
        description: "Hiểu các khái niệm cơ bản trong công nghệ thông tin.",
        courseCode: "KTo00001",
        courseName: "Nhập môn Công nghệ Thông Tin",
        manageUnit: "Khoa công nghệ thông tin",
        nguoiCapNhat: "Quản trị viên",
        ngayCapNhat: new Date("2024-12-23")
    },

];