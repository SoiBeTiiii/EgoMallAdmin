'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IFmcqcwafkfj } from "./F_mcqcwafkfj_Read";
export interface I_matrixCLOandAssessment_Read {
    id?: number;
    thanhPhanDanhGia?: string // Thành phần đánh giá
    baiDanhGia?: string // Bài đánh giá
    thoiDiem?: string //Thời điểm
    CLO?: string //CLO
    PLO?: string //PLO
    tyLe?: number //Tỷ lệ
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
export default function F_matrixCLOandAssessment_Read({ data }: { data: IFmcqcwafkfj | undefined }) {


    const dis = useDisclosure();
    const query = useQuery<I_matrixCLOandAssessment_Read[]>({
        queryKey: [`MatrixCLOAssessment`],
        queryFn: async () => [
            {
                id: 1,
                thanhPhanDanhGia: "Quá trình",
                baiDanhGia: "Thảo luận",
                thoiDiem: "Sau chương 2",
                CLO: "CLO3",
                PLO: "PLO1",
                tyLe: 10,
                nguoiCapNhat: "Nguyễn Văn A",
                ngayCapNhat: new Date(),
            },
            {
                id: 2,
                thanhPhanDanhGia: "Quá trình",
                baiDanhGia: "Bài tập thực hành",
                thoiDiem: "Sau chương 7",
                CLO: "CLO1",
                PLO: "PLO1",
                tyLe: 10,
                nguoiCapNhat: "Trần Thị B",
                ngayCapNhat: new Date(),
            },
            {
                id: 3,
                thanhPhanDanhGia: "Giữa kỳ",
                baiDanhGia: "Tự luận",
                thoiDiem: "Sau chương 4",
                CLO: "CLO2",
                PLO: "PLO1",
                tyLe: 30,
                nguoiCapNhat: "Trần Thị B",
                ngayCapNhat: new Date(),
            },
            {
                id: 4,
                thanhPhanDanhGia: "Cuối kỳ",
                baiDanhGia: "Trắc nghiệm",
                thoiDiem: "Khi thi hết môn",
                CLO: "CLO1",
                PLO: "PLO1",
                tyLe: 50,
                nguoiCapNhat: "Trần Thị B",
                ngayCapNhat: new Date(),
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I_matrixCLOandAssessment_Read>[]>(() => [
        {
            header: "Thành phần đánh giá",
            accessorKey: "thanhPhanDanhGia",
        },
        {
            header: "Bài đánh giá",
            accessorKey: "baiDanhGia",
        },
        {
            header: "Thời điểm",
            accessorKey: "thoiDiem",
        },
        {
            header: "CLO",
            accessorKey: "CLO",
        },
        {
            header: "PLO",
            accessorKey: "PLO",
        },
        {
            header: "Tỷ lệ (%)",
            accessorKey: "tyLe",
            Cell: ({ cell }) => {
                const value = cell.getValue<number>();
                return `${value}%`;
            },
        },

        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            Cell: ({ cell }) => {
                const date = cell.getValue() as Date | undefined;
                return date ? date.toLocaleDateString("vi-VN") : "";
            },
        },
    ], []);

    if (!data) {
        return <div>Loading...</div>;
    }


    return (
        <MyButtonModal modalSize={"xl"} disclosure={dis} title="Ma trận đánh giá kết quả môn học " label="Xem">
            <MyFlexRow>
                <MyTextInput label="Khóa" defaultValue="Ngôn ngữ Anh 2024" readOnly />
                <MyTextInput label="Môn" defaultValue={data.subjectName} readOnly />
            </MyFlexRow>

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