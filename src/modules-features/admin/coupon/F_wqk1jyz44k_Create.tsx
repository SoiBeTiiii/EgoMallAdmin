'use client';
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import MySelect from "@/components/Combobox/Select/MySelect";
import { useForm } from "@mantine/form";
import { Group } from "@mantine/core";
import { MyTextInput } from "aq-fe-framework/components";
import { toast } from "react-toastify";
import baseAxios from "@/api/baseAxios";
import { useState } from "react";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";


export interface F_wqk1jyz44k_CreateProps {
    id?: number;
    code: string;
    description: string;
    discount_type: 'percent' | 'amount';
    discount_value: number | '';
    min_order_value: number | '';
    max_discount: number | '';
    usage_limit: number | '';
    discount_limit: number | '';
    start_date: string;
    end_date: string;
    status: boolean;
    created_at?: string;
    updated_at?: string;
}

const convertToTimestamp = (dateStr: string) => {
    if (!dateStr) return null;
    return new Date(dateStr).toISOString();
};

const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

export default function F_wqk1jyz44k_Create() {
    const [isCheckingCode, setIsCheckingCode] = useState(false);

    const form = useForm<F_wqk1jyz44k_CreateProps>({
        validateInputOnBlur: true,
        initialValues: {
            code: '',
            description: '',
            discount_type: 'percent',
            discount_value: '',
            min_order_value: '',
            max_discount: '',
            usage_limit: '',
            discount_limit: '',
            start_date: today,
            end_date: tomorrow,
            status: true,
            created_at: '',
            updated_at: '',
        },
        validate: {
            code: (val) => val.trim() ? null : 'Mã không được để trống',
            description: (val) => val.trim() ? null : 'Mô tả không được để trống',
            discount_value: (val) =>
                val === '' || val >= 0 ? null : 'Giá trị giảm không được nhỏ hơn 0',
            min_order_value: (val) =>
                val === '' || val >= 0 ? null : 'Đơn tối thiểu không được nhỏ hơn 0',
            max_discount: (val) =>
                val === '' || val > 0 ? null : 'Giảm tối đa không được nhỏ hơn 0',
            usage_limit: (val) =>
                val !== '' && val >= 1 ? null : 'Tổng lượt dùng phải lớn hơn hoặc bằng 1',
            discount_limit: (val, values) => {
                if (val === '' || values.usage_limit === '') return 'Lượt dùng mỗi người phải từ 1 đến tổng lượt dùng';
                const discountVal = Number(val);
                const usageVal = Number(values.usage_limit);
                return discountVal >= 1 && discountVal <= usageVal
                    ? null
                    : 'Lượt dùng mỗi người phải từ 1 đến tổng lượt dùng';
            },
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
        },
    });

    const handleSubmit = async (values: F_wqk1jyz44k_CreateProps) => {
        const validateResult = await form.validate();
        if (validateResult.hasErrors) {
            toast.error("Vui lòng kiểm tra các trường bị lỗi");
            return;
        }

        try {
            await baseAxios.post("/coupons", {
                ...values,
                start_date: convertToTimestamp(values.start_date),
                end_date: convertToTimestamp(values.end_date),
            });
            toast.success("Thêm thành công!")

        } catch (error: any) {
            const message = error.response?.data?.errors?.code?.[0];
            if (message === "The code has already been taken.") {
                form.setFieldError("code", "Mã khuyến mãi đã tồn tại");
            } else {
                toast.error("Đã xảy ra lỗi khi thêm khuyến mãi");
            }
            // Ném lỗi để MyButtonCreate không hiển thị toast thành công
            throw error;
        }
    };

    return (
        <MyButtonCreate
            label="Thêm khuyến mãi"
            form={form}
            onSubmit={handleSubmit}
            objectName="Khuyến mãi"
        >
            <MyTextInput
                label="Mã khuyến mãi"
                required
                rightSection={isCheckingCode ? '⏳' : null}
                {...form.getInputProps("code")}
            />

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
                <MyTextInput
                    label="Giá trị giảm"
                    type="number"
                    {...form.getInputProps("discount_value", { withValue: true })}
                />
            </Group>

            <Group grow>
                <MyTextInput
                    label="Đơn tối thiểu"
                    type="number"
                    {...form.getInputProps("min_order_value", { withValue: true })}
                />
                <MyTextInput
                    label="Giảm tối đa"
                    type="number"
                    {...form.getInputProps("max_discount", { withValue: true })}
                />
            </Group>

            <Group grow>
                <MyTextInput
                    label="Tổng lượt dùng"
                    type="number"
                    {...form.getInputProps("usage_limit", { withValue: true })}
                />
                <MyTextInput
                    label="Lượt dùng mỗi người"
                    type="number"
                    {...form.getInputProps("discount_limit", { withValue: true })}
                />
            </Group>

            <Group grow>
                <MyTextInput
                    label="Ngày bắt đầu"
                    type="date"
                    {...form.getInputProps("start_date")}
                />
                <MyTextInput
                    label="Ngày kết thúc"
                    type="date"
                    {...form.getInputProps("end_date")}
                />
            </Group>

            <MyCheckbox
                label="Trạng thái (kích hoạt)"
                {...form.getInputProps("status", { type: 'checkbox' })}
            />
        </MyButtonCreate>
    );
}





// 'use client'

// import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
// import MyCheckbox from "@/components/Checkbox/MyCheckbox";
// import MySelect from "@/components/Combobox/Select/MySelect";
// import { useForm } from "@mantine/form";
// import { MyTextInput } from "aq-fe-framework/components";

// export interface F_wqk1jyz44k_CreateProps {
//   id?: number;
//   code: string;
//   description: string;
//   discount_type: 'percentage' | 'fixed'; // Có thể dùng enum nếu bạn muốn
//   discount_value: number;
//   min_order_value: number;
//   max_discount: number;
//   usage_limit: number;
//   discount_limit: number;
//   start_date: string;   // ISO format: yyyy-mm-dd
//   end_date: string;     // ISO format
//   status: boolean;
//   created_at: string;   // ISO datetime string
//   updated_at: string;   // ISO datetime string
// }
// export default function F_wqk1jyz44k_Create() {
//     const form = useForm<F_wqk1jyz44k_CreateProps>({
//         initialValues: {
//             code: '',
//             description: '',
//             discount_type: 'percentage',
//             discount_value: 0,
//             min_order_value: 0,
//             max_discount: 0,
//             usage_limit: 0,
//             discount_limit: 0,
//             start_date: '',
//             end_date: '',
//             status: false,
//             created_at: '',
//             updated_at: ''
//         }
//     });

//     return (
//         <MyButtonCreate label="Thêm khuyễn mãi" form={form} onSubmit={() => {}} objectName="Khuyễn mại">
//             <MyTextInput label="Mã khuyến mại" {...form.getInputProps("code")} />
//             <MyTextInput label="Mô tả" {...form.getInputProps("description")} />
//             <MySelect label="Loại khuyễn mại" data={['percentage', 'fixed']} {...form.getInputProps("discount_type")} />
//             <MyTextInput label="Giá trị giảm" {...form.getInputProps("discount_value")} />
//             <MyTextInput label="Đơn tối thiểu" {...form.getInputProps("min_order_value")} />
//             <MyTextInput label="Giảm tối đa" {...form.getInputProps("max_discount")} />
//             <MyTextInput label="Tổng lượt dùng" {...form.getInputProps("usage_limit")} />
//             <MyTextInput label="Lượt dùng mỗi người" {...form.getInputProps("discount_limit")} />
//             <MyTextInput label="Ngày bắt đầu" {...form.getInputProps("start_date")} />
//             <MyTextInput label="Ngày kết thúc" {...form.getInputProps("end_date")} />
//             <MyCheckbox label="Trạng thái" {...form.getInputProps("status")} />
//         </MyButtonCreate>
//     )
// }