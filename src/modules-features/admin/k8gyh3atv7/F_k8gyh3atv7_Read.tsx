'use client';
import baseAxios from "@/api/baseAxios";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Fieldset, Group, Badge } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_k8gyh3atv7_Create from "./F_k8gyh3atv7_Create";
import F_k8gyh3atv7_Update from "./F_k8gyh3atv7_Update";
import F_k8gyh3atv7_Delete from "./F_k8gyh3atv7_Delete";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";

// ----------------- Interfaces -----------------
export interface ShippingMethod {
  id: number;
  name: string;
  description: string;
  estimated_time: string;
  is_active: boolean;
  is_default: boolean;
  created_at: string;
  zones?: Zone[]; // có thể trả về kèm zones
}

interface Zone {
  id: number;
  province_code: string;
  fee: number;
  is_available: boolean;
  created_at: string;
}

// ----------------- Hook lấy provinces -----------------
function useProvinces() {
  return useQuery({
    queryKey: ["shipping-method-provinces"],
    queryFn: async () => {
      const res = await baseAxios.get("/shipping-methods/location/provinces");
      const provinces = res.data.data as { code: string; name: string }[];

      const map = provinces.reduce<Record<string, string>>((acc, cur) => {
        acc[cur.code] = cur.name;   // ✅ giữ nguyên chuỗi code
        return acc;
      }, {});

      console.log("✅ provinceMap:", map); // DEBUG
      return map;
    },
  });
}

// ----------------- Detail Component -----------------
function ShippingZonesDetail({ shippingMethodId }: { shippingMethodId: number }) {
  const { data, isLoading } = useQuery<Zone[]>({
    queryKey: ["shipping-method-zones", shippingMethodId],
    queryFn: async () => {
      const res = await baseAxios.get(`/shipping-methods/${shippingMethodId}`);
      console.log("✅ zones:", res.data.data.zones); // DEBUG
      return res.data.data.zones;
    },
  });

  const provincesQuery = useProvinces();

  if (isLoading || provincesQuery.isLoading) return <span>Đang tải zones...</span>;

  const provinceMap = provincesQuery.data || {};

  return (
    <Fieldset legend="Danh sách Zones">
      <MyDataTable
        data={data || []}
        columns={[
          {
            header: "Tên tỉnh/TP",
            Cell: ({ row }: any) => {
              const rawCode = row.original.province_code; // ví dụ "01", "79"
              const name = provinceMap?.[rawCode];
              console.log("👉 Render row:", rawCode, "=>", name); // DEBUG
              return name ?? `Mã ${rawCode}`;
            },
          },
          {
            accessorKey: "fee",
            header: "Phí vận chuyển",
            Cell: ({ row }: any) =>
              `${row.original.fee.toLocaleString("vi-VN")} đ`,
          },
          {
            accessorKey: "is_available",
            header: "Trạng thái",
            Cell: ({ row }: any) =>
              row.original.is_available ? (
                <Badge color="green">Khả dụng</Badge>
              ) : (
                <Badge color="red">Ngưng</Badge>
              ),
          },
          {
            accessorKey: "created_at",
            header: "Ngày tạo",
            Cell: ({ row }: any) =>
              new Date(row.original.created_at).toLocaleString("vi-VN"),
          },
        ]}
      />
    </Fieldset>
  );
}


// ----------------- Main Component -----------------
export default function F_k8gyh3atv7_Read() {
  const [importData, setImportData] = useState(false);
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  });

  const AllQuery = useQuery<ShippingMethod[]>({
    queryKey: ["F_k8gyh3atv7_Read"],
    queryFn: async () => {
      const AllQuery = await baseAxios.get("/shipping-methods");
      return AllQuery.data.data;
    }
  });

  const columns = useMemo<MRT_ColumnDef<ShippingMethod>[]>(() => [
    { header: "Phương thức giao hàng", accessorKey: "name" },
    { header: "Mô tả", accessorKey: "description" },
    { header: "Thời gian giao hàng", accessorKey: "estimated_time" },
    {
      header: "Trạng thái",
      Cell: ({ row }) => row.original.is_active ? "Hoạt động" : "Không hoạt động",
    },
    {
      header: "Giao hàng tiêu chuẩn",
      Cell: ({ row }) => row.original.is_default ? "Có" : "Không",
    },
    { header: "Thời gian tạo", accessorKey: "created_at" },
  ], []);

  const exportConfig = {
    fields: [
      { fieldName: "name", header: "Phương thức giao hàng" },
      { fieldName: "description", header: "Mô tả" },
      { fieldName: "estimated_time", header: "Thời gian giao hàng" },
      { fieldName: "is_active", header: "Trạng thái" },
      { fieldName: "is_default", header: "Giao hàng tiêu chuẩn" },
      { fieldName: "created_at", header: "Thời gian tạo" },
    ],
  };

  if (AllQuery.isLoading) return "Loading...";
  if (AllQuery.isError) return "Error!";

  return (
    <Fieldset legend="Danh sách phương thức giao hàng">
      <MyFlexColumn>
        <MyDataTable
          enableRowSelection
          enableRowNumbers
          renderTopToolbarCustomActions={({ table }) => (
            <Group>
              <F_k8gyh3atv7_Create />
              <AQButtonCreateByImportFile
                setImportedData={setImportData}
                form={form_multiple}
                onSubmit={() => {
                  console.log(form_multiple.values);
                }}
              >
                Import
              </AQButtonCreateByImportFile>
              <AQButtonExportData
                isAllData
                objectName="PTGH"
                data={AllQuery.data || []}
                exportConfig={exportConfig}
              />
            </Group>
          )}
          columns={columns}
          data={AllQuery.data || []}
          renderRowActions={({ row }) => (
            <MyCenterFull>
              <F_k8gyh3atv7_Update values={row.original} />
              <F_k8gyh3atv7_Delete id={row.original.id} />
            </MyCenterFull>
          )}
          // 👉 Thêm chi tiết khi expand
          renderDetailPanel={({ row }) => (
            <ShippingZonesDetail shippingMethodId={row.original.id} />
          )}
        />
      </MyFlexColumn>
    </Fieldset>
  );
}
