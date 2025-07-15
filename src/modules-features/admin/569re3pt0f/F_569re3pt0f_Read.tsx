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
import F_569re3pt0f_Delete from "./F_569re3pt0f_Delete";
import F_569re3pt0f_Update from "./F_569re3pt0f_Update";
import F_569re3pt0f_Create from "./F_569re3pt0f_Create";
import baseAxios from "@/api/baseAxios";




export interface I_569re3pt0f_Read {
    id?: number;          // Unique identifier
    name?: string;        // Course Objective (CO) code
    email?: string; // Description of the CO
    password?: string;  // Course name
    phone?: string;
    google_id?: string;  // Managing unit
    facebook_id?: string;
    address?: string;
    image?: string;
    role_id?: string;
    is_active?: boolean;
    email_verified_at?: string;
    otp?: string;
    otp_expires_at?: string;
    otp_send_count?: number;
    otp_sent_at?: string;
    updated_at?: string;
    created_at?: string;
}


export default function F_569re3pt0f_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const form = useForm<I_569re3pt0f_Read>({
        initialValues: {},
    });

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I_569re3pt0f_Read[]>({
        queryKey: ["F_569re3pt0f_Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I_569re3pt0f_Read>[]>(() => [
        { header: "Tên khách hàng", accessorKey: "name" },
        { header: "Email", accessorKey: "email" },
        { header: "Mật khẩu", accessorKey: "password" },
        { header: "Số điện thoại", accessorKey: "phone" },
        { header: "Mã google", accessorKey: "google_id" },
        { header: "Mã facebook", accessorKey: "facebook_id" },
        { header: "địa chỉ", accessorKey: "address" },
        { header: "quyền", accessorKey: "role_id" },
        { header: "Trang thái", accessorKey: "is_active" },
        { header: "Ngày xác nhận email", accessorKey: "email_verified_at"},
        { header: "OTP", accessorKey: "otp" },
        { header: "Ngày xác nhận OTP", accessorKey: "otp_expires_at" },
        { header: "Số lần gửi OTP", accessorKey: "otp_send_count" },
        { header: "Ngày gửi OTP", accessorKey: "otp_sent_at" },
    ], []);

    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <Text>Quản lí tài khoản</Text>
            <MyDataTable
                exportAble

                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <F_569re3pt0f_Create />
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
                            <F_569re3pt0f_Update values={row.original} />
                            <F_569re3pt0f_Delete id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    );
}

const data: I_569re3pt0f_Read[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    phone: "0909123456",
    role_id: "Admin",
    is_active: true,
    email_verified_at: "2025-06-01",
    otp_send_count: 2,
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranb@example.com",
    phone: "0911222333",
    role_id: "User",
    is_active: false,
    email_verified_at: "2025-06-02",
    otp_send_count: 5,
  },
];