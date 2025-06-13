"use client";
import baseAxios from '@/api/baseAxios';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export interface ICreateUnit {
    id?: number;
    code?: string;
    name?: string;
    unitType?: number | null;
    unitId?: number | null;
    note?: string;
    unit?: ICreateUnit | null;
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

export default function F_14w3vwnnfy_Create() {
    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<ICreateUnit>({
        initialValues: {
            id: 0,
            code: "",
            name: "",
            concurrencyStamp: "",
            isEnabled: true,
            unitType: 1,
            unitId: null,
            note: "",
            unit: null,
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            unitType: (value) => (value !== null && value !== undefined) ? null : 'Không được để trống',
        }
    });
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const { data: units, isLoading, isError } = useQuery<ICreateUnit[]>({
        queryKey: ["F_14w3vwnnfy_Create"],
        queryFn: async () => {
            const response = await baseAxios.get("/COEUnit/Getall");
            return response.data.data || [];
        },
    });

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData });
    }, [fileData]);

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
        return units?.map((unit) => ({
            value: unit.id?.toString() || "",
            label: unit.name?.trim() || "Không có tên",
        })) || [];
    };

    const handleUnitSelectChange = (value: string | null) => {
        form.setFieldValue("unitId", value ? parseInt(value) : null);
    };

    return (
        <Group>
            <MyButtonCreate
                objectName='đơn vị'
                form={form}
                onSubmit={async () => {
                    const response = await baseAxios.post("/COEUnit/Create", form.values);
                    if (response.data.isSuccess == 0) {
                        notifications.show({
                            color: 'red',
                            message: response.data.data.Code,
                        })
                    }
                }}
            >
                <MyTextInput label="Mã đơn vị" {...form.getInputProps("code")} />
                <MyTextInput label="Tên đơn vị" {...form.getInputProps("name")} />

                <MySelect
                    data={getUnitTypeData()}
                    label="Loại đơn vị"
                    value={form.values.unitType !== null ? form.values.unitType?.toString() : ""}
                    onChange={handleUnitSelectChange}
                    error={form.errors.unitType}
                />

                <MySelect
                    clearable
                    data={getUnitSelectData()}
                    label="Trực thuộc"
                    value={form.values.unitId !== null ? form.values.unitId?.toString() : ""}
                    onChange={handleUnitSelectChange}
                    error={form.errors.unitId}
                />

                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyButtonCreate>
        </Group>
    );
}
