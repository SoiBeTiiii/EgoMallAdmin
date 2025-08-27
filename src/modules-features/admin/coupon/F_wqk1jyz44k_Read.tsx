'use client';

import { Group, Anchor, Tooltip, ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import {
  AQButtonCreateByImportFile,
  AQButtonExportData,
  MyCenterFull,
  MyDataTable,
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { IconEye } from '@tabler/icons-react'; // icon con mắt
import F_wqk1jyz44k_Create from "./F_wqk1jyz44k_Create";
import F_wqk1jyz44k_Update from "./F_wqk1jyz44k_Update";
import F_wqk1jyz44k_Delete from "./F_wqk1jyz44k_Delete";
import baseAxios from "@/api/baseAxios";

export interface I_wqk1jyz44k_Read {
  id: number;
  code: string;
  description: string;
  discount_type: 'percent' | 'amount';
  discount_value: number;
  min_order_value: number;
  max_discount: number;
  usage_limit: number;
  discount_limit: number;
  start_date: string;
  end_date: string;
  status: 0 | 1;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export default function F_wqk1jyz44k_Read() {
  const router = useRouter();

  const AllQuery = useQuery<I_wqk1jyz44k_Read[]>({
    queryKey: ["I_wqk1jyz44k_Read"],
    queryFn: async () => {
      const res = await baseAxios.get("/coupons");
      return res.data.data;
    },
  });


  const columns = useMemo<MRT_ColumnDef<I_wqk1jyz44k_Read>[]>(() => [
    {
      header: "Mã khuyến mại",
      accessorKey: "code",
      Cell: ({ cell, row }) => (
        <Anchor
          component="button"
          type="button"
          onClick={() => router.push(`/admin/coupon/${row.original.id}`)}
          style={{ cursor: 'pointer' }}
        >
          {cell.getValue<string>()}
        </Anchor>
      ),
    },
    {
      header: "Loại giảm giá",
      accessorKey: "discount_type",
      Cell: ({ cell }) =>
        cell.getValue() === "percent" ? "Phần trăm (%)" : "Số tiền (VNĐ)",
    },
    { header: "Giá trị giảm", accessorKey: "discount_value" },
    {
      header: "Trạng thái",
      accessorKey: "status",
      Cell: ({ cell }) => (cell.getValue() === true ? "Kích hoạt" : "Tắt"),
    },
  ], [router]);

  if (AllQuery.isLoading) return "Đang tải dữ liệu...";
  if (AllQuery.isError) return "Lỗi tải dữ liệu!";

  return (
    <MyDataTable
      enableRowSelection
      data={AllQuery.data || []}
      columns={columns}
      renderTopToolbarCustomActions={() => (
        <Group>
          <F_wqk1jyz44k_Create /> 
          
        </Group>
      )}
      renderRowActions={({ row }) => (
        <MyCenterFull>
          <Tooltip label="Xem chi tiết">
            <ActionIcon onClick={() => router.push(`/admin/coupon/${row.original.id}`)}>
              <IconEye size={18} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Chỉnh sửa">
            <div>
              <F_wqk1jyz44k_Update data={row.original} />
            </div>
          </Tooltip>
          <Tooltip label="Xóa">
            <div>
              <F_wqk1jyz44k_Delete id={row.original.id} />
            </div>
          </Tooltip>
        </MyCenterFull>
      )}
    />
  );
}



