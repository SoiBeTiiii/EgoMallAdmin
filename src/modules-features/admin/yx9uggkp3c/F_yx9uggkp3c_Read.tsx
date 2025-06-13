'use client';
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_yx9uggkp3c_Create from "./F_yx9uggkp3c_Create";
import F_yx9uggkp3c_Delete from "./F_yx9uggkp3c_Delete";
import F_yx9uggkp3c_Update from "./F_yx9uggkp3c_Update";

// Interface cho dữ liệu
export interface I_yx9uggkp3c {
   id?: number; // STT
   year?: number; // Năm học
   semester?: number; // Học kỳ
   codeStudent?: string; // Mã sinh viên
   name?: string; // Họ tên sinh viên
   class?:string //Lớp
   program?:string //Chương trình
   course?:string //Khóa
   codeSubject?: string; // Mã môn học
   subjectName?: string; // Tên môn học
   group?: string; // Nhóm học
   quantityOfCredit?: number; // Số tín chỉ
   assessmentFormId?:number // Hình thức đánh giá Id
   assessmentForm?: string; // Hình thức đánh giá
   reviewContent?: string; // Nội dung đánh giá
   evaluationMethodId?:number; //Pp đánh giá Id
   evaluationMethod?: string; // Phương pháp đánh giá
   nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function Yx9uggkp3cComponent() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_yx9uggkp3c[]>({
        queryKey: ["studentSubjectData"],
        queryFn: async () => [
            {
                id: 1,
                year: 2024,
                semester: 1,
                codeStudent: "SV1335897",
                name: "Tô Ngọc Lâm",
                class:"KT2401",
                program:"CKCT-Cơ khí chế tạo",
                course:"CKCT24",
                codeSubject: "TATM01",
                subjectName: "Tiếng Anh thương mại",
                group: "02",
                quantityOfCredit: 2,
                assessmentFormId:1,
                assessmentForm: "Giữa kỳ",
                reviewContent: "Bài tập chương 2",
                evaluationMethodId:2,
                evaluationMethod: "Tự luận",
                nguoiCapNhat: "Nguyễn Văn A",
                ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },
            {
                id: 2,
                year: 2024,
                semester: 1,
                codeStudent: "SV1335894",
                name: "Tô Ngọc Lâm",
                class:"KT2401",
                program:"CKCT-Cơ khí chế tạo",
                course:"CKCT24",
                codeSubject: "TATM01",
                subjectName: "Tiếng Anh thương mại",
                group: "02",
                quantityOfCredit: 2,
                assessmentFormId:2,
                assessmentForm: "Giữa kỳ",
                reviewContent: "Bài tập chương 2",
                evaluationMethodId:2,
                evaluationMethod: "Tự luận",
                nguoiCapNhat: "Nguyễn Văn A",
                ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },
            {
                id: 3,
                year: 2024,
                semester: 1,
                codeStudent: "SV1335896",
                name: "Tô Ngọc Mão",
                class:"KT2401",
                program:"CKCT-Cơ khí chế tạo",
                course:"CKCT24",
                codeSubject: "TATM01",
                subjectName: "Tiếng Anh thương mại",
                group: "02",
                quantityOfCredit: 2,
                assessmentFormId:1,
                assessmentForm: "Giữa kỳ",
                reviewContent: "Bài tập chương 2",
                evaluationMethodId:2,
                evaluationMethod: "Tự luận",
                nguoiCapNhat: "Nguyễn Văn A",
                ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },
            {
                id: 4,
                year: 2024,
                semester: 1,
                codeStudent: "SV1335898",
                name: "Tô Ngọc Quý",
                class:"KT2401",
                program:"CKCT-Cơ khí chế tạo",
                course:"CKCT24",
                codeSubject: "TATM01",
                subjectName: "Tiếng Anh thương mại",
                group: "02",
                quantityOfCredit: 2,
                assessmentFormId:1,
                assessmentForm: "Giữa kỳ",
                reviewContent: "Bài tập chương 2",
                evaluationMethodId:2,
                evaluationMethod: "Tự luận",
                nguoiCapNhat: "Nguyễn Văn A",
                ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },
            {
                id: 5,
                year: 2024,
                semester: 1,
                codeStudent: "SV1335893",
                name: "Tô Ngọc Bảo",
                class:"KT2401",
                program:"CKCT-Cơ khí chế tạo",
                course:"CKCT24",
                codeSubject: "TATM01",
                subjectName: "Tiếng Anh thương mại",
                group: "02",
                quantityOfCredit: 2,
                assessmentFormId:1,
                assessmentForm: "Giữa kỳ",
                reviewContent: "Bài tập chương 2",
                evaluationMethodId:2,
                evaluationMethod: "Tự luận",
                nguoiCapNhat: "Nguyễn Văn A",
                ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },
        ],
    });

    // Cột dữ liệu cho bảng
    const columns = useMemo<MRT_ColumnDef<I_yx9uggkp3c>[]>(() => [
        {
            header: "Năm học",
            accessorKey: "year",
        },
        {
            header: "Học kỳ",
            accessorKey: "semester",
        },
        {
            header: "Mã sinh viên",
            accessorKey: "codeStudent",
        },
        {
            header: "Họ tên sinh viên",
            accessorKey: "name",
        },
        {
            header: "Mã môn học",
            accessorKey: "codeSubject",
        },
        {
            header: "Tên môn học",
            accessorKey: "subjectName",
        },
        {
            header: "Nhóm học",
            accessorKey: "group",
        },
        {
            header: "Số tín chỉ",
            accessorKey: "quantityOfCredit",
        },
        {
            header: "Hình thức đánh giá",
            accessorKey: "assessmentForm",
        },
        {
            header: "Nội dung đánh giá",
            accessorKey: "reviewContent",
        },
        {
            header: "Phương pháp đánh giá",
            accessorKey: "evaluationMethod",
        },
        {
            header:"Điểm CLO",
            accessorFn(row){
                return (
                    <>
                    <F_yx9uggkp3c_Update data={row}/>
                    <F_yx9uggkp3c_Delete id={row.id!}/>
                    </>
                )
            }
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat"
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },
        }
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "year", header: "Năm học" },
            { fieldName: "semester", header: "Học kỳ" },
            { fieldName: "codeStudent", header: "Mã sinh viên" },
            { fieldName: "name", header: "Họ tên sinh viên" },
            { fieldName: "codeSubject", header: "Mã môn học" },
            { fieldName: "quantityOfQuestion", header: "Số câu hỏi" },
            { fieldName: "subjectName", header: "Tên môn học" },
            { fieldName: "group", header: "Nhóm học" },
            { fieldName: "quantityOfCredit", header: "Số tín chỉ" },
            { fieldName: "assessmentForm", header: "Hình thức đánh giá" },
            { fieldName: "reviewContent", header: "Nội dung đánh giá" },
            { fieldName: "evaluationMethod", header: "Phương pháp đánh giá" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },

        ],
    };

    // Kiểm tra trạng thái của query
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            enableRowSelection
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <F_yx9uggkp3c_Create />
                            <AQButtonExportData
                        isAllData={true}
                        objectName="dsAssessmentTab5"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <Button color="red" leftSection={<IconTrash />}>
                        Xóa
                    </Button>
                        </Group>
                    </>
                )
            }}
        />
    );
}
