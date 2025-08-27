'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { modals } from "@mantine/modals";
import { toast } from "react-toastify";
import baseAxios from "@/api/baseAxios";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
                      
export default function F_yx9uggkp3c_Delete({
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
      title: "Xác nhận xóa",
      centered: true,
      children: "Bạn có chắc chắn muốn xóa mã khuyến mãi này?",
      labels: { confirm: "Xóa", cancel: "Hủy" },
      confirmProps: { color: "red", loading: loading },
      onConfirm: async () => {
        setLoading(true);
        try {
          await baseAxios.delete(`/coupons/${id}`);
          toast.success("Xóa mã khuyến mãi thành công");

          // Gọi callback cập nhật UI nếu có
          if (onDeleted) onDeleted();

          // Optional: sync lại server nếu bạn dùng SSR hoặc revalidate
          router.refresh();
        } catch (error) {
          console.error(error);
          toast.error("Xóa thất bại");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    // <Tooltip label="Xóa">
      <ActionIcon color="red" onClick={openConfirmDelete} loading={loading}>
        <IconTrash size={18} />
      </ActionIcon>
    // </Tooltip>
  );
}
