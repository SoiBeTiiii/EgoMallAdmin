"use client"
import baseAxios from '@/api/baseAxios';
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import F_lz8rrabyws_Update from './F_lz8rrabyws_Update';

interface IF_lz8rrabyws_PIs {
    PIsCode: string;
    PIsPercentage: number;
    descriptionPage2: string
}

interface IF_lz8rrabyws_Read {
    id?: number;
    code?: string;
    name?: string;
    coeGrade?: {};
    totalCourse?: number;
    totalCredit?: number;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
    PIs: IF_lz8rrabyws_PIs[];
}



// const mockProgramDetails: IProgramDetail[] = [
//     {
//         id: 1,
//         year: "2024-1",
//         order: "1",
//         code: "KTTC001",
//         name: "Kế toán tài chính",
//         group: "Cơ sở ngành",
//         credit: 2,
//         periods: 30,
//         courseCode: "CKCT24",
//     },
// ];

export default function F_lz8rrabyws_Read() {
    const [totalSubjects, setTotalSubjects] = useState<Record<number, number>>({}); // Lưu tổng số môn học theo ID

    const AllUniversityLecturerAndExpertQuery = useQuery<any[]>({
        queryKey: [`F_lz8rrabyws_Read`],
        queryFn: async () => {
            const result = await baseAxios.get("/COEGrade/GetSource")
            return result.data?.data || []
        },
    });



    const [importData, setImportData] = useState(false);
    const dis = useDisclosure();
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    function ProgramDetailButton({ id }: { id: number }) {
        const dis = useDisclosure(); // Each row gets its own modal state
        const programDetailQuery = useQuery<any[]>({
            queryKey: ["ProgramDetailData", id],
            queryFn: async () => {
                const result = await baseAxios.get(`/COEGradeSubject/GetSubjectByGrade?COEGradeId=${id}&cols=COESubject%2CCOESemester`)

                return result.data?.data || []
            },
        });
        useEffect(() => {
            if (programDetailQuery.data) {
                setTotalSubjects((prev) => ({
                    ...prev,
                    [id]: programDetailQuery.data.length, // Cập nhật số môn học cho đúng ID
                }));
            }
        }, [programDetailQuery.data, id]);

        return (
            <MyButtonModal modalSize={"90%"} disclosure={dis} label='Xem chi tiết' title={`Chi tiết chương trình đào tạo khóa `}>
                <MyDataTable
                    exportAble
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    columns={[
                        { header: "Năm học Học kỳ", accessorKey: "year", accessorFn: (row) => row.coeSemester?.name },
                        { header: "Thứ tự", accessorKey: "order" },
                        { header: "Mã môn học", accessorKey: "code", accessorFn: (row) => row.coeSubject?.code },
                        { header: "Tên môn học", accessorKey: "name", accessorFn: (row) => row.coeSubject?.name },
                        { header: "Số tín chỉ", accessorKey: "credit", accessorFn: (row) => row.coeSubject?.numberCredit },
                        { header: "Số tiết", accessorKey: "periods", accessorFn: (row) => row.coeSubject?.numberPeriod },
                    ]}



                    data={programDetailQuery.data || []}
                />
            </MyButtonModal>
        );
    }


    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        {
            header: "Mã khóa",
            accessorKey: "code",
            accessorFn: (row) => row?.code || "N/A"

        },
        {
            header: "Tên khóa",
            accessorKey: "name",
            accessorFn: (row) => row?.name || "N/A"

        },
        {
            header: "Chương trình",
            accessorKey: "coeGrade",
            accessorFn: (row) => row?.coeProgram?.name || "N/A"
        },
        {
            header: "Khoa",
            accessorFn: (row) => row?.coeProgram?.coeUnit?.name || "N/A"
        },
        {
            header: "Tổng số môn học",
            accessorKey: "totalSubject",
        },
        {
            header: "Tổng số tín chỉ",
            accessorKey: "totalCredit"
        },
        {

            header: "Chương trình đào tạo",
            accessorFn: (row) => <ProgramDetailButton id={row.id} />,

        },
        {
            header: "PLO",
            accessorFn: (row) => <F_lz8rrabyws_Update id={row.id} name={row?.coeProgram?.name} code={row.code} />
        },
    ], [totalSubjects]);



    if (AllUniversityLecturerAndExpertQuery.isLoading) return "Đang tải dữ liệu...";
    if (AllUniversityLecturerAndExpertQuery.isError) return "Không có dữ liệu...";

    return (
        <div>
            <MyDataTable
                key={JSON.stringify(totalSubjects)}
                exportAble
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                data={AllUniversityLecturerAndExpertQuery.data || []}
            />
        </div>
    );
}
