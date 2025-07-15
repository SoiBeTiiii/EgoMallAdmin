
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { Checkbox, Select } from "@mantine/core"
import { useForm, UseFormReturnType } from "@mantine/form"
import { MyFileInput, MyTextArea } from "aq-fe-framework/components"

export interface I_am7u4vy7yv_Update {
    id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  is_active: boolean;
  is_featured: boolean;
  type: string;
  options: string;
  children: string; // danh sách sản phẩm con
  created_at: string; // có thể dùng Date nếu muốn parse ra Date object
  updated_at: string;
}
export default function F_am7u4vy7yv_Update(
    { values }: { values: I_am7u4vy7yv_Update }
) {
    const form = useForm<I_am7u4vy7yv_Update>({
        initialValues: values
    })
    

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
                
                            <MyTextInput disabled label="Tên" {...form.getInputProps("name")} />
                            <MyTextInput label="Slug" {...form.getInputProps("slug")} />
                            <Select label="Parent" data={["Kem chống nắng", "Kem dưỡng da", "son môi"]} {...form.getInputProps("parent_id")} />
                            <MyTextArea label="Mô tả" {...form.getInputProps("description")} />
                            <MyFileInput label="Hiển thị" {...form.getInputProps("thumbnail")} />
                            <Checkbox label="Hiển thị" {...form.getInputProps("is_active")} />
                            <Checkbox label="Danh mục nổi bật" {...form.getInputProps("is_featured")} />
                            <Select label="Loại" data={["Sản phẩm", "Blog", "Tin tự"]} {...form.getInputProps("type")} />
                
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

