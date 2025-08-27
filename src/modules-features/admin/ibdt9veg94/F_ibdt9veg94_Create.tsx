import baseAxios from "@/api/baseAxios"
import ImageUploaderBox from "@/components/ImageUploaderBox/brands/ImageUploaderBox"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor"
import { Box, Checkbox } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { MyButtonCreate, MyTextArea, MyTextInput } from "aq-fe-framework/components"
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
        }
    });
    
      const [imageFile, setImageFile] = useState<string | null>(null);
    

    return (
        <MyButtonCreate
            label="Thêm"
            modalSize={"50%"}
            disclosure={disc}
            form={form}
            onSubmit={ async (values) => {
                console.log("Thêm thành công: ", form.values);
                return await baseAxios.post("/brands", form.values);
            }}
        >
            <MyTextInput label="Tên thương hiệu" {...form.getInputProps("name")} />
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
            <Checkbox label="Trang thái" {...form.getInputProps("is_active")} />
            <Checkbox label="Nổi bật" {...form.getInputProps("is_featured")} />
        </MyButtonCreate>
    )
}