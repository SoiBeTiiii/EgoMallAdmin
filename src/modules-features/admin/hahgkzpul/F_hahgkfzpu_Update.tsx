
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { Select } from "@mantine/core"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I_hahgkfzpul_Read } from "./F_hahgkfzpul_Read"

export default function F_hahgkfzpul_Update(
    { values }: { values: I_hahgkfzpul_Read }
) {
    const form = useForm<I_hahgkfzpul_Read>({
        initialValues: values
    })
    

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
                <MyTextInput disabled
                    label="Mã CO"
                    {...form.getInputProps("code")} // Field for 'code'
                />
                <MyTextInput
                    label="Mô tả"
                    {...form.getInputProps("description")} // Field for 'description'
                />
                <Select
                    label="Mã môn học"

                    data={["CS101", "MATH201", "ENG301", "KTo00001"]}

                    value={form.getInputProps("courseCode").value} 
                    
                    onChange={(value) => form.setFieldValue("courseCode",value!)}
                    />
                    
                <MyTextInput
                    label="Tên môn học"
                    {...form.getInputProps("courseName")} // Field for 'courseName'
                />

                {/* <MyTextInput
                    label="Khoa quản lý"
                    {...form.getInputProps("manageUnit")} // Field for 'manageUnit'
                /> */}
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

