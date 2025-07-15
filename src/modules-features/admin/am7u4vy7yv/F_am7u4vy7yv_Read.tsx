'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Box, Group, Paper, Popover, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_am7u4vy7yv_Delete from "./F_am7u4vy7yv_Delete";
import F_am7u4vy7yv_Update from "./F_am7u4vy7yv_Update";
import F_am7u4vy7yv_Create from "./F_am7u4vy7yv_Create";
import I_am7u4vy7yv_parent from "./F_am7u7vy7yv_parent";
import baseAxios from "@/api/baseAxios";

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

  // Query to fetch the mock data
  const AllUserQuery = useQuery<I_am7u4vy7yv_Read[]>({
    queryKey: ["F_am7u4vy7yv_Read"],
    queryFn: async () => {
      const result = await baseAxios.get("/categories");
      return result.data.data;
    },
  });

  const columns = useMemo<MRT_ColumnDef<I_am7u4vy7yv_Read>[]>(() => [
    { header: "Tên danh mục", accessorKey: "name" },
    { header: "Slug", accessorKey: "slug" },
    { header: "Mô tả", accessorKey: "description" },
    { header: "Trạng thái", accessorKey: "is_active" },
    { header: "Danh mục nổi bật", accessorKey: "is_featured" },
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
      header: "children",
      Cell: ({ row }) => {
        return <I_am7u4vy7yv_parent id={row.original.id} />
      }
    },


    { header: "Kiểu danh mục", accessorKey: "type" },
    { header: "Ngày tạo", accessorKey: "created_at" },
    { header: "Ngày cập nhật", accessorKey: "update_at" },
  ], []);


  if (AllUserQuery.isLoading) return "Loading...";

  return (
    <MyFlexColumn>
      <Text>Quản lí danh mục</Text>
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
              <F_am7u4vy7yv_Delete id={row.original.id!} />
            </MyCenterFull>
          )
        }}
      />
    </MyFlexColumn>
  );
}

// const data: I_am7u4vy7yv_Read[] = [
//   {
//     id: 1,
//     name: "Chăm Sóc Da",
//     slug: "cham-soc-da",
//     description: "Danh mục các sản phẩm chăm sóc da như sữa rửa mặt, toner, serum, kem dưỡng.",
//     thumbnail: "https://example.com/images/cham-soc-da.jpg",
//     is_active: true,
//     is_featured: true,
//     type: "cosmetic",
//     options: [
//       { id: 1, name: "Dung tích" },
//       { id: 2, name: "Hương thơm" }
//     ],
//     children: [
//       {
//         id: 101,
//         name: "Sữa Rửa Mặt Dịu Nhẹ",
//         slug: "sua-rua-mat-diu-nhe",
//         description: "Làm sạch da mà không gây khô.",
//         thumbnail: "",
//         is_active: true,
//         is_featured: false,
//         type: "cosmetic",
//         options: [{ id: 1, name: "Dung tích" }],
//         children: [],
//         created_at: "2025-02-01T08:00:00Z",
//         updated_at: "2025-05-01T09:00:00Z"
//       },
//       {
//         id: 102,
//         name: "Serum Vitamin C",
//         slug: "serum-vitamin-c",
//         description: "Giúp sáng da và mờ thâm.",
//         thumbnail: "",
//         is_active: true,
//         is_featured: true,
//         type: "cosmetic",
//         options: [{ id: 2, name: "Hương thơm" }],
//         children: [],
//         created_at: "2025-02-02T08:00:00Z",
//         updated_at: "2025-05-01T09:10:00Z"
//       }
//     ],
//     created_at: "2025-01-01T08:00:00Z",
//     updated_at: "2025-05-01T09:30:00Z"
//   },
//   {
//     id: 2,
//     name: "Trang Điểm",
//     slug: "trang-diem",
//     description: "Danh mục sản phẩm trang điểm như kem nền, son môi, phấn phủ.",
//     thumbnail: "https://example.com/images/trang-diem.jpg",
//     is_active: true,
//     is_featured: true,
//     type: "cosmetic",
//     options: [
//       { id: 3, name: "Loại da phù hợp" },
//       { id: 4, name: "Tông màu" }
//     ],
//     children: [
//       {
//         id: 201,
//         name: "Kem Nền Mịn Lì",
//         slug: "kem-nen-min-li",
//         description: "Giữ lớp nền hoàn hảo cả ngày.",
//         thumbnail: "",
//         is_active: true,
//         is_featured: true,
//         type: "cosmetic",
//         options: [{ id: 4, name: "Tông màu" }],
//         children: [],
//         created_at: "2025-02-05T09:00:00Z",
//         updated_at: "2025-05-05T09:00:00Z"
//       },
//       {
//         id: 202,
//         name: "Phấn Phủ Kiềm Dầu",
//         slug: "phan-phu-kiem-dau",
//         description: "Hạn chế bóng nhờn suốt 8 giờ.",
//         thumbnail: "",
//         is_active: true,
//         is_featured: false,
//         type: "cosmetic",
//         options: [{ id: 3, name: "Loại da phù hợp" }],
//         children: [],
//         created_at: "2025-02-06T09:00:00Z",
//         updated_at: "2025-05-06T09:00:00Z"
//       }
//     ],
//     created_at: "2025-01-05T10:00:00Z",
//     updated_at: "2025-05-03T11:20:00Z"
//   }
// ];
