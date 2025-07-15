'use client';
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { Button, Checkbox, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { MyTextInput } from "aq-fe-framework/components";



export interface I_569re3pt0f_Create {
  id: number;
  name: string;
  slug: string;
  parent_id?: number | null;
  description?: string;
  thumbnail?: string;
  is_active: boolean;
  is_featured: boolean;
  type?: string;
  created_at: string; // ISO date string
  update_at: string;  // ISO date string
}



export default function F_569re3pt0f_Create() {
    const disc = useDisclosure(false)

    const form = useForm<I_569re3pt0f_Create>({
        mode: "uncontrolled",
        initialValues: {
            id: 0,
            name: "",
            slug: "",
            is_active: false,
            is_featured: false,
            created_at: "",
            update_at: ""
        },
        validate: {
            name: (value) => (value.trim().length > 0 ? null : "không được để trống"),
            slug: (value) => (value.trim().length > 0 ? null : "không được để trống"),
        }
    });

    return (
        <MyButtonModal
            label="Thêm"
            modalSize={"50%"}
            disclosure={disc}
            title="Thêm danh mục"
            form="form"
            onSubmit={() => {
            }}
        >
            <MyTextInput label="Tên" {...form.getInputProps("name")} error={form.errors.name}/>
            <MyTextInput label="Slug" {...form.getInputProps("slug")} />
            <Select label="Parent" data={["Kem chống nắng", "Kem dưỡng da", "son môi"]} {...form.getInputProps("parent_id")} />
            <MyTextArea label="Mô tả" {...form.getInputProps("description")} />
            <MyFileInput label="Hiển thị" {...form.getInputProps("thumbnail")} />
            <Checkbox label="Hiển thị" {...form.getInputProps("is_active")} />
            <Checkbox label="Danh mục nổi bật" {...form.getInputProps("is_featured")} />
            <Select label="Loại" data={["Sản phẩm", "Blog", "Tin tự"]} {...form.getInputProps("type")} />

            <Button
                leftSection={<IconPlus />}
                onClick={() => {
                    disc[1].close();
                    notifications.show({
                        message: "Lưu thành công",
                    });
                }}>
                Lưu
            </Button>
        </MyButtonModal>
    );
}


