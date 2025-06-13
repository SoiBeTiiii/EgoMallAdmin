
'use client'
import baseAxios from "@/api/baseAxios"
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { Checkbox, Grid, Group } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm, UseFormReturnType } from "@mantine/form"
import { IconCalendar } from "@tabler/icons-react"
import { useEffect } from "react"
import { F_omhcfkliwa_Read } from "./F_omhcfkliwa_Read"


export default function F_omhcfkliwa_Update(
    { values }: { values: F_omhcfkliwa_Read }
) {
    const form = useForm<F_omhcfkliwa_Read>({
        initialValues: {
            ...values,
            startDate: values.startDate ? new Date(values.startDate + "Z") : undefined,
            endDate: values.endDate ? new Date(values.endDate + "Z") : undefined,
            startDateHC: values.startDateHC ? new Date(values.startDateHC + "Z") : undefined,
            endDateHC: values.endDateHC ? new Date(values.endDateHC + "Z") : undefined,
        },

        validate: {
            name: (value) => value?.trim().length === 0 ? "Tên năm học không được để trống" : undefined,
            // code: (value) => value ? value.length > 4 ? "Mã năm học tối đa 4 ký tự" : undefined : undefine
            endDate: (value, values) => {
                const year = parseInt(values?.code ?? "0", 10); // Lấy năm từ mã code
                if (isNaN(year)) return "Mã năm học không hợp lệ"; // Nếu không phải số, báo lỗi
                if (value && values.startDate && value < values.startDate) {
                    return "Ngày kết thúc NH phải lớn hơn ngày bắt đầu NH"
                }
                return null;
            },

            startDateHC: (value, values) => {
                const year = parseInt(values?.code ?? "0", 10);
                if (isNaN(year)) return "Mã năm học không hợp lệ";
                const expectedStartDate = new Date(year, 0, 1);
                return value?.toDateString() !== expectedStartDate.toDateString()
                    ? `Ngày bắt đầu HC phải là 01/01/${year}`
                    : null;
            },

            endDateHC: (value, values) => {
                const year = parseInt(values?.code ?? "0", 10);
                if (isNaN(year)) return "Mã năm học không hợp lệ";

                const expectedEndDate = new Date(year, 11, 31);
                if (value?.toDateString() !== expectedEndDate.toDateString()) {
                    return `Ngày kết thúc HC phải là 31/12/${year}`
                }
                if (value !== undefined && values?.startDateHC !== undefined && value < values.startDateHC) {
                    return "Ngày kết thúc HC phải lớn hơn ngày bắt đầu HC"
                }
                return null;
            },
        }
    })

    useEffect(() => {
        // Only update the form values if `concurrencyStamp` has changed
        if (form.values.concurrencyStamp !== values.concurrencyStamp) {
            form.setValues((prevValues) => ({
                ...prevValues,
                concurrencyStamp: values.concurrencyStamp,
            }));
        }
    }, [values.concurrencyStamp, form]);
    
    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            modalSize={"60%"}
            onSubmit={async (values) => await baseAxios.post("/COESchoolYear/Update", values)}
        >
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }} py={0}>
                    <Group pb={10}>
                        <MyTextInput flex={1} label="Mã Năm học" {...form.getInputProps("code")} disabled
                        />
                    </Group>
                    <Group pb={10}>
                        <DateInput flex={1} label="Ngày bắt đầu NH" rightSection={<IconCalendar></IconCalendar>} {...form.getInputProps("startDate")}

                        />
                    </Group>
                    <Group pb={10}>
                        <DateInput flex={1} label="Ngày bắt đầu HC" rightSection={<IconCalendar></IconCalendar>} {...form.getInputProps("startDateHC")}
                        />
                    </Group>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }} py={0}>
                    <Group pb={10}>
                        <MyTextInput flex={1} label="Tên năm học" {...form.getInputProps("name")}
                        />
                    </Group>
                    <Group pb={10}>
                        <DateInput flex={1} label="Ngày kết thúc NH" rightSection={<IconCalendar></IconCalendar>} {...form.getInputProps("endDate")}
                        />
                    </Group>
                    <Group pb={10}>
                        <DateInput
                            flex={1}
                            label="Ngày kết thúc HC"
                            rightSection={<IconCalendar></IconCalendar>} {...form.getInputProps("endDateHC")}
                        />
                    </Group>
                </Grid.Col>

                <Grid.Col span={12} py={0}>
                    <Group pb={10}>
                        <MyTextArea
                            label="Ghi chú"
                            flex={1}
                            {...form.getInputProps("note")}
                        />
                    </Group>
                </Grid.Col>
                <Grid.Col span={12} py={0}>
                    <Group pb={10}>
                        <Checkbox label="Hiện hành"
                            checked={form.values.isCurrent}
                            onChange={(event) => form.setFieldValue("isCurrent", event.currentTarget.checked)} ></Checkbox>
                    </Group>
                </Grid.Col>
            </Grid>
        </MyActionIconUpdate>
    )
}

