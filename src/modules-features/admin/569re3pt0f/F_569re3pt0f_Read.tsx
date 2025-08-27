'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Button, Grid, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_569re3pt0f_Update from "./F_569re3pt0f_Update";
import baseAxios from "@/api/baseAxios";
import VariantImageList from "@/components/VariantImageList/VariantImageList";
import F_569re3pt0f_Create from "./F_569re3pt0f_Create";
export interface I_569re3pt0f_Read {
    id: number;
    name: string;
    email: string;
    phone: string;
    email_verified_at: string; 
    image: string;
    role_name: string;
    is_active: boolean;
    role: {
    id: number;
    name: string;
    display_name: string;
  };
    created_at: string;
    updated_at: string;
}


export default function F_569re3pt0f_Read() {
    const [userType, setUserType] = useState<"admins" | "staffs" | "customers">("admins");

    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I_569re3pt0f_Read[]>({
        queryKey: ["F_569re3pt0f_Read", userType],
        queryFn: async () => {
            const result = await baseAxios.get(`/users/${userType}`);
            return result.data.data || [];
        },
    });

    function normalizeImages(input: unknown): { url: string }[] {
        if (Array.isArray(input)) return input;
        if (typeof input === "string" && input.length > 0) return [{ url: input }];
        if (input && typeof input === "object" && "url" in input) return [input as { url: string }];
        return [];
    }

    const columns = useMemo<MRT_ColumnDef<I_569re3pt0f_Read>[]>(() => [
        { header: "Tên khách hàng", accessorKey: "name" },
        { header: "Số điện thoại", accessorKey: "phone" },
        { header: "Ngày xác nhận email", accessorKey: "email_verified_at" },
        {
            header: "Ảnh đại diện", Cell: ({ row }) => {
                const images = normalizeImages(row.original.image);
                return <VariantImageList images={images} />;
            }
        },
        { header: "Trang thái", accessorFn: (row) => row.is_active ? "Hoạt động" : "Khóa" },
        { header: "Ngày tạo", accessorKey: "created_at" },
        { header: "Ngày cập nhật", accessorKey: "updated_at" },
    ], []);
    if (AllUserQuery.isLoading) return "Loading...";
    return (
        <MyFlexColumn>
            <Text>Quản lí tài khoản</Text>
            <Grid columns={3}>
                    <Button style={{ margin: "10px", backgroundColor: "green"}} onClick={() => setUserType("admins")}>Get Admin</Button>
                    <Button style={{ margin: "10px", backgroundColor: "blue"}} onClick={() => setUserType("staffs")}>Get Staff</Button>
                    <Button style={{ margin: "10px", backgroundColor: "red"}} onClick={() => setUserType("customers")}>Get Customer</Button>
           
            </Grid>
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
                            {/* <F_569re3pt0f_Delete id={row.original.id!} /> */}
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    );
}
