'use client';

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import { Text } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";



export interface I_hahgkfzpul_Create {
    courseCode?: string;
    courseName?: string;
    department?: string;
    in?: string;
    out?: string;
    level?: string;
    note?: string;

}



export default function F_hahgkfzpul_Create() {
    const disc = useDisclosure(false)

    const form = useForm<I_hahgkfzpul_Create>({
        initialValues: {
        },
    });

    return (
        <MyButtonModal
            label="Thêm"
            modalSize={"50%"}
            disclosure={disc}
            title="Chi tiết mục tiêu môn học"
            onSubmit={() => {
            }}
        >
            <Select w={"100%"} data={["NNA21"]} label="Mã môn học" defaultValue="NNA21" />
            <Select w={"100%"} label="Mã CO" data={["CO01"]}  defaultValue="CO01"/>
            <MyTextArea label="Mô tả"></MyTextArea>

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


