"use client"
import baseAxios from '@/api/baseAxios';
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MySelect from "@/components/Combobox/Select/MySelect";
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import { Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
export interface ICOESubjectFormula {
    id: number;
    code: string;
    name: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    coeTrainingProgramDetail?: number | null;
    formulaType: number;
    rate: number;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

enum formulaType {
    "Chuyên cần" = 1, // Chuyên cần
    "Quá trình" = 2, // Quá trình
    "Cuối kỳ" = 3  // Cuối kỳ
}

enum formulaCode {
    "CC" = 1, // Chuyên cần
    "QT" = 2, // Quá trình
    "CK" = 3  // Cuối kỳ
}

export default function F_mxmrddxhnz_Update_SubjectFormula({ data }: { data: ICOESubjectFormula }) {
    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<ICOESubjectFormula>({
        initialValues: data,
        validate: {
            rate: (value) => value == 0 ? 'Không được để trống' : null,
            formulaType: (value) => value ? null : 'Không được để trống',
        }
    })

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    function handleChangeFormula(value: string) {
        form.setFieldValue("formulaType", parseInt(value));
        form.setFieldValue("code", formulaCode[parseInt(value)]);
        form.setFieldValue("name", formulaType[parseInt(value)]);
    }

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData })
    }, [fileData])

    useEffect(() => {
        form.setValues(data);
    }, [data]);

    return (
        <Group>
            <MyActionIconUpdate form={form}
                onSubmit={async () => {
                    await baseAxios.post("/COESubjectFormula/Update", form.values);
                }} >
                <MySelect label="Hình thức đánh giá"
                    data={[
                        { value: "1", label: 'CC - Chuyên cần' },
                        { value: "2", label: 'QT - Quá trình' },
                        { value: "3", label: 'CK - Cuối kỳ' },
                    ]}
                    value={form.values.formulaType?.toString()}
                    onChange={(value) => handleChangeFormula(value?.toString()!)}
                />
                <MyNumberInput min={0} max={100} label="Tỷ trọng CA (%)" {...form.getInputProps("rate")} />
            </MyActionIconUpdate>
        </Group>
    )
}

