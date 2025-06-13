'use client'
import baseAxios from "@/api/baseAxios";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Container } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import useS_core83092 from "./useS_core83092";
export interface I1_2User {
    id?: number
    userName?: string,
    fullName?: string,
    email?: string
}

export default function F_core83092_ReadUser() {
    const store = useS_core83092()
    const query = useQ_core83092_Account_GetAdminAccount()
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    const columns = useMemo<MRT_ColumnDef<I1_2User>[]>(
        () => [
            {
                header: "Họ và tên",
                accessorKey: "fullName",
                size: 60
            },
            {
                header: "Email",
                accessorKey: "email",
            },
        ],
        []
    );

    const handleRowClick = (rowId: string) => {
        setRowSelection({ [rowId]: true }); // Chọn dòng hiện tại và xóa các dòng khác
        store.setProperty("roleId", parseInt(rowId))
    };
    useEffect(() => {
        if (store.state.roleId == 0) return
        setRowSelection({ [store.state.roleId!]: true });
    }, [store.state.roleId])
    useEffect(() => {
        if (!query.data) return
        store.setProperty("roleId", query.data[0].id)
    }, [query.data])

    if (query.isLoading) return "Loading...";
    if (query.isError) return "Có lỗi xảy ra!";
    return (
        <Container fluid w={'100%'}>
            <MyDataTable
                columns={columns}
                data={query.data!}
                getRowId={(row) => row.id?.toString()}
                mantineTableBodyRowProps={({ row }) => ({
                    onClick: () => handleRowClick(row.id),
                    style: {
                        cursor: 'pointer',
                        backgroundColor: rowSelection[row.id] ? '#d0e7ff' : 'transparent',
                    },
                })}
                state={rowSelection}
            />
        </Container>
    );
}

function useQ_core83092_Account_GetAdminAccount() {
    interface I extends IBaseEntity {

    }
    const query = useQuery<I[]>({
        queryKey: ['useQ_core83092_Account_GetAdminAccount'],
        queryFn: async () => {
            const result = await baseAxios.get(`/Account/GetAdminAccount`, { params: { page: 5, pageNumber: 1 } });
            return result.data?.data || []
        },
        refetchOnWindowFocus: false
    });
    return query
}