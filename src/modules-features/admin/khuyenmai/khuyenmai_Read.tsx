'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ActionIcon,
  Anchor,
  Button,
  Group,
  Tooltip,
} from '@mantine/core';
import { IconEdit, IconEye } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'mantine-react-table';
import {
  MyCenterFull,
  MyDataTable,
} from 'aq-fe-framework/components';

import baseAxios from '@/api/baseAxios';
import Khuyenmai_Delete from './khuyenmai_Delete';
import PromotionCreate from './khuyenmai_Create';
import Khuyenmai_Update from './khuyenmai_Update';
import AQButtonExportData from '@/components/Buttons/ButtonCRUD/AQButtonExportData';

export interface Gift {
  type: 'variant';
  parent_id: number;
  variant_id: number;
   product_id?: number;
}

export interface AppliedProduct {
  // type: 'variant';
  type: 'all product' | 'variant';
  parent_id: number;
  variant_id: number;
  product_id: number;
}

export interface Promotion {
  id: number;
  name: string;
  promotion_type: 'buy_get' | 'percentage';
  start_date: string;
  end_date: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  gift?: Gift;
  buy_quantity?: number;
  get_quantity?: number;
  discount_type?: string;
  discount_value?: string;
  applied_products: AppliedProduct[];
}

export default function Khuyenmai_Read() {
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const { data, isLoading, isError, refetch } = useQuery<Promotion[]>({
    queryKey: ['khuyenmai_Read'],
    queryFn: async () => {
      const res = await baseAxios.get('/promotions');
      return res.data.data;
    },
  });

  const exportConfig = {
    fields: [
      { header: 'Chương trình', fieldName: 'name' },
      { header: 'Loại khuyến mãi', fieldName: 'promotion_type' },
      { header: 'Ngày bắt đầu', fieldName: 'start_date' },
      { header: 'Ngày kết thúc', fieldName: 'end_date' },
      { header: 'Trạng thái', fieldName: 'status' },
    ],
  };

  const columns = useMemo<MRT_ColumnDef<Promotion>[]>(() => [
    {
      header: 'Chương trình',
      accessorKey: 'name',
      Cell: ({ cell, row }) => (
        <Anchor
          component="button"
          type="button"
          onClick={() => router.push(`/admin/khuyenmai/${row.original.id}`)}
        >
          {cell.getValue<string>()}
        </Anchor>
      ),
    },
    {
      header: 'Loại khuyến mãi',
      accessorKey: 'promotion_type',
    },
    {
      header: 'Ngày bắt đầu',
      accessorKey: 'start_date',
    },
    {
      header: 'Ngày kết thúc',
      accessorKey: 'end_date',
    },
    {
      header: 'Trạng thái',
      accessorKey: 'status',
    },
  ], [router]);

  if (isLoading) return 'Đang tải dữ liệu...';
  if (isError) return 'Lỗi khi tải dữ liệu!';

  return (
    <MyDataTable
      enableRowSelection
      data={data || []}
      columns={columns}
      state={{ rowSelection }}
      onRowSelectionChange={setRowSelection}
      getRowId={(row) => row.id.toString()}
      renderTopToolbarCustomActions={({ table }) => (
        <Group>
          <PromotionCreate onSuccess={refetch} />
          <AQButtonExportData
            isAllData
            objectName="Danh sách khuyến mãi"
            data={data || []}
            exportConfig={exportConfig}
          />
        </Group>
      )}
      renderRowActions={({ row }) => (
        <MyCenterFull>
          <Tooltip label="Xem chi tiết">
            <ActionIcon onClick={() => router.push(`/admin/khuyenmai/${row.original.id}`)}>
              <IconEye size={18} />
            </ActionIcon>
          </Tooltip>

          <Khuyenmai_Update
            data={row.original}
            onUpdated={refetch}
          />

          <Khuyenmai_Delete
            id={row.original.id}
            onDeleted={refetch}
          />
        </MyCenterFull>
      )}
    />
  );
}


