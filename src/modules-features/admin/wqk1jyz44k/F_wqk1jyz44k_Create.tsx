'use client'

import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import MySelect from "@/components/Combobox/Select/MySelect";
import { useForm } from "@mantine/form";
import { MyTextInput } from "aq-fe-framework/components";

export interface F_wqk1jyz44k_CreateProps { 
  id?: number;
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed'; // Có thể dùng enum nếu bạn muốn
  discount_value: number;
  min_order_value: number;
  max_discount: number;
  usage_limit: number;
  discount_limit: number;
  start_date: string;   // ISO format: yyyy-mm-dd
  end_date: string;     // ISO format
  status: boolean;
  created_at: string;   // ISO datetime string
  updated_at: string;   // ISO datetime string
}
export default function F_wqk1jyz44k_Create() {
    const form = useForm<F_wqk1jyz44k_CreateProps>({
        initialValues: {
            code: '',
            description: '',
            discount_type: 'percentage',
            discount_value: 0,
            min_order_value: 0,
            max_discount: 0,
            usage_limit: 0,
            discount_limit: 0,
            start_date: '',
            end_date: '',
            status: false,
            created_at: '',
            updated_at: ''
        }
    });

    return (
        <MyButtonCreate label="Thêm khuyễn mãi" form={form} onSubmit={() => {}} objectName="Khuyễn mại">
            <MyTextInput label="Mã khuyến mại" {...form.getInputProps("code")} />
            <MyTextInput label="Mô tả" {...form.getInputProps("description")} />
            <MySelect label="Loại khuyễn mại" data={['percentage', 'fixed']} {...form.getInputProps("discount_type")} />
            <MyTextInput label="Giá trị giảm" {...form.getInputProps("discount_value")} />
            <MyTextInput label="Đơn tối thiểu" {...form.getInputProps("min_order_value")} />
            <MyTextInput label="Giảm tối đa" {...form.getInputProps("max_discount")} />
            <MyTextInput label="Tổng lượt dùng" {...form.getInputProps("usage_limit")} />
            <MyTextInput label="Lượt dùng mỗi người" {...form.getInputProps("discount_limit")} />
            <MyTextInput label="Ngày bắt đầu" {...form.getInputProps("start_date")} />
            <MyTextInput label="Ngày kết thúc" {...form.getInputProps("end_date")} />
            <MyCheckbox label="Trạng thái" {...form.getInputProps("status")} />
        </MyButtonCreate>
    )
}