"use client"
import baseAxios from '@/api/baseAxios';
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import { Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MyCheckbox, MySelect, MyTextInput } from 'aq-fe-framework/components';
import { useEffect, useState } from 'react';

interface I_wqk1jyz44k_Update {
  id?: number;
  code: string;
  description: string;
  discount_type: string; // Có thể dùng enum nếu bạn muốn
  discount_value: number;
  min_order_value: number;
  max_discount: number;
  usage_limit: number;
  discount_limit: number;
  start_date: string;   // ISO format: yyyy-mm-dd
  end_date: string;     // ISO format
  status: boolean;
  created_at: string;   // ISO datetime string
  updated_at: string; 
}

export default function F_umg0mq7o3x_Update({data}:{data:I_wqk1jyz44k_Update}) {
    const [fileData, setFileData] = useState<any[]>([]);
    
    const form = useForm<I_wqk1jyz44k_Update>({
        initialValues:data,
        validate: {
            code: (value) => value ? null : 'Không được để trống',
        }
    });

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData });
    }, [fileData]);
    useEffect(() => {
        form.setValues(data);
    }, [data]);

    return (
        <Group>
            <MyActionIconUpdate
                form={form}
                onSubmit={() => {
                }}
            >
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
            </MyActionIconUpdate>
        </Group>
    );
}