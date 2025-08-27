import baseAxios from "@/api/baseAxios"
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate"
import ImageUploaderBox from "@/components/ImageUploaderBox/brands/ImageUploaderBox"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor"
import { Box, Checkbox } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { MyTextArea, MyTextInput } from "aq-fe-framework/components"
import { useState } from "react"

  export interface I_k8gyh3atv7_Create {
    id: number;
    name: string;
    description: string;
    estimated_time: string;
    is_active: boolean;
    is_default: boolean;
    created_at?: string; // dạng ISO hoặc datetime string
  }

export default function F_k8gyh3atv7_Create() {
    const disc = useDisclosure(false)
    const form = useForm<I_k8gyh3atv7_Create>({
        mode: "uncontrolled",
        initialValues: {
            id: 0,
            name: "",
            description: "",
            estimated_time: "",
            is_active: false,
            is_default: false,
        },
        validate: {
        }
    });
    

    return (
        <MyButtonCreate
            label="Thêm"
            modalSize={"50%"}
            disclosure={disc}
            form={form}
            onSubmit={ async (values) => {
                console.log("Thêm thành công: ", form.values);
                return await baseAxios.post("/shipping-methods", form.values);
            }}
        >
            <MyTextInput label="Phương thức giao hành" {...form.getInputProps("name")} />
            <MyTextArea label="Mô tả" {...form.getInputProps("description")} />
            <MyTextInput label="Thời gian giao hàng" {...form.getInputProps("estimated_time")} />
            <Checkbox label="Trạng thái" {...form.getInputProps("is_active")} />
            <Checkbox label="Giao hàng tiêu chuẩn" {...form.getInputProps("is_default")} />
        </MyButtonCreate>
    )
}