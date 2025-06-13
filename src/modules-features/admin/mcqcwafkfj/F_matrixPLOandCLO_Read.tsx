import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
export interface I_matrixPLOandCLO_Read {
    id?: number;
    courseCode?: string;
    clo?: string;
    description?: string;
    plo1?: number;
    plo2?: number;
    plo3?: number;
    plo4?: number;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
export default function F_matrixPLOandCLO_Read() {
    const dis = useDisclosure();
    const query = useQuery<I_matrixPLOandCLO_Read[]>({
        queryKey: [`I_matrixPLOandCLO_Read`],
        queryFn: async () => [
            {
                id: 1,
                courseCode: "TATM01",
                clo: "CLO1.1",
                description: "Giao tiếp hiệu quả trong môi trường thương mại",
                plo1: 4,
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 2,
                courseCode: "TATM01",
                clo: "CLO1.2",
                description: "Soạn thảo tài liệu thương mại chuyên nghiệp",
                plo2: 5,
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 3,
                courseCode: "TATM01",
                clo: "CLO1.3",
                description: "Đàm phán trong bối cảnh quốc tế",
                plo3: 4,
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 4,
                courseCode: "TAVP01",
                clo: "CLO2.1",
                description: "Viết email và báo cáo chính xác",
                plo2: 3,
                plo4: 2,
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 5,
                courseCode: "TAVP01",
                clo: "CLO2.2",
                description: "Sử dụng ngôn ngữ lịch sự trong giao tiếp văn phòng",
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
        ]
    });

    const columns = useMemo<MRT_ColumnDef<I_matrixPLOandCLO_Read>[]>(() => [
        { header: "Mã môn học", accessorKey: "courseCode" },
        { header: "Mã CLO", accessorKey: "clo" },
        { header: "Mô tả", accessorKey: "description" },
        {
            header: "PLO1",
            accessorKey: "plo1",

        },
        {
            header: "PLO2",
            accessorKey: "plo2",

        },
        {
            header: "PLO3",
            accessorKey: "plo3",

        },
        {
            header: "PLO4",
            accessorKey: "plo4",

        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },

        }
    ], []);

    return (
        <MyButtonModal modalSize={"xl"} disclosure={dis} title="Ma trận quan hệ chuẩn đầu ra chương trình đào tạo và chuẩn đầu ra môn học" label="Xem">
            <MyTextInput label="Khóa" defaultValue="Ngôn ngữ Anh 2024" readOnly />
            <MyDataTable
                exportAble
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={columns}
                data={query.data!}
            />
        </MyButtonModal>
    )
}