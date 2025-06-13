'use client';

import { Button, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import F_iskqrugrpy_xem1 from "./F_iskqrugrpy_xem1";
import F_iskqrugrpy_xem2 from "./F_iskqrugrpy_xem2";

export interface I_iskqrugrpy_Create {
    department?: string;     // Khoa
    course?: string;         // Khóa
    plo?: string;            // PLO
    courseCode?: string;     // Mã môn học
    courseName?: string;     // Tên môn học
    plo1?: string;
}

const exampleData: I_iskqrugrpy_Create[] = [
    {
        department: "Ngoại ngữ",     // Khoa
        course: "TATM24",            // Khóa
        plo: "PLO1",                 // PLO
        courseCode: "TATM",          // Mã môn học
        courseName: "Tiếng Anh thương mại", // Tên môn học
        plo1: "PLO1",                // PLO
    },
    {
        department: "Ngoại ngữ",
        course: "TATM24",
        plo: "PLO2",
        courseCode: "VHA",
        courseName: "Văn hóa Anh",
        plo1: "PLO2",
    },
    {
        department: "Ngoại ngữ",
        course: "TATM24",
        plo: "PLO3",
        courseCode: "VHM",
        courseName: "Văn học Mỹ",
        plo1: "PLO1 PLO2",
    },
    {
        department: "Ngoại ngữ",
        course: "TATM24",
        plo: "PLO4",
        courseCode: "LSTGCD",
        courseName: "Lịch sử thế giới cận đại",
        plo1: "",
    },
];


export default function F_iskqrugrpy_Create() {
    const disc = useDisclosure(false);

    const form = useForm<I_iskqrugrpy_Create>({
        initialValues: {},
    });

    const columns = useMemo<MRT_ColumnDef<I_iskqrugrpy_Create>[]>(() => [
        { header: "Khoa", accessorKey: "department" },
        { header: "Khóa", accessorKey: "course" },
        { header: "PLO", accessorKey: "plo" },
        { header: "Mã môn học", accessorKey: "courseCode" },
        { header: "Tên môn học", accessorKey: "courseName" },

        { 
            header: "Đề cương", 
            Cell: () => <MyButtonViewPDF /> // Rendering a button for this column
        },
        { header: "PLO", accessorKey: "plo1" },
        { header: "Ma trận PLO và CLO", Cell: () => <F_iskqrugrpy_xem1/> , size: 200},
        { header: "Ma trận CLO và assessment", Cell: () => <F_iskqrugrpy_xem2 /> , size: 200},
    ], []);

    return (
        <MyButtonModal
            label="Thêm"
            modalSize="100%"
            disclosure={disc}
            title="Cơ sở dữ liệu chương trình đào tạo"
            onSubmit={() => {
                notifications.show({
                    message: "Lưu thành công",
                });
            }}
        >
            <MyFlexRow>
            <Select
                w="60%"
                label="Chọn khóa"
                data={["Ngôn ngữ anh 2024"]}
                defaultValue="Ngôn ngữ anh 2024"
            />
               <Button
               style={{marginTop: "22px"}}
                leftSection={<IconPlus />}
                onClick={() => {
                    disc[1].close();
                    notifications.show({
                        message: "Lưu thành công",
                    });
                }}
            >
                Chọn
            </Button>
            </MyFlexRow>
            <MyDataTable
                columns={columns} // Pass columns directly
                data={exampleData} // Use the correct data format
                exportAble={false}
            />
         
        </MyButtonModal>
    );
}
