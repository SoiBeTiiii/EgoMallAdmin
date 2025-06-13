'use client'
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import { useListState } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface IModule {
    id?: number;
    maModule?: string;
    tenModule?: string;
    soTiet?: number;
    soGio?: number;
}

export default function ListSelectTemplate({ listState }: { listState: ReturnType<typeof useListState<IModule>> }) {
    const query = useQuery<IModule[]>({
        queryKey: [`ListSelectTemplate`],
        queryFn: async () => [
            {
                id: 1,
                maModule: "MOD001",
                tenModule: "Lập trình cơ bản",
                soTiet: 30,
                soGio: 40
            },
            {
                id: 2,
                maModule: "MOD002",
                tenModule: "Lập trình nâng cao",
                soTiet: 40,
                soGio: 60
            },
            {
                id: 3,
                maModule: "MOD003",
                tenModule: "Cơ sở dữ liệu",
                soTiet: 50,
                soGio: 70
            }
        ]
    });

    const columns = useMemo<MRT_ColumnDef<IModule>[]>(() => [
        {
            header: "Mã Module",
            accessorKey: "maModule",
        },
        {
            header: "Tên Module",
            accessorKey: "tenModule",
        },
        {
            header: "Số tiết",
            accessorKey: "soTiet",
        },
        {
            header: "Số giờ",
            accessorKey: "soGio",
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTableSelect listLabel="Danh sách mô-đun" columns={columns} listState={listState as any} data={query.data} />
    );
}
