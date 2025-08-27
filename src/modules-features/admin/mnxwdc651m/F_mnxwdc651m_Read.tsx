'use client';
import baseAxios from "@/api/baseAxios";
import { Button, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import I_mnxwdc651m_Status from "./F_mnxwdc651m_Status";
import I_mnxwdc651m_Detail from "./F_mnxwdc651m_Detail";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import F_mnxwdc651m_Request from "./F_mnxwdc651m_Request";

export interface DiscountDetails {
    totalFlashSale: number;
    totalDiscountVoucher: number;
}

export interface I_mnxwdc651m_Read {
    id: number;
    unique_id: string;
    user: string;
    total_price: number;
    total_discount: string;
    discount_details: DiscountDetails;
    status: string;
    note: string;
    shipping_name: string;
    shipping_phone: string;
    shipping_email: string;
    shipping_address: string;
    voucher: string | null;
    payment_method: string;
    payment_status: string;
    payment_date: string | null;
    transaction_id: string | null;
    return_status: string | null;
    return_note: string | null;
    can_approve_return: boolean;
    can_reject_return: boolean;
    can_complete_return: boolean;
    created_at: string;
}

export default function I_mnxwdc651m_Read() {
    const AllQuery = useQuery<I_mnxwdc651m_Read[]>({
        queryKey: ["F_mnxwdc651m_Read"],
        queryFn: async () => {
            const result = await baseAxios.get("/orders");
            return result.data.data;
        }
    });
    const exportConfig = {
        fields: [
            { header: "Mã đơn hàng", fieldName: "unique_id" },
            { header: "Xem chi tiết", fieldName: "unique_id" },
            { header: "Khách hàng", fieldName: "user" },
            { header: "Tổng tiền", fieldName: "total_price" },
            { header: "yêu cầu trả hàng", fieldName: "shipping_name" },
            { header: "Trạng thái", fieldName: "status" },
            { header: "Lý do huỷ đơn", fieldName: "reason" },
        ]
    };
    const columns = useMemo<MRT_ColumnDef<I_mnxwdc651m_Read>[]>(() => [
        { header: "Mã đơn hàng", accessorKey: "unique_id" },
        { header: "Khách hàng", accessorKey: "user" },
        { header: "Tổng tiền", accessorKey: "total_price" },
        { header: "Xem chi tiết", Cell: ({ row }) => <I_mnxwdc651m_Detail data={row.original} /> },
        {
            header: "Trạng thái",
            Cell: ({ row }) => {
                const { unique_id, status } = row.original;
                return <I_mnxwdc651m_Status values={{ unique_id, status }} />;
            },
            accessorKey: "status",
        },
        {
            header: "Yêu cầu trả hàng",
            Cell: ({ row }) => {
                console.log("row.original:", row.original); // 👈 thêm dòng này
                const order = row.original;
                return (
                    <F_mnxwdc651m_Request
                        uniqueId={order.unique_id}
                        returnStatus={order.return_status as any}
                        canApprove={order.can_approve_return}
                        canReject={order.can_reject_return}
                        canComplete={order.can_complete_return}
                        onSuccess={() => AllQuery.refetch()}
                    />
                );
            },
        },
    {
            header: "Lý do trả hàng",
            accessorKey: "reason",
        }

    ], []);
    if (AllQuery.isLoading) return <div>Đang tải...</div>;
    return (
        <MyDataTable
            enableRowSelection
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <AQButtonExportData
                                isAllData={true}
                                objectName="dsorder"
                                data={AllQuery.data!}
                                exportConfig={exportConfig} />

                        </Group>
                    </>
                );
            }}
            data={AllQuery.data ?? []}
            columns={columns}

        />
    );
}