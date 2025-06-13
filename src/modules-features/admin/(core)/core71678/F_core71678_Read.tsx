'use client'
import baseAxios from "@/api/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Group } from "@mantine/core";
import { IconShield } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import F_core71678_ChangePermission from "./F_core71678_ChangePermission";
import F_core71678_Create from "./F_core71678_Create";
import F_core71678_Delete from "./F_core71678_Delete";
import F_core71678_Update from "./F_core71678_Update";

interface IRoles extends IBaseEntity { }
export interface I_core71678_Read extends IBaseEntity {
    userName?: string,
    fullName?: string,
    email?: string
    roles?: IRoles[]
}

const ENDPOINT = "/Account/GetAdminAccount"
export default function F_core71678_Read() {
    const router = useRouter()
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const AllUserQuery = useQuery<I_core71678_Read[]>({
        queryKey: ["F_core71678_Read"],
        queryFn: async () => {
            const result = await baseAxios.get(
                ENDPOINT,
                { params: { page: 5, pageNumber: 1 } }
            );
            return result.data?.data || []
        }
    })
    const columns = useMemo<MRT_ColumnDef<I_core71678_Read>[]>(
        () => [
            {
                header: "Tên tài khoản",
                accessorKey: "userName"
            },
            {
                header: "Họ và tên",
                accessorKey: "fullName"
            },
            {
                header: "Email",
                accessorKey: "email"
            },
            {
                header: "Quyền",
                accessorFn: (row) => <F_core71678_ChangePermission user={row} />
            },
        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        <MyDataTable
            columns={columns}
            data={AllUserQuery.data!}
            renderTopToolbarCustomActions={() => {
                return (
                    <Group>
                        <F_core71678_Create />
                        <Button
                            color="violet"
                            leftSection={<IconShield />}
                            onClick={() => {
                                router.push("core47643")
                            }}>
                            Danh mục quyền
                        </Button>
                    </Group>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_core71678_Update user={row.original} />
                        <F_core71678_Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

