"use client";
import baseAxios from '@/api/baseAxios';
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export interface IUpdateUnit {
    id?: number;
    code?: string;
    name?: string;
    unitType?: number | null;
    unitId?: number | null;
    note?: string;
    unit?: IUpdateUnit | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

const unitType: Record<number, string> = {
    1: "Khoa",
    2: "Bộ môn",
    3: "Phòng",
    4: "Trung tâm",
};

export default function F_14w3vwnnfy_Update({ data }: { data: IUpdateUnit }) {
    const form = useForm<IUpdateUnit>({
        initialValues: data,
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
        }
    });

    const { data: units, isLoading, isError } = useQuery<IUpdateUnit[]>({
        queryKey: ["F_14w3vwnnfy_Update"],
        queryFn: async () => {
            const response = await baseAxios.get("/COEUnit/Getall");
            return response.data.data || [];
        },
    });

    useEffect(() => {
        form.setValues(data);
    }, [data]);

    const getUnitTypeData = () => {
        return Object.entries(unitType).map(([key, label]) => ({
            value: key,
            label,
        }));
    };

    const getUnitSelectData = () => {
        if (isLoading) {
            return [{ value: "", label: "Đang tải..." }];
        }
        if (isError) {
            return [{ value: "", label: "Lỗi tải dữ liệu" }];
        }
        return units?.filter(unit => unit.id !== form.values.id).map((unit) => ({
            value: unit.id?.toString() || "",
            label: unit.name?.trim() || "Không có tên",
        })) || [];
    };

    const handleUnitSelectChange = (value: string | null) => {
        const selectedId = value ? parseInt(value, 10) : null;
        const selectedUnit = units?.find(unit => unit.id === selectedId) || null;

        form.setFieldValue("unitId", selectedId);
        form.setFieldValue("unit", selectedUnit);
    };

    return (
        <Group>
            <MyActionIconUpdate
                form={form}
                onSubmit={async () => {
                    await baseAxios.post("/COEUnit/Update", form.values);
                }}
            >
                <MyTextInput disabled label="Mã đơn vị" {...form.getInputProps("code")} />
                <MyTextInput label="Tên đơn vị" {...form.getInputProps("name")} />
                
                <MySelect
                    data={getUnitTypeData()}
                    label="Loại đơn vị"
                    value={form.values.unitType !== undefined && form.values.unitType !== null ? form.values.unitType.toString() : ""}
                    onChange={(value) => form.setFieldValue("unitType", value ? parseInt(value) : null)}
                />
                
                <MySelect
                    clearable
                    data={getUnitSelectData()}
                    label="Trực thuộc"
                    value={form.values.unitId !== null ? form.values.unitId?.toString() : ""}
                    onChange={handleUnitSelectChange}
                />
                
                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyActionIconUpdate>
        </Group>
    );
}
