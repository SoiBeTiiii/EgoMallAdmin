'use client';

import {
  Group,
  Anchor,
  Tooltip,
  ActionIcon,
  Button,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { MyCenterFull, MyDataTable } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconEye, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { toast } from 'react-toastify';

import baseAxios from '@/api/baseAxios';
import Variant_Create from './variant_Creat';
import VariantOption_Delete from './variant_Delete';
import VariantOption_Update from './variant_Update';

export interface VariantOption {
  id: number;
  name: string;
  values: VariantValue[];
  created_at: string;
  updated_at: string;
}

export interface VariantValue {
  id: number;
  option_id: number;
  value: string;
}

export default function Variant_Read() {
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const AllQuery = useQuery<VariantOption[]>({
    queryKey: ['VariantOption'],
    queryFn: async () => {
      const res = await baseAxios.get('/variant-options');
      return res.data.data;
    },
  });

  const refetchData = () => AllQuery.refetch?.();

  const columns = useMemo<MRT_ColumnDef<VariantOption>[]>(() => [
    {
      header: 'Tên biến thể',
      accessorKey: 'name',
      Cell: ({ cell, row }) => (
        <Anchor
          component="button"
          type="button"
          onClick={() => router.push(`/admin/variant/${row.original.id}`)}
        >
          {cell.getValue<string>()}
        </Anchor>
      ),
    },
    {
      header: 'Ngày tạo',
      accessorKey: 'created_at',
      Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleString(),
    },
    {
      header: 'Ngày cập nhật',
      accessorKey: 'updated_at',
      Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleString(),
    },
  ], [router]);

  if (AllQuery.isLoading) return 'Đang tải dữ liệu...';
  if (AllQuery.isError) return 'Lỗi tải dữ liệu!';

  return (
    <MyDataTable
      enableRowSelection
      data={AllQuery.data || []}
      columns={columns}
      state={{ rowSelection }}
      onRowSelectionChange={setRowSelection}
      getRowId={(row) => row.id.toString()}
      renderTopToolbarCustomActions={({ table }) => {
        const selectedRows = table.getSelectedRowModel().rows;
        const selectedIds = selectedRows.map((row) => row.original.id);

        const handleBulkDelete = () => {
          modals.openConfirmModal({
            title: 'Xác nhận xóa',
            centered: true,
            children: `Bạn có chắc chắn muốn xóa ${selectedIds.length} biến thể đã chọn?`,
            labels: { confirm: 'Xóa', cancel: 'Hủy' },
            confirmProps: { color: 'red', loading: bulkDeleting },
            onConfirm: async () => {
              setBulkDeleting(true);
              try {
                const results = await Promise.allSettled(
                  selectedIds.map((id) => baseAxios.delete(`/variant-options/${id}`))
                );

                const success = results.filter(r => r.status === 'fulfilled');
                const failed = results.filter(r => r.status === 'rejected');

                if (success.length > 0)
                  toast.success(`✅ Đã xóa ${success.length} biến thể thành công`);

                if (failed.length > 0) {
                  const reasons = failed.map((r: any, i) => {
                    const msg =
                      r.reason?.response?.data?.message ??
                      `ID ${selectedIds[i]} lỗi không xác định`;
                    return `❌ ${msg}`;
                  });

                  toast.error(`Không thể xóa ${failed.length} biến thể:\n` + reasons.join('\n'), {
                    autoClose: 8000,
                  });
                }

                setRowSelection({});
                refetchData();
              } catch (err) {
                toast.error('Lỗi không xác định');
              } finally {
                setBulkDeleting(false);
              }
            },

          });
        };

        return (
          <Group>
            <Variant_Create />
            {selectedIds.length > 0 && (
              <Button
                color="red"
                leftSection={<IconTrash size={16} />}
                loading={bulkDeleting}
                onClick={handleBulkDelete}
              >
                Xóa đã chọn ({selectedIds.length})
              </Button>
            )}
          </Group>
        );
      }}
      renderRowActions={({ row }) => (
        <MyCenterFull>
          <Tooltip label="Xem chi tiết">
            <ActionIcon onClick={() => router.push(`/admin/variant/${row.original.id}`)}>
              <IconEye size={18} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Chỉnh sửa">
            <div>
              <VariantOption_Update
                data={{
                  ...row.original,
                  values: row.original.values,
                }}
              />
            </div>
          </Tooltip>

          <Tooltip label="Xóa">
            <VariantOption_Delete
              id={row.original.id}
              onDeleted={refetchData}
            />
          </Tooltip>
        </MyCenterFull>
      )}
    />
  );
}
