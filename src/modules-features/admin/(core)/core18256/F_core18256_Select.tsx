import baseAxios from "@/api/baseAxios";
import { Select, SelectProps } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

interface ISelect extends SelectProps {
  documentTypeId?: number
  label?: string;
  dataMapper?: (item: any) => { value: string; label: string }; // Hàm tùy chỉnh cách map dữ liệu
}

export default function F_core18256_Select({ documentTypeId, label = "", dataMapper, ...rest }: ISelect) {

  const query = useQuery({
    queryKey: [`/DocumentAttribute/GetByType?documentType=${documentTypeId}`],
    queryFn: async () => {
      const result = (await baseAxios.get(`/DocumentAttribute/GetByType?documentType=${documentTypeId}`)).data.data;
      return result
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
      value={rest.value?.toString()}
    />
  );
}
