"use client";
import baseAxios from '@/api/baseAxios';
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import { Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MyCheckbox, MySelect, MyTextInput } from 'aq-fe-framework/components';
import { useEffect } from 'react';
import { toast } from "react-toastify";

export interface I_wqk1jyz44k_Update {
  id?: number;
  code: string;
  description: string;
  discount_type: 'percent' | 'amount';
  discount_value: number;
  min_order_value: number;
  max_discount: number;
  usage_limit: number;
  discount_limit: number;
  start_date: string;  // yyyy-mm-dd
  end_date: string;    // yyyy-mm-dd
  status: 0 | 1;
  created_at: string;
  updated_at: string;
}

interface F_wqk1jyz44k_UpdateProps {
  data: I_wqk1jyz44k_Update;
}

export default function F_wqk1jyz44k_Update({ data }: F_wqk1jyz44k_UpdateProps) {
  const form = useForm<I_wqk1jyz44k_Update>({
    initialValues: {
      ...data,
      discount_value: Number(data.discount_value),
      min_order_value: Number(data.min_order_value),
      max_discount: Number(data.max_discount),
      usage_limit: Number(data.usage_limit),
      discount_limit: Number(data.discount_limit),
      status: data.status, // data.status đã là 0 hoặc 1 rồi
      start_date: data.start_date.split('T')[0],
      end_date: data.end_date.split('T')[0],
    },
    validate: {
      code: (val) => val.trim() ? null : 'Mã không được để trống',
      description: (val) => val.trim() ? null : 'Mô tả không được để trống',
      discount_value: (val) => (val >= 0 ? null : 'Giá trị giảm không được nhỏ hơn 0'),
      min_order_value: (val) => (val >= 0 ? null : 'Đơn tối thiểu không được nhỏ hơn 0'),
      max_discount: (val) => (val > 0 ? null : 'Giảm tối đa phải lớn hơn 0'),
      usage_limit: (val) => (val >= 1 ? null : 'Tổng lượt dùng phải lớn hơn hoặc bằng 1'),
      discount_limit: (val, values) => (val >= 1 && val <= values.usage_limit ? null : 'Lượt dùng mỗi người phải từ 1 đến tổng lượt dùng'),
      start_date: (val) => {
        if (!val) return 'Vui lòng chọn ngày bắt đầu';
        const start = new Date(val);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return start >= now ? null : 'Ngày bắt đầu phải từ hôm nay trở đi';
      },
      end_date: (val, values) => {
        if (!val) return 'Vui lòng chọn ngày kết thúc';
        const end = new Date(val);
        const start = new Date(values.start_date);
        return end > start ? null : 'Ngày kết thúc phải sau ngày bắt đầu';
      },
    }
  });

  useEffect(() => {
    form.setValues({
      ...data,
      discount_value: Number(data.discount_value),
      min_order_value: Number(data.min_order_value),
      max_discount: Number(data.max_discount),
      usage_limit: Number(data.usage_limit),
      discount_limit: Number(data.discount_limit),
      status: data.status,
      start_date: data.start_date.split('T')[0],
      end_date: data.end_date.split('T')[0],
    });
  }, [data]);

  const handleSubmit = async (values: I_wqk1jyz44k_Update) => {
    const validation = await form.validate();
    if (validation.hasErrors) {
      toast.error("Vui lòng kiểm tra các trường bị lỗi");
      return;
    }

    try {
      const payload = {
        ...values,
        status: values.status,
        start_date: new Date(values.start_date).toISOString(),
        end_date: new Date(values.end_date).toISOString(),
      };

      await baseAxios.put(`/coupons/${values.id}`, payload);
      toast.success("Cập nhật mã khuyến mãi thành công");
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật mã khuyến mãi thất bại");
    }
  };

  return (
    <MyActionIconUpdate form={form} onSubmit={handleSubmit}>
      <MyTextInput label="Mã khuyến mãi" required {...form.getInputProps("code")} />
      <MyTextInput label="Mô tả" required {...form.getInputProps("description")} />

      <Group grow>
        <MySelect
          label="Loại khuyến mãi"
          data={[
            { label: 'Phần trăm (%)', value: 'percent' },
            { label: 'Số tiền (VNĐ)', value: 'amount' },
          ]}
          {...form.getInputProps("discount_type")}
        />
        <MyTextInput label="Giá trị giảm" type="number" {...form.getInputProps("discount_value")} />
      </Group>

      <Group grow>
        <MyTextInput label="Đơn tối thiểu" type="number" {...form.getInputProps("min_order_value")} />
        <MyTextInput label="Giảm tối đa" type="number" {...form.getInputProps("max_discount")} />
      </Group>

      <Group grow>
        <MyTextInput label="Tổng lượt dùng" type="number" {...form.getInputProps("usage_limit")} />
        <MyTextInput label="Lượt dùng mỗi người" type="number" {...form.getInputProps("discount_limit")} />
      </Group>

      <Group grow>
        <MyTextInput label="Ngày bắt đầu" type="date" {...form.getInputProps("start_date")} />
        <MyTextInput label="Ngày kết thúc" type="date" {...form.getInputProps("end_date")} />
      </Group>

      <MyCheckbox
        label="Trạng thái (kích hoạt)"
        checked={Boolean(Number(form.values.status))}
        onChange={event => form.setFieldValue('status', event.currentTarget.checked ? 1 : 0)}
    />

    </MyActionIconUpdate>
  );
}






// "use client"
// import baseAxios from '@/api/baseAxios';
// import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
// import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
// import { Group } from '@mantine/core';
// import { useForm } from '@mantine/form';
// import { MyCheckbox, MySelect, MyTextInput } from 'aq-fe-framework/components';
// import { useEffect, useState } from 'react';

// interface I_wqk1jyz44k_Update {
//   id?: number;
//   code: string;
//   description: string;
//   discount_type: string; // Có thể dùng enum nếu bạn muốn
//   discount_value: number;
//   min_order_value: number;
//   max_discount: number;
//   usage_limit: number;
//   discount_limit: number;
//   start_date: string;   // ISO format: yyyy-mm-dd
//   end_date: string;     // ISO format
//   status: boolean;
//   created_at: string;   // ISO datetime string
//   updated_at: string; 
// }

// export default function F_umg0mq7o3x_Update({data}:{data:I_wqk1jyz44k_Update}) {
//     const [fileData, setFileData] = useState<any[]>([]);
    
//     const form = useForm<I_wqk1jyz44k_Update>({
//         initialValues:data,
//         validate: {
//             code: (value) => value ? null : 'Không được để trống',
//         }
//     });

//     const form_multiple = useForm<any>({
//         initialValues: {
//             importedData: []
//         },
//     });

//     useEffect(() => {
//         form_multiple.setValues({ importedData: fileData });
//     }, [fileData]);
//     useEffect(() => {
//         form.setValues(data);
//     }, [data]);

//     return (
//         <Group>
//             <MyActionIconUpdate
//                 form={form}
//                 onSubmit={() => {
//                 }}
//             >
//                 <MyTextInput label="Mã khuyến mại" {...form.getInputProps("code")} />
//                             <MyTextInput label="Mô tả" {...form.getInputProps("description")} />
//                             <MySelect label="Loại khuyễn mại" data={['percentage', 'fixed']} {...form.getInputProps("discount_type")} />
//                             <MyTextInput label="Giá trị giảm" {...form.getInputProps("discount_value")} />
//                             <MyTextInput label="Đơn tối thiểu" {...form.getInputProps("min_order_value")} />
//                             <MyTextInput label="Giảm tối đa" {...form.getInputProps("max_discount")} />
//                             <MyTextInput label="Tổng lượt dùng" {...form.getInputProps("usage_limit")} />
//                             <MyTextInput label="Lượt dùng mỗi người" {...form.getInputProps("discount_limit")} />
//                             <MyTextInput label="Ngày bắt đầu" {...form.getInputProps("start_date")} />
//                             <MyTextInput label="Ngày kết thúc" {...form.getInputProps("end_date")} />
//                             <MyCheckbox label="Trạng thái" {...form.getInputProps("status")} />
//             </MyActionIconUpdate>
//         </Group>
//     );
// }