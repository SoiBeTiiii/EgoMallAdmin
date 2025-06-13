'use client'
import baseAxios from "@/api/baseAxios";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Container } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import useS_core83092 from "../core83092/useS_core83092";
export interface I1_2User extends IBaseEntity {

}

export default function F_core38677_ReadUser() {
    const store = useS_core83092()
    const query = useQ_Account_GetAdminAccount()
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    const columns = useMemo<MRT_ColumnDef<I1_2User>[]>(
        () => [
            {
                header: "Mã",
                accessorKey: "code",
                size: 60
            },
            {
                header: "Tên quyền",
                accessorKey: "name",
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
        <Container fluid>
            <MyDataTable
                columns={columns}
                data={query.data!}
                getRowId={(row) => row.id?.toString()}
                mantineTableBodyRowProps={({ row }) => ({
                    onClick: () => handleRowClick(row.id),
                    style: {
                        cursor: 'pointer',
                        backgroundColor: rowSelection[row.id] ? 'var(--mantine-color-blue-light)' : 'transparent',
                    },
                })}
                state={rowSelection}
            />
        </Container>
    );
}

function useQ_Account_GetAdminAccount() {
    interface I extends IBaseEntity { }
    const query = useQuery<I[]>({
        queryKey: ['useQ_Role_GetAdminRole'],
        queryFn: async () => {
            const result = await baseAxios.get(`/Role/GetAdminRole`);
            return result.data?.data || []
        },
        refetchOnWindowFocus: false
    });
    return query
}