'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Box, Button, Grid, Group, Paper, Popover, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_am7u4vy7yv_Delete from "./F_am7u4vy7yv_Delete";
import F_am7u4vy7yv_Update from "./F_am7u4vy7yv_Update";
import F_am7u4vy7yv_Create from "./F_am7u4vy7yv_Create";
import I_am7u4vy7yv_parent from "./F_am7u7vy7yv_parent";
import baseAxios from "@/api/baseAxios";
import VariantImageList from "@/components/VariantImageList/VariantImageList";
import DescriptionCell from "@/components/Description/DescriptionCell";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useDisclosure } from "@mantine/hooks";

interface ProductOption {
  id: number;
  name: string;
}

interface I_am7u4vy7yv_Read {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  is_active: boolean;
  is_featured: boolean;
  type: string;
  options: ProductOption[];
  children: I_am7u4vy7yv_Read[]; // danh sách sản phẩm con
  created_at: string; // có thể dùng Date nếu muốn parse ra Date object
  updated_at: string;
}


export default function F_am7u4vy7yv_Read() {
  const [categoryType, setCategoryType] = useState<"blog" | "product">("product");
  const [importData, setImportData] = useState(false);
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  })
  const form = useForm<I_am7u4vy7yv_Read>({
    initialValues: {
      id: 0,
      name: "",
      slug: "",
      is_active: false,
      is_featured: false,
      created_at: "",
      updated_at: "",
      description: "",
      thumbnail: "",
      type: "",
      options: [],
      children: []
    },
  });

  function normalizeImages(input: unknown): { url: string }[] {
    if (Array.isArray(input)) return input;
    if (typeof input === "string" && input.length > 0) return [{ url: input }];
    if (input && typeof input === "object" && "url" in input) return [input as { url: string }];
    return [];
  }
  
    const disc = useDisclosure(false);

  // Query to fetch the mock data
    const AllUserQuery = useQuery<I_am7u4vy7yv_Read[]>({
    queryKey: ["F_am7u4vy7yv_Read", categoryType],
    queryFn: async () => {
      const result = await baseAxios.get(`/categories?type=${categoryType}`);
      // chỉ lấy parent
      return result.data.data.filter((cat: any) => cat.parent_id === null);
    },
  });


  const columns = useMemo<MRT_ColumnDef<I_am7u4vy7yv_Read>[]>(() => [
    { header: "Tên danh mục", accessorKey: "name" },
    { header: "Slug", accessorKey: "slug" },
    { header: "Mô tả", accessorKey: "description", Cell: ({ row }) => <DescriptionCell description={row.original.description} /> },
    {
      header: "Ảnh danh mục",
      Cell: ({ row }) => {
        const images = normalizeImages(row.original.thumbnail);
        return <VariantImageList images={images} />;

      }
    },
    { header: "Trạng thái", accessorFn: (row) => (row.is_active ? "Đang hoạt động" : "Dừng hoạt động") },
    { header: "Danh mục nổi bật", accessorFn: (row) => (row.is_featured ? "Danh mục nổi bật" : "Không nổi bật") },
    {
      header: "Options",
      accessorKey: "options",
      Cell: ({ row }) => {
        const options = row.original.options;
        if (!options || options.length === 0) return "—";
        return (
          <Group>
            <Popover width={200} trapFocus position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Text size="sm" color="blue" style={{ cursor: "pointer" }}>
                  {`Xem (${options.length})`}
                </Text>
              </Popover.Target>
              <Popover.Dropdown>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {options.map((opt) => (
                    <li key={opt.id}>
                      <Text size="sm">• {opt.name}</Text>
                    </li>
                  ))}
                </ul>
              </Popover.Dropdown>
            </Popover>
          </Group>
        );
      },
    },
    {
      header: "Children",
      Cell: ({ row }) => {
        return <I_am7u4vy7yv_parent slug={row.original.slug} />;
      },
    },
    { header: "Ngày tạo", accessorKey: "created_at" },
    { header: "Ngày cập nhật", accessorKey: "update_at" },
  ], []);


  if (AllUserQuery.isLoading) return "Loading...";

  return (
    <MyFlexColumn>
      <Text>Quản lí danh mục</Text>
      <Grid columns={2}>
        <Button style={{ margin: "10px", backgroundColor: "green" }} onClick={() => setCategoryType("product")}>product</Button>
        <Button style={{ margin: "10px", backgroundColor: "blue" }} onClick={() => setCategoryType("blog")}>blog</Button>

      </Grid>
      <MyDataTable
        exportAble
        enableRowSelection={true}
        enableRowNumbers={true}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <Group>
                <F_am7u4vy7yv_Create />
                <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                  console.log(form_multiple.values);

                }} >s</AQButtonCreateByImportFile>
              </Group>
            </>
          )
        }}
        columns={columns}
        data={AllUserQuery.data || []}
        renderRowActions={({ row }) => {
          return (

            <MyCenterFull>
              <F_am7u4vy7yv_Update values={row.original} />
              <F_am7u4vy7yv_Delete slug={row.original.slug!} />
            </MyCenterFull>
          )
        }}
      />
    </MyFlexColumn>
  );
}
