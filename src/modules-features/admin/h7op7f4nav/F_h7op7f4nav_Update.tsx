'use client';
import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export interface I_h7op7f4nav_Update {
    id?: number;
    code?: string;
    name?: string;
    note?: string;
    coeUnitId?: number;
    coeUnit?: number | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    updatedBy?: string;
    updatedAt?: Date | undefined;
}

export interface IUnit {
    id?: number;
    code?: string;
    name?: string;
    unitType?: number;
    unitId?: number;
    note?: string;
    unit?: IUnit;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

export default function F_h7op7f4nav_Update({ values }: { values: I_h7op7f4nav_Update }) {

    const form = useForm<I_h7op7f4nav_Update>({
        initialValues: values
    });

    const { data: units, isLoading, isError } = useQuery<IUnit[]>({
        queryKey: ["F_h7op7f4nav_UnitQuery"],
        queryFn: async () => {
            const response = await baseAxios.get("/COEUnit/Getall");
            return response.data.data || [];
        },
    });

    const getUnitData = () => {
        if (isLoading) {
            return [{ value: "", label: "Đang tải..." }];
        }
        if (isError) {
            return [{ value: "", label: "Lỗi tải dữ liệu" }];
        }
        return units?.filter(unit => unit.unitType === 1).map(unit => ({
            value: unit.id?.toString() || "",
            label: unit.name?.trim() || "Không có tên"
        })) || [];
    };

    useEffect(() => {
        form.setValues(values);
    }, [values]);

    return (
        <MyActionIconUpdate
            form={form}
            onSubmit={async () => {
                await baseAxios.post("/COEProgram/Update", form.values);
            }}
        >
            <MyTextInput required disabled label='Mã chương trình' {...form.getInputProps("code")} />
            <MyTextInput required label='Tên chương trình' {...form.getInputProps("name")} />
            <MySelect
                data={getUnitData()}
                label="Khoa quản lý"
                value={form.values.coeUnitId?.toString() || ""}
                onChange={(value) => form.setFieldValue("coeUnitId", value ? parseInt(value) : undefined)}
            />
            <MyTextArea label='Ghi chú' {...form.getInputProps("note")} />
        </MyActionIconUpdate>);
}

