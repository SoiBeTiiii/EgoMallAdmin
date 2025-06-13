'use client'

import baseAxios from "@/api/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_core18256_Create from "./F_core18256_Create";
import F_core18256_Delete from "./F_core18256_Delete";
import F_core18256_Update from "./F_core18256_Update";

interface I {
    id?: number, name?: string, code?: string
}
export default function F_core18256_Read({ documentType }: { documentType: number }
) {
    const documentAttributeQuery = useQuery<I[]>({
        queryKey: ['F_core18256_Read', documentType],
        queryFn: async () => {
            const result = await baseAxios.get("/DocumentAttribute/GetByType?", { params: { documentType } })
            return result.data?.data || []
        },
    })

    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Mã loại văn bản",
                accessorKey: "code"
            },
            {
                header: "Tên Loại Văn Bản",
                accessorKey: "name"
            }
        ],
        []
    );

    if (documentAttributeQuery.isLoading) return "Đang tải dữ liệu..."
    if (documentAttributeQuery.isError) return "Có lỗi xảy ra!"
    return (
        <MyDataTable
            columns={columns}
            enableRowNumbers={true}
            data={documentAttributeQuery.data!}
            renderTopToolbarCustomActions={() => <F_core18256_Create documentType={documentType} />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_core18256_Update values={row.original} />
                        <F_core18256_Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

