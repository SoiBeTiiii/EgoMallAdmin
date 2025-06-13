'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_euvqpsrtts_Create from "./F_euvqpsrtts_Create";
import F_euvqpsrtts_Delete from "./F_euvqpsrtts_Delete";
import F_euvqpsrtts_Update from "./F_euvqpsrtts_Update";
export interface I {
    id?: number 
    code?: string 
    name?: string 
    ghiChu?: string 
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}
export default function F_euvqpsrtts_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const query = useQuery<I[]>({
        queryKey: [`F_euvqpsrtts_Read`],
        queryFn: async () => [
            {
                id: 1,
                code: "K001",
                name: "Khoa công nghệ thông tin",
                ghiChu: "Khoa CNTT chuyên về đào tạo IT.",
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 2,
                code: "K002",
                name: "Khoa kinh tế",
                ghiChu: "Chuyên ngành quản trị kinh doanh và kinh tế.",
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 3,
                code: "K003",
                name: "Khoa toán",
                ghiChu: "Khoa toán chuyên quản lý các môn toán",
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 4,
                code: "K004",
                name: "Khoa ngoại ngữ",
                ghiChu: "Khoa ngoại ngữ chuyên đào tạo ngoại ngữ",
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 5,
                code: "K005",
                name: "Khoa vật lý",
                ghiChu: "Đào tạo môn vật lý.",
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 6,
                code: "K006",
                name: "Khoa hóa học",
                ghiChu: "Đào tạo môn hóa học",
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 6,
                code: "K007",
                name: "Khoa sinh học",
                ghiChu: "Đào tạo môn sinh học",
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            }
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [

        {
            header: "Mã khoa",
            accessorKey: "code",
        },
        {
            header: "Tên khoa",
            accessorKey: "name",
        },
        {
            header: "Ghi chú",
            accessorKey: "ghiChu",
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

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            exportAble
            enableRowSelection={true}
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() =>
                <>
                    <F_euvqpsrtts_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_euvqpsrtts_Update values={row.original} />
                        <F_euvqpsrtts_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}