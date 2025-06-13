'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_krhxmkgqqe_Create from "./F_krhxmkgqqe_Create";
import F_krhxmkgqqe_Delete from "./F_krhxmkgqqe_Delete";
import F_krhxmkgqqe_Update from "./F_krhxmkgqqe_Update";
export interface I {
    id?: number; 
    courseCode?: string; 
    name?: string 
    khoaQuanLyId?:number; 
    khoaQuanLy?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_krhxmkgqqe_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const query = useQuery<I[]>({
        queryKey: [`ListOfCourses`],
        queryFn: async () => [
            {
                id: 1,
                courseCode: "NNA",
                name: "Ngôn ngữ Anh",
                khoaQuanLyId: 2,
                khoaQuanLy:"khoa ngôn ngữ Anh",
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 2,
                courseCode: "CNTT",
                name: "Công nghệ thông tin",
                khoaQuanLyId: 1,
                khoaQuanLy:"khoa công nghệ thông tin",
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã chương trình ",
            accessorKey: "courseCode",
        },
        {
            header: "Tên chương trình ",
            accessorKey: "name",
        },
        {
            header: "Khoa quản lý",
            accessorKey: "khoaQuanLy",
            
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

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            exportAble
            renderTopToolbarCustomActions={() =>
                <>
                    <F_krhxmkgqqe_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_krhxmkgqqe_Update doituong={row.original} />
                        <F_krhxmkgqqe_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
