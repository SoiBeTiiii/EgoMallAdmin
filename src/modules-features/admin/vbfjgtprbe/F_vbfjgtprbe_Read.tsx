'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_vbfjgtprbe_Create from "./F_vbfjgtprbe_Create";
import F_vbfjgtprbe_Delete from "./F_vbfjgtprbe_Delete";
import F_vbfjgtprbe_Update from "./F_vbfjgtprbe_Update";
export interface I {
    id?: number; // STT
    coCode?: string; // Mã CO
    cloCode?: string; // Mã CLO
    moTa?: string; // Mô tả
    nhomDoLuong?: string; // Nhóm đo lường
    maMonHoc?: string; // Mã môn học
    tenMonHoc?: string; // Tên môn học
    khoaQuanLy?: string; // Khoa quản lý
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_vbfjgtprbe_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const query = useQuery<I[]>({
        queryKey: [`ListOfCOCLOs`],
        queryFn: async () => [
            {
                id: 1,
                coCode: "CO01",
                cloCode: "CLO1.1",
                moTa: "Trình bày kiến thức cơ bản về kế toán",
                noiDungChuong: "Kiến thức",
                maMonHoc: "KTo001",
                tenMonHoc: "Kế toán cơ bản",
                khoaQuanLy: "Khoa kinh tế",
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã CO",
            accessorKey: "coCode",
        },
        {
            header: "Mã CLO",
            accessorKey: "cloCode",
        },
        {
            header: "Mô tả",
            accessorKey: "moTa",
        },
        {
            header: "Nội dung chương",
            accessorKey: "noiDungChuong",
        },
        {
            header: "Mã môn học",
            accessorKey: "maMonHoc",
        },
        {
            header: "Tên môn học",
            accessorKey: "tenMonHoc",
        },
        {
            header: "Khoa quản lý",
            accessorKey: "khoaQuanLy",
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat"
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                            return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                        },
        }
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
                    <F_vbfjgtprbe_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_vbfjgtprbe_Update obj={row.original} />
                        <F_vbfjgtprbe_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
