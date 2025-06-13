import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_matrixCLOandAssessment_Read from "./F_matrixCLOandAssessment_Read";
import F_matrixPLOandCLO_Read from "./F_matrixPLOandCLO_Read";
export interface IFmcqcwafkfj {
    id?: number; // STT
    faculty?: string; // Khoa
    course?: string; // Khóa
    plo?: string; // PLO
    subjectCpde?: string; // Mã môn học
    subjectName?: string; // Tên môn học
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

export default function ReadTemplate() {
    const query = useQuery<IFmcqcwafkfj[]>({
        queryKey: [`ListOfSubjects`],
        queryFn: async () => [
            {
                id: 1,
                faculty: "Ngoại ngữ",
                course: "TATM24",
                plo: "PLO01",
                subjectCpde: "TATM",
                subjectName: "Tiếng Anh thương mại",
                nguoiCapNhat: 'Admin',
                ngayCapNhat: new Date('2024-12-20'),
            },
            {
                id: 2,
                faculty: "Ngoại ngữ",
                course: "TATM24",
                plo: "PLO02",
                subjectCpde: "VHA",
                subjectName: "Văn hóa Anh",
                nguoiCapNhat: 'Admin',
                ngayCapNhat: new Date('2024-12-20'),
            },
            {
                id: 3,
                faculty: "Ngoại ngữ",
                course: "TATM24",
                plo: "PLO03",
                subjectCpde: "VHM",
                subjectName: "Văn hóa Mỹ",
                nguoiCapNhat: 'Admin',
                ngayCapNhat: new Date('2024-12-20'),
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<IFmcqcwafkfj>[]>(() => [
        {
            header: "Khoa",
            accessorKey: "faculty",
        },
        {
            header: "Khóa",
            accessorKey: "course",
        },
        {
            header: "PLO",
            accessorKey: "plo",
        },
        {
            header: "Mã môn học",
            accessorKey: "subjectCpde",
        },
        {
            header: "Tên môn học",
            accessorKey: "subjectName",
        },
        {
            header: "Đề cương",
            accessorKey: "object",
            Cell: () => <MyButtonViewPDF />,
        },
        {
            header: "Ma trận PLO và CLO",
            accessorKey: "matrixPLOandCLO",
            Cell: () => <F_matrixPLOandCLO_Read />
        },
        {
            header: "Ma trận CLO và Assessment",
            accessorKey: "matrixCLOandAssessment",
            Cell: ({row}) =>{

                
                return <F_matrixCLOandAssessment_Read data = {row.original} />
            
        }
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

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyFlexColumn>
            <Select
                label="Chọn khóa"
                data={['Ngôn ngữ Anh 2024', 'Công nghệ thông tin 2020']}
                defaultValue="Ngôn ngữ Anh 2024"
                clearable
            />
            <MyDataTable
                columns={columns}
                data={query.data!}
                exportAble
            />
        </MyFlexColumn>
    );
}
