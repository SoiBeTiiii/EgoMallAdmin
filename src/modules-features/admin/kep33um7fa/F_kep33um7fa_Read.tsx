import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Button, Collapse, Fieldset, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyCenterFull } from "aq-fe-framework/components";
import F_kep33um7fa_Create from "../kep33um7fa/F_kep33um7fa_Create";
import baseAxios from "@/api/baseAxios";
import F_kep33um7fa_Delete from "./F_kep33um7fa_Delete";
import F_kep33um7fa_Update from "./F_kep33um7fa_Update";
import VariantImageList from "@/components/VariantImageList/VariantImageList";
import DescriptionCell from "@/components/Description/DescriptionCell";

export interface F_kep33um7fa_Read {
  variants: any[];
  id: number;
  name: string;
  slug: string;
  category: string; // sửa thành id thay vì string
  is_active: boolean;
  brand: string;    // sửa thành id thay vì string
  type_skin: string;
  description: string;
  image: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export default function F_kep33um7fa_Read() {
  const [importData, setImportData] = useState(false);
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  });

  const AllProductQuery = useQuery({
    queryKey: ["F_kep33um7fa_Read"],
    queryFn: async () => {
      const res = await baseAxios.get("/products");
      return res.data.data.map((p: any) => ({
        ...p,
        brand: p.brand?.id,       // chỉ lấy id
        category: p.category?.id, // chỉ lấy id
      }));
    }
  });

  const categoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await baseAxios.get("/categories");
      return res.data.data;
    }
  });

  const brandQuery = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await baseAxios.get("/brands");
      return res.data.data;
    }
  });

  function normalizeImages(input: unknown): { url: string }[] {
    if (Array.isArray(input)) return input as { url: string }[];
    if (typeof input === "string" && input.length > 0) return [{ url: input }];
    if (input && typeof input === "object" && "url" in input) return [input as { url: string }];
    return [];
  }

  const flattenCategories = (categories: any[]): any[] => {
    const result: any[] = [];
    const recurse = (cats: any[]) => {
      for (const cat of cats) {
        result.push(cat);
        if (cat.children && cat.children.length > 0) {
          recurse(cat.children);
        }
      }
    };
    recurse(categories);
    return result;
  };

  const allCategories = useMemo(() => {
    return flattenCategories(categoryQuery.data || []);
  }, [categoryQuery.data]);

  const columns = useMemo<MRT_ColumnDef<F_kep33um7fa_Read>[]>(() => {
    return [
      {
        header: "Tên sản phẩm",
        accessorKey: "name"
      },
      {
        header: "Slug",
        accessorKey: "slug"
      },
      {
        header: "Danh mục",
        accessorFn: (row) => {
          const category = allCategories.find((c: { id: number }) => c.id === Number(row.category));
          return category?.name || "Không rõ";
        }
      },
      {
        header: "Trạng thái",
        accessorFn: (row) => row.is_active ? "Đang hoạt động" : "Ngừng hoạt động"
      },
      {
        header: "Thương hiệu",
        accessorFn: (row) => {
          const brand = brandQuery.data?.find((b: { id: any }) => Number(b.id) === Number(row.brand));
          return brand?.name || "Không rõ";
        }
      },
      {
        header: "Loại da",
        accessorKey: "type_skin"
      },
      {
        header: "Mô tả",
        accessorKey: "description",
        Cell: ({ row }) => (
          <DescriptionCell description={row.original.description} />
        ),
      },
      {
        header: "Hình ảnh",
        Cell: ({ row }) => {
          const images = normalizeImages(row.original.image);
          return <VariantImageList images={images} />;
        }
      },
      {
        header: "Ngày tạo",
        accessorKey: "created_at"
      },
    ];
  }, [categoryQuery.data, brandQuery.data]);

  const columnsVariant = useMemo<MRT_ColumnDef<any>[]>(() => [
    { header: "SKU", accessorKey: "sku" },
    { header: "Giá", accessorKey: "price" },
    { header: "Giá khuyến mãi", accessorKey: "sale_price" },
    { header: "Số lượng", accessorKey: "quantity" },
    {
      header: "Tùy chọn",
      accessorFn: (row) =>
        row.option_transform?.map((opt: any) => `${opt.name}: ${opt.value}`).join(", ") ?? "Không có",
    },
    {
      header: "Trạng thái",
      accessorFn: (row) => (row.is_active ? "Đang hoạt động" : "Ngừng hoạt động"),
    },
    {
      header: "Hình ảnh",
      Cell: ({ row }) => <VariantImageList images={row.original.images || []} />,
    },
  ], []);

  const exportConfig = {
    fields: [
      { fieldName: "name", header: "Tên sản phẩm" },
      { fieldName: "slug", header: "Slug" },
      { fieldName: "category_Id", header: "Danh mục" },
      { fieldName: "is_active", header: "Trạng thái" },
      { fieldName: "brand_Id", header: "Thương hiệu" },
      { fieldName: "type_skin", header: "Loại da" },
      { fieldName: "description", header: "Mô tả" },
      { fieldName: "image", header: "Hình ảnh" },
      { fieldName: "created_at", header: "Ngày tạo" },
    ],
  };

  if (AllProductQuery.isLoading) return "Đang tải dữ liệu..."
  if (AllProductQuery.isError) return "Có lỗi xảy ra!"
  if (AllProductQuery.isLoading || categoryQuery.isLoading || brandQuery.isLoading) {
    return "Đang tải dữ liệu...";
  }
  if (AllProductQuery.isError || categoryQuery.isError || brandQuery.isError) {
    return "Có lỗi xảy ra!";
  }

  return (
    <Fieldset legend={`Quản lý sản phẩm`}>
      <MyFlexColumn>
        <MyDataTable
          enableRowSelection={true}
          enableRowNumbers={true}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <Group>
                <F_kep33um7fa_Create />
                <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={async () => {
                  console.log(form_multiple.values);
                }}>s</AQButtonCreateByImportFile>
                <AQButtonExportData
                  isAllData={true}
                  objectName="QlSanPham"
                  data={AllProductQuery.data || []}
                  exportConfig={exportConfig}
                />
              </Group>
            );
          }}
          columns={columns}
          data={AllProductQuery.data || []}
          renderDetailPanel={({ row }) => {
            const variants = row.original.variants || [];
            return (
              <MyDataTable
                columns={columnsVariant}
                data={variants}
                enableTopToolbar={false}
                enablePagination={false}
                enableSorting={false}
                enableRowNumbers
              />
            );
          }}
          renderRowActions={({ row }) => (
            <MyCenterFull>
              <F_kep33um7fa_Update values={row.original} />
              <F_kep33um7fa_Delete slug={row.original.slug} />
            </MyCenterFull>
          )}
        />
      </MyFlexColumn>
    </Fieldset>
  )
}
