import baseAxios from "@/api/baseAxios"
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import ImageUploaderBox from "@/components/ImageUploaderBox/brands/ImageUploaderBox"
import { Box, Checkbox } from "@mantine/core"
import { useForm } from "@mantine/form"
import { MyTextArea, MyTextInput } from "aq-fe-framework/components"
import { useState } from "react"

export interface I_ibdt9veg94_Update {
  id?: number
  name: string
  slug: string
  logo: string
  description: string
  is_active: boolean
  is_featured: boolean
}

export default function F_ibdt9veg94_Update({ values }: { values: I_ibdt9veg94_Update }) {
  const form = useForm<I_ibdt9veg94_Update>({
    initialValues: values,
    validate: {

    }
  });

  const [imageFile, setImageFile] = useState<string | null>(null);
  return (
    <MyActionIconUpdate form={form} onSubmit={async (values) => {
      await baseAxios.put(`/brands/${form.values.id}`, form.values);
    }}>

      <MyTextInput label="Tên thương hiệu" {...form.getInputProps("name")} />
      <MyTextInput label="Slug" {...form.getInputProps("slug")} />
      <Box>
        <ImageUploaderBox
          img={{ url: form.values.logo ?? "" }}
          label="Ảnh đại diện"
          width={200}
          height={200}
          previewShape="square"
          uploadToken={`${process.env.NEXT_PUBLIC_UPLOAD_TOKEN}`}
          showRemoveButton={!!form.values.logo}
          onChange={(val) => {
            if (typeof val === "string") {
              form.setFieldValue("image", val);
            }
          }}
          onRemove={() => {
            form.setFieldValue("image", "");
          }}
        />
      </Box>

      <MyTextArea label="Mô tả" {...form.getInputProps("description")} />
      <Checkbox label="Trang thái" {...form.getInputProps("is_active")} />
      <Checkbox label="Nổi bật" {...form.getInputProps("is_featured")} />
    </MyActionIconUpdate>
  )
}