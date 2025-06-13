import baseAxios from "@/api/baseAxios"
import MyCenterFull from "@/components/CenterFull/MyCenterFull"
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable"
import { Group } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo } from "react"
import F_core47643_Delete from "./F_core47643_Delete"
import F_core47643_Form from "./F_core47643_Form"

interface I extends IBaseEntity { }

export default function F_core47643_Read() {
    const query = useQ_core47643_GetAdminRole()
    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã",
            accessorKey: "code"
        },
        {
            header: "Quyền",
            accessorKey: "name"
        }
    ], [])
    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"
    return (
        <MyDataTable
            data={query.data!}
            columns={columns}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <F_core47643_Form />
                </Group>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <F_core47643_Form values={row.original} />
                    <F_core47643_Delete values={row.original} />
                </MyCenterFull>
            )}
        />
    )
}

function useQ_core47643_GetAdminRole() {
    const query = useQuery({
        queryKey: ["useQ_core47643_GetAdminRole"],
        queryFn: async () => {
            const res = await baseAxios.get("/Role/GetAdminRole")
            return res.data.data
        }
    })
    return query
}
