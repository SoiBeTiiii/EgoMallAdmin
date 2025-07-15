import { MyButton } from "@/components/Buttons/Button/MyButton";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface Gift {
    type: 'variant';
    parent_id: number;
    variant_id: number;
}

export interface AppliedProduct {
    type: 'variant';
    parent_id: number;
    variant_id: number;
}

export interface Promotion {
    id: number;
    name: string;
    promotion_type: 'buy_get';
    start_date: string; // ISO format datetime string
    end_date: string;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
    gift: Gift;
    buy_quantity: number;
    get_quantity: number;
    applied_products: AppliedProduct[];
}

export default function F_bwjcibv0g4_Read() {
    const AllQuery = useQuery<Promotion[]>({
        queryKey: ["F_bwjcibv0g4_Read"],
        queryFn: async () => [
            {
                id: 1,
                name: "Mua 2 tặng 1",
                promotion_type: "buy_get",
                start_date: "2025-07-20 00:00:00",
                end_date: "2025-07-25 23:59:59",
                status: "active",
                created_at: "2025-07-10T09:00:00.000000Z",
                updated_at: "2025-07-12T11:00:00.000000Z",
                gift: {
                    type: "variant",
                    parent_id: 10,
                    variant_id: 101
                },
                buy_quantity: 2,
                get_quantity: 1,
                applied_products: [
                    {
                        type: "variant",
                        parent_id: 10,
                        variant_id: 100
                    },
                    {
                        type: "variant",
                        parent_id: 11,
                        variant_id: 102
                    }
                ]
            },
            {
                id: 2,
                name: "Mua 3 tặng 2 - Hè 2025",
                promotion_type: "buy_get",
                start_date: "2025-08-01 00:00:00",
                end_date: "2025-08-15 23:59:59",
                status: "inactive",
                created_at: "2025-07-13T14:00:00.000000Z",
                updated_at: "2025-07-13T14:37:20.000000Z",
                gift: {
                    type: "variant",
                    parent_id: 20,
                    variant_id: 201
                },
                buy_quantity: 3,
                get_quantity: 2,
                applied_products: [
                    {
                        type: "variant",
                        parent_id: 21,
                        variant_id: 210
                    }
                ]
            },
            {
                id: 3,
                name: "Khuyến mãi 5 tặng 1 cho sản phẩm mới",
                promotion_type: "buy_get",
                start_date: "2025-07-30 00:00:00",
                end_date: "2025-08-05 00:00:00",
                status: "active",
                created_at: "2025-07-15T08:30:00.000000Z",
                updated_at: "2025-07-15T08:30:00.000000Z",
                gift: {
                    type: "variant",
                    parent_id: 30,
                    variant_id: 301
                },
                buy_quantity: 5,
                get_quantity: 1,
                applied_products: [
                    {
                        type: "variant",
                        parent_id: 30,
                        variant_id: 300
                    },
                    {
                        type: "variant",
                        parent_id: 31,
                        variant_id: 302
                    }
                ]
            }
        ]
    });
    const exportConfig = {
        fields: [
            {
                header: "Chương trình",
                fieldName: "name"
            },
            {
                header: "Loại khuyến mãi",
                fieldName: "promotion_type"
            },
            {
                header: "Ngày bắt đầu",
                fieldName: "start_date"
            },
            {
                header: "Ngày kết thúc",
                fieldName: "end_date"
            },
            {
                header: "Trang thái",
                fieldName: "status"
            },
            {
                header: "Sản phẩm",
                fieldName: "applied_products"
            },
            {
                header: "Số lượng mua",
                fieldName: "buy_quantity"
            },
            {
                header: "Số lượng nhận",
                fieldName: "get_quantity"
            },
            {
                header: "Tặng",
                fieldName: "gift"
            },
            {
                header: "Ngày tạo",
                fieldName: "created_at"
            },
            {
                header: "Ngày cập nhật",
                fieldName: "updated_at"
            },
        ]
    };
    const columns = useMemo<MRT_ColumnDef<Promotion>[]>(
        () => [
            {
                header: "Chương trình",
                accessorKey: "name"
            },
            {
                header: "Loại khuyến.maxcdni",
                accessorKey: "promotion_type"
            },
            {
                header: "Ngày bắt đầu",
                accessorKey: "start_date"
            },
            {
                header: "Ngày kết thúc",
                accessorKey: "end_date"
            },
            {
                header: "Trang thái",
                accessorKey: "status"
            },
            {
                header: "Sản phẩm",
                // accessorKey: "applied_products"
                Cell: ({ row }) => <MyButton crudType="select" onClick={() => {}}>Sản phẩm</MyButton>
            },
            {
                header: "Số lượng mua",
                accessorKey: "buy_quantity"
            },
            {
                header: "Số lượng nhận",
                accessorKey: "get_quantity"
            },
            {
                header: "Tặng",
                // accessorKey: "gift"
                Cell: ({ row }) => <MyButton crudType="select" onClick={() => {}}>Tặng</MyButton>
            },
            {
                header: "Ngày tạo",
                accessorKey: "created_at"
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "updated_at"
            },
        ],
        []
    )
    if (AllQuery.isLoading) return "đang tải dữ liệu";
    if (AllQuery.isError) return "có lỗi xảy ra!";
    return(
        <MyDataTable
                    enableRowSelection
                    data={AllQuery.data!}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>
                                    {/* <F_wqk1jyz44k_Create /> */}
                                    <AQButtonExportData
                                isAllData={true}
                                objectName="CCKhuyenMai"
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
                                                <MyButton>xoá</MyButton>
                                                {/* <F_wqk1jyz44k_Update values={row.original} />
                                                <F_wqk1jyz44k_Delete id={row.id} /> */}
                                            </MyCenterFull>
                                        )}
                                        
                />
    )
}