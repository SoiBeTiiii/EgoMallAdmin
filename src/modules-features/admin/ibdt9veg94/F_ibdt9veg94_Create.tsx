import baseAxios from "@/api/baseAxios"
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate"
import MyCheckbox from "@/components/Checkbox/MyCheckbox"
import ImageUploaderBox from "@/components/ImageUploaderBox/brands/ImageUploaderBox"
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { Box } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { useState } from "react"

export interface I_ibdt9veg94_Create {
  id?: number
  name: string
  slug: string
  logo: string
  description: string
  is_active: boolean
  is_featured: boolean
}

export default function F_ibdt9veg94_Create() {
  const disc = useDisclosure(false)
  const form = useForm<I_ibdt9veg94_Create>({
    mode: "uncontrolled",
    initialValues: {
      id: 0,
      name: "",
      slug: "",
      logo: "",
      description: "",
      is_active: false,
      is_featured: false,
    },
    validate: {
      name: (value) =>
        value.trim().length > 0
          ? null
          : "Tên thương hiệu không được để trống",

      slug: (value) =>
        value && !/^[a-z0-9-]+$/.test(value)
          ? "Slug chỉ được chứa chữ thường, số và dấu gạch ngang"
          : null,

      description: (value) =>
        value && value.length > 1000
          ? "Mô tả quá dài (tối đa 1000 ký tự)"
          : null,

      is_active: (v) =>
        typeof v !== "boolean" ? "Trạng thái không hợp lệ" : null,

      is_featured: (v) =>
        typeof v !== "boolean" ? "Trạng thái không hợp lệ" : null,
    },
  });

  const [imageFile, setImageFile] = useState<string | null>(null);


  return (
    <MyButtonCreate

      label="Thêm"
      modalSize={"50%"}
      disclosure={disc}
      form={form}
      onSubmit={async (values) => {
        console.log("Thêm thành công: ", form.values);
        return await baseAxios.post("/brands", form.values);
      }}
    >
      <MyTextInput withAsterisk label="Tên thương hiệu" {...form.getInputProps("name")} />
      <MyTextInput label="Slug" {...form.getInputProps("slug")} />
      <Box>
        <ImageUploaderBox
          img={{ url: imageFile ?? "" }}
          label="Ảnh đại diện"
          width={200}
          height={200}
          previewShape="square"
          uploadToken={`${process.env.NEXT_PUBLIC_UPLOAD_TOKEN}`}
          showRemoveButton={!!imageFile}
          onChange={(val) => {
            if (typeof val === "string") {
              setImageFile(val);
              form.setFieldValue("logo", val);
            }
          }}
          onRemove={() => {
            setImageFile(null);
            form.setFieldValue("logo", "");
          }}
        />
      </Box>
      <MyTextArea label="Mô tả" {...form.getInputProps("description")} />
      <MyCheckbox label="Trang thái" {...form.getInputProps("is_active")} />
      <MyCheckbox label="Nổi bật" {...form.getInputProps("is_featured")} />
    </MyButtonCreate>

  )
}