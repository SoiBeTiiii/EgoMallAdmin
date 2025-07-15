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
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import { useQuery } from "@tanstack/react-query";
import baseAxios from "@/api/baseAxios";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";



export interface I_p1x0zur5dt_Create {
    id: number;
    title: string;
    image_url: string;
    link_url: string;
    position: string;
    start_date: string;   // ISO format date string, e.g., "2025-06-18T00:00:00Z"
    end_date: string;     // ISO format date string
    status: boolean;      // hoặc number nếu trong DB bạn dùng 0/1 thay vì true/false
    created_at: string;   // ISO format date string
    update_at: string;    // ISO format date string
}



export default function F_p1x0zur5dt_Create() {
    const disc = useDisclosure(false)

    const form = useForm<I_p1x0zur5dt_Create>({
        mode: "uncontrolled",
        initialValues: {
            id: 0,
            title: "",
            image_url: "",
            link_url: "",
            position: "",
            start_date: "",
            end_date: "",
            status: false,
            created_at: "",
            update_at: ""
        },
        validate: {
            // name: (value) => (value.trim().length > 0 ? null : "không được để trống"),
            // slug: (value) => (value.trim().length > 0 ? null : "không được để trống"),
        }
    });

    

    return (
        <MyButtonCreate
            label="Thêm"
            disclosure={disc}
            form={form}
            onSubmit={ async (values) => {
               console.log("Thêm thành công: ", form.values);

                await baseAxios.post("/banners/create", form.values);
            }}
        >
            <MyTextInput label="Tiêu đề" {...form.getInputProps("title")} error={form.errors.name}/>
            <MyTextInput label="Image URL" {...form.getInputProps("image_url")} />
            <MyTextArea label="Link URL" {...form.getInputProps("link_url")} />
            <MyTextInput label="Vị trí" {...form.getInputProps("position")} />
            <MyDateInput label="Ngày bắt đầu" {...form.getInputProps("start_date")} />
            <MyDateInput label="Ngày kết thúc" {...form.getInputProps("end_date")} />
            <Checkbox label="Trạng thái" {...form.getInputProps("status")} />
        </MyButtonCreate>
    );
}


