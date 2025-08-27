'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { modals } from "@mantine/modals";
import { toast } from "react-toastify";
import baseAxios from "@/api/baseAxios";
import { ActionIcon, Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

export default function VariantOption_Delete({
  id,
  onDeleted,
  buttonMode = false, // nếu true thì dùng Button, ngược lại dùng ActionIcon
}: {
  id: number;
  onDeleted?: () => void;
  buttonMode?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const openConfirmDelete = () => {
    modals.openConfirmModal({
      title: "Xác nhận xóa biến thể",
      centered: true,
      children: "Bạn có chắc chắn muốn xóa biến thể này? Thao tác không thể hoàn tác.",
      labels: { confirm: "Xóa", cancel: "Hủy" },
      confirmProps: { color: "red", loading },
      onConfirm: async () => {
        setLoading(true);
        try {
          await baseAxios.delete(`/variant-options/${id}`);
          toast.success("Xóa biến thể thành công");
          onDeleted?.();
          router.refresh();
        } catch (error: any) {
          console.error("Delete failed:", error.response?.data || error);
          const msg = error?.response?.data?.message || "Xóa biến thể thất bại";
          toast.error(msg);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  if (buttonMode) {
    return (
      <Button
        variant="light"
        color="red"
        leftSection={<IconTrash size={18} />}
        loading={loading}
        onClick={openConfirmDelete}
      >
        Xóa
      </Button>
    );
  }

  return (
    <ActionIcon color="red" onClick={openConfirmDelete} loading={loading}>
      <IconTrash size={18} />
    </ActionIcon>
  );
}
