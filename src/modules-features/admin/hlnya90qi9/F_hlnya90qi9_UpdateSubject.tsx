'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import useQ_COEUnit_GetAll from "@/hooks/query-hooks/COEUnit/useQ_COEUnit_GetAll";
import { MultiSelect, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function F_hlnya90qi9_UpdateSubject({
    values,
    subjectGroupData,
    availableSemester,

}: {
    values: ICoeGradeSubject,
    subjectGroupData: ICoeSubjectGroup[],
    availableSemester: ICoeSemester[],

}) {
    const UnitQuery = useQ_COEUnit_GetAll({ options: { enabled: true } });
    const form = useForm<ICoeGradeSubject>({
        initialValues: { ...values },
        validate: {
            order: (value) => value && (value <= 0) && 'Thứ tự phải lớn hoặc bằng 0',
        }
    });
    useEffect(() => {
        form.setValues(values)
    }, [values]);
    const unitIdValue = form.getInputProps("coeSubject.coeUnitId").value;
    const valueArray = Array.isArray(unitIdValue) ? unitIdValue : [unitIdValue?.toString()];

    return (
        <MyActionIconUpdate
            form={form}
            onSubmit={
                async (values) => {
                    await baseAxios.post(`/COEGradeSubject/update`, { ...values })
                }}>
            <MyFlexColumn>
                <Select
                    w={"100%"}
                    data={[
                        {
                            value: form.getInputProps("coeSubject.name").value || "",
                            label: form.getInputProps("coeSubject.name").value || ""
                        }
                    ]
                    }
                    label="Môn học"
                    value={form.getInputProps("coeSubject.name").value}
                    onChange={(value) => {
                        form.setFieldValue("coeSubject.name", value || "");
                    }}
                    disabled
                />
                <MyTextInput
                    w={"100%"}
                    label="Tên môn học Eg"
                    {...form.getInputProps("coeSubject.nameEg")}
                    disabled
                />
                <MyNumberInput w={"100%"} label="Thứ tự" {...form.getInputProps("order")} />
                <Select
                    w={"100%"}
                    label="Năm học - Học kỳ"
                    data={
                        availableSemester
                        && availableSemester.map((s) => ({
                            value: s.id?.toString() || "",
                            label: s.name || ""
                        })) || []}
                    value={form.getInputProps("coeSemester.id").value.toString()}

                    onChange={(value) => form.setFieldValue("coeSemesterId", Number(value))}
                />
                <Select
                    w={"100%"}
                    label="Nhóm môn học"
                    data={subjectGroupData.map((item) => {
                        return {
                            value: item.id?.toString() || "",
                            label: item.name || ""
                        }
                    })}
                    value={form.getInputProps("coeSubjectGroupId")?.value?.toString() || ""}
                    onChange={(value) => {
                        form.setFieldValue("coeSubjectGroupId", Number(value));
                    }}

                />
                <MyTextInput w={"100%"} label="Số tiết" {...form.getInputProps("coeSubject.numberPeriod")} disabled />
                <MyTextInput w={"100%"} label="Số tín chỉ" {...form.getInputProps("coeSubject.numberCredit")} disabled />
                <MultiSelect
                    w={"100%"}
                    label="Khoa quản lý"
                    data={UnitQuery.data?.map((item) => {
                        return {
                            value: item.id?.toString() || "",
                            label: item.name || ""
                        }
                    })}
                    value={valueArray || []}
                    disabled />
            </MyFlexColumn>
        </MyActionIconUpdate>
    );
}
