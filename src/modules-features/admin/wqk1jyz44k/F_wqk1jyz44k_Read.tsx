'use client';
import { Button, Fieldset, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyCenterFull, MyDataTable, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { use, useMemo } from "react";
import F_wqk1jyz44k_Create from "./F_wqk1jyz44k_Create";
import F_wqk1jyz44k_Update from "./F_wqk1jyz44k_Update";
import F_wqk1jyz44k_Delete from "./F_wqk1jyz44k_Delete";

export interface I_wqk1jyz44k_Read {
  id?: number;
  code: string;
  description: string;
  discount_type: string; // Có thể dùng enum nếu bạn muốn
  discount_value: number;
  min_order_value: number;
  max_discount: number;
  usage_limit: number;
  discount_limit: number;
  start_date: string;   // ISO format: yyyy-mm-dd
  end_date: string;     // ISO format
  status: boolean;
  created_at: string;   // ISO datetime string
  updated_at: string;   // ISO datetime string
}

export default function I_wqk1jyz44k_Read() {
    const AllQuery = useQuery<I_wqk1jyz44k_Read[]>({
        queryKey: ["F_wqk1jyz44k_Read"],
        queryFn: async () => 
        [
            {
                id: 1,
                code: "SUMMER2025",
                description: "Giảm 10% cho đơn hàng hè 2025",
                discount_type: "percentage",
                discount_value: 10,
                min_order_value: 500000,
                max_discount: 100000,
                usage_limit: 100,
                discount_limit: 1,
                start_date: "2025-07-01",
                end_date: "2025-07-31",
                status: true,
                created_at: "2025-06-25T10:00:00Z",
                updated_at: "2025-06-25T10:00:00Z"
            },
            {
                id: 2,
                code: "FREESHIP50K",
                description: "Giảm 50,000đ cho đơn từ 300k",
                discount_type: "fixed",
                discount_value: 50000,
                min_order_value: 300000,
                max_discount: 50000,
                usage_limit: 500,
                discount_limit: 2,
                start_date: "2025-07-01",
                end_date: "2025-08-01",
                status: true,
                created_at: "2025-06-26T12:00:00Z",
                updated_at: "2025-06-26T12:00:00Z"
            },
            {
                id: 3,
                code: "NEWUSER2025",
                description: "Ưu đãi cho khách hàng mới",
                discount_type: "percentage",
                discount_value: 15,
                min_order_value: 200000,
                max_discount: 80000,
                usage_limit: 300,
                discount_limit: 1,
                start_date: "2025-07-01",
                end_date: "2025-12-31",
                status: true,
                created_at: "2025-06-27T08:30:00Z",
                updated_at: "2025-06-27T08:30:00Z"
            },
            {
                id: 4,
                code: "BLACKFRIDAY",
                description: "Black Friday - giảm khủng 20%",
                discount_type: "percentage",
                discount_value: 20,
                min_order_value: 1000000,
                max_discount: 200000,
                usage_limit: 1000,
                discount_limit: 3,
                start_date: "2025-11-25",
                end_date: "2025-11-30",
                status: false,
                created_at: "2025-06-28T09:00:00Z",
                updated_at: "2025-06-28T09:00:00Z"
            }
        ]
    });
    const exportConfig = {
       fields: [
            {  
                header: "Mã khuyến mại",
                fieldName: "code",
            },
            {  
                header: "Mô tả",
                fieldName: "description",
            },
            {  
                header: "Loại giảm giá",
                fieldName: "discount_type",
            },
            {  
                header: "Giá trị giảm",
                fieldName: "discount_value",
            },
            {  
                header: "Đơn tối thiểu",
                fieldName: "min_order_value",
            },
            {  
                header: "Giảm tối đa",
                fieldName: "max_discount",
            },
            {  
                header: "Tổng lượt dùng",
                fieldName: "usage_limit",
            },
            {  
                header: "Lượt dùng mỗi người",
                fieldName: "discount_limit",
            },
            {  
                header: "Ngày bắt đầu",
                fieldName: "start_date",
            },
            {  
                header: "Ngày kết thúc",
                fieldName: "end_date",
            },
            {  
                header: "Trạng thái",
                fieldName: "status",
            }
        ]
    };
    const columns = useMemo<MRT_ColumnDef<I_wqk1jyz44k_Read>[]>(() => [
        {
            header: "Mã khuyến mại",
            accessorKey: "code",
        },
        {
            header: "Mô tả",
            accessorKey: "description",
        },
        {
            header: "Loại giảm giá",
            accessorKey: "discount_type",
        },
        {
            header: "Giá trị giảm",
            accessorKey: "discount_value",
        },
        {
            header: "Đơn tối thiểu",
            accessorKey: "min_order_value",
        },
        {
            header: "Giảm tối đa",
            accessorKey: "max_discount",
        },
        {
            header: "Tổng lượt dùng",
            accessorKey: "usage_limit",
        },
        {
            header: "Lượt dùng mối người",
            accessorKey: "discount_limit",
        },
        {
            header: "Ngày bắt đầu",
            accessorKey: "start_date",
        },
        {
            header: "Ngày kết thúc",
            accessorKey: "end_date",
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
        },
    ], [])

    if (AllQuery.isLoading) return "đang tải dữ liệu";
    if (AllQuery.isError) return "loi tải dữ liệu";
 return (
        <MyDataTable
            enableRowSelection
            data={AllQuery.data!}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <F_wqk1jyz44k_Create />
                            <AQButtonExportData
                        isAllData={true}
                        objectName="dsKhuyenMai"
                        data={AllQuery.data!}
                        exportConfig={exportConfig}
                    />
                    
                        </Group>
                    </>
                );
            }}
             columns={columns} 
                                renderRowActions={({ row }) => (
                                    <MyCenterFull>
                                        <F_wqk1jyz44k_Update values={row.original} />
                                        <F_wqk1jyz44k_Delete id={row.id} />
                                    </MyCenterFull>
                                )}
                                
        />
    );
}
