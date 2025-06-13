'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";


interface I {
    id?: number
    ma?: string
    hoTen?: string,
    ngaySinh?: Date,
    daTotNghiep?: boolean,
    soHocPhiDaDong?: number,
    ngayCapNhat?: Date, // bạn hãy tự thêm nếu interface thiếu
    nguoiCapNhat?: string // bạn hãy tự thêm nếu interface thiếu
}

export default function ReadTemplate() {
    const query = useQuery<I[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            { id: 1, ma: "gv001", hoTen: "Trần Quốc Thiệu", ngaySinh: new Date("2002-02-12T00:00:00Z"), daTotNghiep: true, soHocPhiDaDong: 240000000, ngayCapNhat: new Date("2020-02-12T00:00:00Z"), nguoiCapNhat: "GV. Lê Thị Lan" },
            { id: 2, ma: "gv002", hoTen: "Nguyễn Văn Định", ngaySinh: new Date("2013-02-12T00:00:00Z"), daTotNghiep: false, soHocPhiDaDong: 123000000, ngayCapNhat: new Date("2020-12-12T00:00:00Z"), nguoiCapNhat: "GV. Trần Văn Vinh" },
            { id: 3, ma: "gv003", hoTen: "Đặng Tuấn Kiệt", ngaySinh: new Date("2004-02-12T00:00:00Z"), daTotNghiep: true, soHocPhiDaDong: 124220000, ngayCapNhat: new Date("2020-12-12T00:00:00Z"), nguoiCapNhat: "GV. Ngô Di Định" },
        ]
    })

    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Mã giáo viên",
                accessorKey: "ma",
            },
            {
                header: "Tên giáo viên",
                accessorKey: "hoTen"
            },
            {
                header: "Ngày sinh",
                accessorKey: "ngaySinh",
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngaySinh!))
            },
            {
                header: "Đã tốt nghiệp",
                accessorKey: "daTotNghiep",
                Cell: ({ cell }) => <Checkbox onChange={() => { }} checked={cell.getValue<boolean>()} />
            },
            {
                header: "Số học phí đã đóng",
                accessorKey: "soHocPhiDaDong",
                Cell: ({ cell }) => <MyNumberFormatter value={cell.getValue<number>()} />
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayCapNhat!))
            },
            {
                header: "Người cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.nguoiCapNhat!))
            }
        ],
        []
    );

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            exportAble
            renderRowActions={({ row }) => { // Nếu table có update delete thì bỏ thêm render row action
                return (
                    <MyCenterFull>
                        Your update and delete feat here
                    </MyCenterFull>
                )
            }}
        />
    )
}
