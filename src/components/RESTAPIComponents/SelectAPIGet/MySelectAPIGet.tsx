import baseAxios from "@/api/baseAxios";
import { Select, SelectProps } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

interface ISelect extends SelectProps {
    apiGet: string;
    label?: string;
    dataMapper?: (item: any) => { value: string; label: string }; // Hàm tùy chỉnh cách map dữ liệu
}

export default function MySelectAPIGet({ apiGet, label = "", dataMapper, ...rest }: ISelect) {
    const query = useQuery({
        queryKey: [apiGet],
        queryFn: async () => {
            return (await baseAxios.get(apiGet)).data;
        },
    });

    if (query.isLoading) return "Loading...";

    const data = query.data?.map((item: any) => {
        if (dataMapper) return dataMapper(item)
        return {
            value: item.id?.toString()!,
            label: `${item.code}-${item.name}`,
        }
    });

    return (
        <Select
            label={label}
            placeholder={`Chọn ${label?.toLowerCase()}`}
            data={data}
            {...rest}
        />
    );
}
