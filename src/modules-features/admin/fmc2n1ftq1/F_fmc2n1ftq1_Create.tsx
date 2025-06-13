"use client"
import baseAxios from '@/api/baseAxios';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Checkbox, Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

interface ICreateRubric {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    nameEg: string;
    point: number;
    isStorage: boolean;
    note: string;
    order?: number | null;
    isFailed?: boolean | null;
}

export default function F_fmc2n1ftq1_Create() {
    const form = useForm<ICreateRubric>({
        mode: "uncontrolled",
        initialValues: {
            id: 0,
            name: "",
            nameEg: "",
            point: 0,
            isStorage: false,
            concurrencyStamp: "",
            isEnabled: false,
            code: "",
            note: "",
            order: 0,
            isFailed: false,
        },
        validate: {
            // id:(value)=>value ? null : 'Không được để trống', 
            name: (value) => value ? null : 'Không được để trống',
            order: (value) => value ? null : 'Không được để trống',
            point: (value) => value ? null : 'Không được để trống',
        }
    });

    return (
            <MyButtonCreate
                objectName="Chi tiết thang đo Rubric"
                form={form}
                onSubmit={ (values) => {
                    return baseAxios.post("/COERubricsMethod/Create", values);
                }}
            >
                <MyTextInput label="Thứ tự" {...form.getInputProps("order")} />
                <MyTextInput label="Mức đánh giá" {...form.getInputProps("name")} />
                <MyTextInput label="Mức đánh giá (Eg)" {...form.getInputProps("nameEg")} />
                <MyNumberInput min={0} step={0.1} label="Điểm >= " {...form.getInputProps("point")} />
                <Checkbox label="Không đạt" {...form.getInputProps("isFailed", { type: 'checkbox' })} />
                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyButtonCreate>
    );
}
