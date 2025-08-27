'use client';

import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MySelect from "@/components/Combobox/Select/MySelect";
import { useForm } from "@mantine/form";
import {
  IconClock,
  IconCheck,
  IconTruck,
  IconPackage,
  IconX,
} from '@tabler/icons-react';

const statusIconMap: Record<string, JSX.Element> = {
  ordered: <IconClock size={18} color="orange" />,
  confirmed: <IconCheck size={18} color="blue" />,
  shipping: <IconTruck size={18} color="orange" />,
  delivered: <IconPackage size={18} color="green" />,
  cancelled: <IconX size={18} color="red" />,
};

export default function I_mnxwdc651m_Status({ values }: { values: { unique_id: string; status: string } }) {
  const { unique_id, status } = values;

  const form = useForm<{ unique_id: string; status: string }>({
    initialValues: values,
  });

  return (
    <MyActionIconUpdate
  icon={statusIconMap[status]}
  form={form}
  onSubmit={(values) => {
    return baseAxios.post(`/orders/change-status/${values.unique_id}`, values);
  }}
>

      <MySelect
        data={[
          { value: 'ordered', label: 'Đã đặt hàng' },
          { value: 'confirmed', label: 'Đã xác nhận' },
          { value: 'shipping', label: 'Đang giao hàng' },
          { value: 'delivered', label: 'Đã giao hàng' },
          { value: 'cancelled', label: 'Đã huỷ' },
        ]}
        label="Trạng thái"
        {...form.getInputProps("status")}
      />
    </MyActionIconUpdate>
  );
}
