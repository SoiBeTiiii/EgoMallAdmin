'use client';

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface I_iskqrugrpy_xem1 {
    id?: number;         
    courseCode?: string; 
    cloCode?: string;    
    description?: string; 
    plo1?: number;       
    plo2?: number;       
    plo3?: number;       
    plo4?: number;       
}

const exampleData: I_iskqrugrpy_xem1[] = [
    { courseCode: "TATM01", cloCode: "CLO1.1", description: "Giao tiếp hiệu quả trong môi trường thương mại", plo1: 4, plo2: undefined, plo3: undefined, plo4: undefined },
    {  courseCode: "TATM01", cloCode: "CLO1.2", description: "Soạn thảo tài liệu thương mại chuyên nghiệp", plo1: undefined, plo2: 5, plo3: undefined, plo4: undefined },
    {  courseCode: "TATM01", cloCode: "CLO1.3", description: "Đàm phán trong bối cảnh quốc tế", plo1: undefined, plo2: undefined, plo3: 4, plo4: undefined },
    {  courseCode: "TAVP01", cloCode: "CLO2.1", description: "Viết email và báo cáo chính xác", plo1: undefined, plo2: 3, plo3: undefined, plo4: 2 },
    {  courseCode: "TAVP01", cloCode: "CLO2.2", description: "Sử dụng ngôn ngữ lịch sự trong giao tiếp văn phòng", plo1: undefined, plo2: undefined, plo3: undefined, plo4: undefined },
];

export default function F_iskqrugrpy_xem1() {
    const disc = useDisclosure(false);

    const columns = useMemo<MRT_ColumnDef<I_iskqrugrpy_xem1>[]>(() => [
        { header: "Mã Môn học", accessorKey: "courseCode" },
        { header: "Mã CLO", accessorKey: "cloCode" },
        { header: "Mô tả", accessorKey: "description", size:300 },
        { header: "PLO1", accessorKey: "plo1", size:100 },
        { header: "PLO2", accessorKey: "plo2", size:100 },
        { header: "PLO3", accessorKey: "plo3", size:100 },
        { header: "PLO4", accessorKey: "plo4", size:100 },
    ], []);

    return (
        <MyButtonModal
            label="Xem"
            modalSize="100%"
            disclosure={disc}
            title="Ma trận quan hệ chuẩn đầu ra chương trình đào tạo và chuẩn đầu ra môn học"
        >
       
            <MyDataTable
            exportAble
                columns={columns}
                data={exampleData}
                enableRowSelection
            />
        </MyButtonModal>
    );
}
