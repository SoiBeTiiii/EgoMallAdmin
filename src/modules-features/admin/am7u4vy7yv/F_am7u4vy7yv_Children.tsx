'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useDisclosure } from "@mantine/hooks";
import { Group, Paper, Popover, Stack, Text, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import baseAxios from "@/api/baseAxios";
import { MRT_ColumnDef } from "mantine-react-table";
import F_am7u4vy7yv_Delete from "./F_am7u4vy7yv_Delete";
import F_am7u4vy7yv_Update from "./F_am7u4vy7yv_Update";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import DescriptionCell from "@/components/Description/DescriptionCell";

interface ProductOption {
  id: number;
  name: string;
}

interface I_am7u4vy7yv_Children {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  is_active: boolean;
  is_featured: boolean;
  type: string;
  options: ProductOption[];
  children: I_am7u4vy7yv_Children[];
  created_at: string;
  updated_at: string;
}

export default function I_am7u4vy7yv_Children({ slug }: { slug: string }) {
  const disc = useDisclosure(false);

  const { data: children, isLoading } = useQuery<I_am7u4vy7yv_Children[]>({
  queryKey: ['category_children', slug],
  queryFn: async () => {
    const res = await baseAxios.get(`/categories/${slug}`);
    // trả về thẳng mảng children của phần tử đầu
    return res.data.data[0]?.children ?? [];
  },
});

  const columns = useMemo<MRT_ColumnDef<I_am7u4vy7yv_Children>[]>(() => [
    { header: "Tên", accessorKey: "name" },
    { header: "Slug", accessorKey: "slug" },
    { header: "Mô tả", accessorKey: "description", Cell: ({ row }) => <DescriptionCell description={row.original.description} /> },
    { header: "Trạng thái", accessorFn: (row) => (row.is_active ? "Đang hoạt động" : "Dừng hoạt động") },
    { header: "Danh mục nổi bật", accessorFn: (row) => (row.is_featured ? "Danh mục nổi bật" : "Không nổi bật") },
    { header: "Kiểu danh mục", accessorKey: "type" },
    {
      header: "Options",
      Cell: ({ row }) => {
        const options = row.original.options;
        if (!options || options.length === 0) return "—";
        return (
          <Group>
            <Popover width={220} trapFocus position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Box style={{ cursor: "pointer" }}>
                  <Text size="sm" color="blue">
                    {`Xem (${options.length})`}
                  </Text>
                </Box>
              </Popover.Target>
              <Popover.Dropdown>
                <Stack>
                  {options.map((opt) => (
                    <Paper key={opt.id} p="xs" radius="sm" shadow="xs" withBorder>
                      <Text size="sm">• {opt.name}</Text>
                    </Paper>
                  ))}
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </Group>
        );
      },
    },
    { header: "Ngày tạo", accessorKey: "created_at" },
    { header: "Ngày cập nhật", accessorKey: "updated_at" },
  ], []);
  
  return (
    <MyButtonModal crudType="check" disclosure={disc} modalSize={"80%"}>
      <Text fw={600} size="lg">Danh sách danh mục con của danh mục {slug}</Text>
      <MyDataTable
        enableRowSelection
        enableRowNumbers
        exportAble
        columns={columns}
        data={children ?? []}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <F_am7u4vy7yv_Update values={row.original} />
            <F_am7u4vy7yv_Delete slug={row.original.slug} />
          </MyCenterFull>
        )}
      />
    </MyButtonModal>
  );
}
