'use client'
import baseAxios from '@/api/baseAxios'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MySelect from '@/components/Combobox/Select/MySelect'
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useQuery } from '@tanstack/react-query'

export interface I_h7op7f4nav_Create {
    id?: number;
    code?: string;
    name?: string;
    note?: string;
    coeUnitId?: number | null;
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


export default function F_h7op7f4nav_Create() {

    const { data: units, isLoading, isError } = useQuery<IUnit[]>({
        queryKey: ["F_h7op7f4nav_UnitQuery"],
        queryFn: async () => {
            const response = await baseAxios.get("/COEUnit/Getall");
            return response.data.data || [];
        },
    });

    const form = useForm<I_h7op7f4nav_Create>({
        initialValues: {
            code: "",
            name: "",
            note: "",
            coeUnitId: null,
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            coeUnitId: (value) => value ? null : 'Không được để trống',
        }
    })

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


    return (
        <MyButtonCreate form={form} onSubmit={async () => {
            const response = await baseAxios.post("/COEProgram/Create", form.values)
            if (response.data.isSuccess == 0) {
                notifications.show({
                    color: 'red',
                    message: response.data.data.Code,
                })
            }
        }} >
            <MyTextInput label='Mã chương trình' {...form.getInputProps("code")} />
            <MyTextInput label='Tên chương trình' {...form.getInputProps("name")} />
            <MySelect
                data={getUnitData()}
                label="Khoa quản lý"
                value={form.values.coeUnitId?.toString() || ""}
                onChange={(value) => form.setFieldValue("coeUnitId", value ? parseInt(value) : undefined)}
                error={form.errors.coeUnitId} 
            />
            <MyTextArea label='Ghi chú' {...form.getInputProps("note")} />


        </MyButtonCreate>
    )
}


