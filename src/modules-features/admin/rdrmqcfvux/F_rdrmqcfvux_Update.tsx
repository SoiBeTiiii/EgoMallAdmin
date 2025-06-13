"use client"
import baseAxios from '@/api/baseAxios';
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
interface ICreateUserViewModel {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    nameEg: string;
    numberPeriod: number;
    numberCredit: number;
    note: string;
    coeUnitId: number | null;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
interface IOption {
    value: string;
    label: string;
}
export default function F_rdrmqcfvux_Update({ lecturerAndExpertValues }: { lecturerAndExpertValues: ICreateUserViewModel }) {
    const queryClient = useQueryClient();

    const { data: coeUnits, isLoading } = useQuery<ICreateUserViewModel[]>({
        queryKey: ["COEUnit_Read"], // Đổi lại tên query key cho đúng với API gọi đến
        queryFn: async () => {
            const response = await baseAxios.get("/COEUnit/GetAll");
            return response.data.data || [];
        },
    });

    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<ICreateUserViewModel>({

        initialValues: lecturerAndExpertValues,

        validate: {
            code: (value) => (value.trim().length > 0 ? null : "không được để trống"),
            name: (value) => (value.trim().length > 0 ? null : "không được để trống"),
            coeUnitId: (value) => (value ? null : "Vui lòng chọn khoa"),
            numberPeriod: (value) => (value > 0 ? null : "Số tiết phải lớn hơn 0"),
            numberCredit: (value) => (value > 0 ? null : "Số tiết phải lớn hơn 0"),
        },
    });
    const COEUnitOptions: IOption[] = coeUnits
        ? coeUnits.map(unit => ({
            value: unit.id.toString(),
            label: unit.name
        }))
        : [];
    useEffect(() => {
        if (lecturerAndExpertValues) {
            form.setValues(lecturerAndExpertValues);
        }
    }, [lecturerAndExpertValues]);



    return (
        <MyActionIconUpdate
            form={form}
            onSubmit={async (values) => {
                const formattedValues = {
                    ...values,
                    numberPeriods: values.numberPeriod.toString(),
                    numberCredits: values.numberCredit.toString(),
                };

                console.log("Formatted Values:", formattedValues);
                return await baseAxios.post("/COESubject/Update", formattedValues);
            }}
        >
            <MyTextInput disabled label="Mã môn học" {...form.getInputProps("code")} />
            <MyTextInput label="Tên môn học" {...form.getInputProps("name")} />
            <MyTextInput label="Tên môn học Eg" {...form.getInputProps("nameEg")} />
            <MyNumberInput min={0} label="Số tiết" {...form.getInputProps("numberPeriod")} />
            <MyNumberInput min={0} label="Số tín chỉ" {...form.getInputProps("numberCredit")} />

            <MySelect
                label="Khoa"
                data={COEUnitOptions}
                {...form.getInputProps("coeUnitId")}
                value={lecturerAndExpertValues?.coeUnitId?.toString() || ""}
            />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </MyActionIconUpdate>
    )
}

