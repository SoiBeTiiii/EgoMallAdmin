'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_eohyuygmxd_CreateCDR from "./F_eohyuygmxd_CreateCDR";
import F_eohyuygmxd_CreatePis from "./F_eohyuygmxd_CreatePis";
import F_eohyuygmxd_Delete from "./F_eohyuygmxd_Delete";
import F_eohyuygmxd_Update from "./F_eohyuygmxd_Update";
export interface I {
    id?: number;
    CDRCode?: string;
    PIsCode?: number;
    moTa?: string;
    nhomDoLuong?: string;
    courseCode?: string;
    weight?: number;
    courseName?: string;
    field?: string;
    khoaQuanLy?: number;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

export default function ReadTemplate() {
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
                CDRCode: "PLO1",
                PIsCode: 1,
                moTa: "Hiểu được các kiến thức Toán nền tảng được tràn bị trong chương trình.",
                nhomDoLuong: "Kiến thức",
                courseCode: "NNA21",
                weight: 25,
                courseName: "Khóa ngôn ngữ Anh 2021",
                field: "Ngôn ngữ Anh",
                khoaQuanLy: 1,
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23"),
            },
            {
                id: 2,
                CDRCode: "PLO1",
                PIsCode: 2,
                moTa: "Hiểu được các kiến thức Thống kê nền tảng được trang bị trong chương trình.",
                nhomDoLuong: "Kiến thức",
                courseCode: "NNA21",
                weight: 20,
                courseName: "Khóa ngôn ngữ Anh 2021",
                field: "Ngôn ngữ Anh",
                khoaQuanLy: 1,
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23"),
            },
            
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã CĐR",
            accessorKey: "CDRCode",
        },
        {
            header: "Mã PIs",
            accessorKey: "PIsCode",
            accessorFn(originalRow) {
                if (originalRow.PIsCode == 1) return "PI1.1";
                if(originalRow.PIsCode ==2) return "PI1.2"
            }
        },
        {
            header: "Mô tả",
            accessorKey: "moTa",
        },
        {
            header: "Nhóm đo lường",
            accessorKey: "nhomDoLuong",
        },
        {
            header: "Mã khóa",
            accessorKey: "courseCode",
        },
        {
            header: "Tỷ trọng %",
            accessorKey: "weight",
        },
        {
            header: "Tên khóa",
            accessorKey: "courseName",
        },
        {
            header: "Ngành",
            accessorKey: "field",
        },
        {
            header: "Khoa quản lý",
            accessorKey: "khoaQuanLy",
            accessorFn(originalRow) {
                if (originalRow.khoaQuanLy == 1) return "Khoa ngôn ngữ Anh";
            }
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
                    <F_eohyuygmxd_CreateCDR />
                    <F_eohyuygmxd_CreatePis />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>


            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_eohyuygmxd_Update dtuong={row.original} />
                        <F_eohyuygmxd_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
