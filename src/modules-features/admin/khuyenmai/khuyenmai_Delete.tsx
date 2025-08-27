'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { modals } from '@mantine/modals';
import { toast } from 'react-toastify';
import baseAxios from '@/api/baseAxios';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export default function Khuyenmai_Delete({
  id,
  onDeleted,
}: {
  id: number;
  onDeleted?: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const openConfirmDelete = () => {
    modals.openConfirmModal({
      title: 'Xác nhận xóa chương trình',
      centered: true,
      children: 'Bạn có chắc chắn muốn xóa chương trình khuyến mãi này?',
      labels: { confirm: 'Xóa', cancel: 'Hủy' },
      confirmProps: { color: 'red', loading },
      onConfirm: async () => {
        setLoading(true);
        try {
          await baseAxios.delete(`/promotions/${id}`);
          toast.success('✅ Đã xóa chương trình thành công');

          if (onDeleted) onDeleted();

          router.push('/admin/khuyenmai'); 
          router.refresh();
        } catch (err) {
          console.error(err);
          toast.error('❌ Xóa chương trình thất bại');
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <Tooltip label="Xóa chương trình" color="red">
      <ActionIcon color="red" onClick={openConfirmDelete} loading={loading}>
        <IconTrash size={18} />
      </ActionIcon>
    </Tooltip>
  );
}
