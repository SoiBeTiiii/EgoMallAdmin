"use client"
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import F_rkmys3r5qu_Update from './F_rkmys3r5qu_Update';
import { U0DateToDDMMYYYString } from '@/utils/date';
interface IF_rkmys3r5qu_PIs {
    PIsCode: string;
    PIsPercentage: number;
    descriptionPage2: string
}
interface IF_rkmys3r5qu_Read {
    id?: number;
    code?: string;
    name?: string;
    courseCode?: string;
    falcutyCode?: string;
    PLOCode?: string;
    PLOPercentage?: number;
    descriptionPage1?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
    PIs: IF_rkmys3r5qu_PIs[];
}

export default function F_rkmys3r5qu_Read() {

    const AllUniversityLecturerAndExpertQuery = useQuery<IF_rkmys3r5qu_Read[]>({
        queryKey: [`F_rkmys3r5qu_Read`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })


    const formatFunctions = {
        birthDate: (value: string) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
        },
        isEnabled: (value: boolean) => (value ? "Đã kích hoạt" : "Chưa kích hoạt")
    };

    const exportConfig = {
        fields: [
            {
                fieldName: "code",
                header: "Mã chương trình"
            },
            {
                fieldName: "name",
                header: "Tên chương trình"
            },
            {
                fieldName: "courseCode",
                header: "Mã khóa"
            },
            {
                fieldName: "falcutyCode",
                header: "Mã khoa"
            },
            {
                fieldName: "PLOCode",
                header: "Mã PLO"
            },
            {
                fieldName: "PLOPercentage",
                header: "Tỷ trọng PLO (%)"
            },
            {
                fieldName: "descriptionPage1",
                header: "Mô tả PLO"
            },
            {
                fieldName: "PIsCode",
                header: "Mã PIs"
            },
            {
                fieldName: "PIsPercentage",
                header: "Tỷ trọng PIs (%)"
            },
            {
                fieldName: "descriptionPage2",
                header: "Mô tả PIs"
            },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },

        ]
    };


    const columns = useMemo<MRT_ColumnDef<IF_rkmys3r5qu_Read>[]>(
        () => [
            {
                header: "Mã ngành",
                accessorKey: "code"
            },
            {
                header: "Tên ngành",
                accessorKey: "name"
            },
            {
                header: "Mã khóa học",
                accessorKey: "courseCode"
            },
            {
                header: "Khoa",
                accessorKey: "falcutyCode",

            },
            {
                header: "Cập nhật PLO",
                accessorFn: (originalRow) => {
                    return (
                        <F_rkmys3r5qu_Update data={originalRow} />
                    )
                },
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
            // {
            //     header: "Mã PLO",
            //     accessorKey: "PLOCode"
            // },
            // {
            //     header: "Tỷ trọng PLO (%)",
            //     accessorKey: "PLOPercentage",
            //     accessorFn: (originalRow) => `${originalRow.PLOPercentage}%`,
            // },
            // {
            //     header: "Mô tả PLO",
            //     accessorKey: "descriptionPage1"
            // },
            // {
            //     header: "Mã PIs",
            //     accessorKey: "PIsCode"
            // },
            // {
            //     header: "Tỷ trọng PIs (%)",
            //     accessorKey: "PIsPercentage",
            //     accessorFn: (originalRow) => `${originalRow.PIsPercentage}%`,
            // },
            // {
            //     header: "Mô tả PIs",
            //     accessorKey: "descriptionPage2"
            // },
            // {
            //     header: "Người cập nhật",
            //     accessorKey: "nguoiCapNhat"
            // },
            // {
            //     header: "Ngày cập nhật",
            //     accessorKey: "ngayCapNhat",
            //     accessorFn: (originalRow) => U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!)),
            // },
        ],
        []
    );


    if (AllUniversityLecturerAndExpertQuery.isLoading) return "Đang tải dữ liệu..."
    if (AllUniversityLecturerAndExpertQuery.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            exportAble
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={AllUniversityLecturerAndExpertQuery.data!}
        />
    )
}
const mockData: IF_rkmys3r5qu_Read[] = [
    {
        id: 1,
        code: "CKCT",
        name: "Cơ khí chế tạo",
        courseCode: "CKCT24",
        falcutyCode: "Khoa Cơ khí",
        descriptionPage1: "Có khả năng áp dụng kiến thức, kỹ thuật, kỹ năng và các công cụ hiện đại của toán học",
        PLOCode: "PLO1",
        PLOPercentage: 15,
        PIs: [
            {
                PIsCode: "PI1.1",
                PIsPercentage: 35,
                descriptionPage2: "Xác định một vấn đề kỹ thuật trong lĩnh vực công nghệ, kỹ thuật cơ khí",

            },
            {
                PIsCode: "PI1.1",
                PIsPercentage: 35,
                descriptionPage2: "Xác định một vấn đề kỹ thuật trong lĩnh vực công nghệ, kỹ thuật cơ khí",

            },
            {
                PIsCode: "PI1.1",
                PIsPercentage: 35,
                descriptionPage2: "Xác định một vấn đề kỹ thuật trong lĩnh vực công nghệ, kỹ thuật cơ khí",

            },

        ],
        nguoiCapNhat: "Quản trị viên",
        ngayCapNhat: new Date("2024-12-23"),
    },
    {
        id: 2,
        code: "CKDL",
        name: "Cơ khí động lực",
        courseCode: "CKDL24",
        falcutyCode: "Khoa Cơ khí",
        PLOCode: "PLO2",
        PLOPercentage: 20,
        descriptionPage1: "Nắm vững các nguyên lý cơ bản của cơ khí động lực và ứng dụng trong thực tế",
        PIs: [
            {
                PIsCode: "PI1.1",
                PIsPercentage: 35,
                descriptionPage2: "Xác định một vấn đề kỹ thuật trong lĩnh vực công nghệ, kỹ thuật cơ khí",

            },
            {
                PIsCode: "PI1.1",
                PIsPercentage: 35,
                descriptionPage2: "Xác định một vấn đề kỹ thuật trong lĩnh vực công nghệ, kỹ thuật cơ khí",

            },
            {
                PIsCode: "PI1.1",
                PIsPercentage: 35,
                descriptionPage2: "Xác định một vấn đề kỹ thuật trong lĩnh vực công nghệ, kỹ thuật cơ khí",

            },

        ],
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2025-01-10"),

    },
    {
        id: 3,
        code: "DTDT",
        name: "Điện tử - Viễn thông",
        courseCode: "DTDT24",
        falcutyCode: "Khoa Điện - Điện tử",
        PLOCode: "PLO3",
        PLOPercentage: 18,
        descriptionPage1: "Hiểu và vận dụng nguyên lý hoạt động của các mạch điện tử và hệ thống viễn thông",
        PIs: [
            {
                PIsCode: "PI1.1",
                PIsPercentage: 35,
                descriptionPage2: "Xác định một vấn đề kỹ thuật trong lĩnh vực công nghệ, kỹ thuật cơ khí",

            },


        ],
        nguoiCapNhat: "Trần Thị B",
        ngayCapNhat: new Date("2025-02-05")
    },
    {
        id: 4,
        code: "CNTT",
        name: "Công nghệ thông tin",
        courseCode: "CNTT24",
        falcutyCode: "Khoa Công nghệ thông tin",
        PLOCode: "PLO4",
        PLOPercentage: 25,
        descriptionPage1: "Có khả năng lập trình, phát triển và bảo trì phần mềm ứng dụng",
        PIs: [
            {
                PIsCode: "PI1.1",
                PIsPercentage: 35,
                descriptionPage2: "Xác định một vấn đề kỹ thuật trong lĩnh vực công nghệ, kỹ thuật cơ khí",

            },


        ],
        nguoiCapNhat: "Lê Minh C",
        ngayCapNhat: new Date("2025-03-15")
    },
    {
        id: 5,
        code: "KTXD",
        name: "Kỹ thuật xây dựng",
        courseCode: "KTXD24",
        falcutyCode: "Khoa Xây dựng",
        PLOCode: "PLO5",
        PLOPercentage: 22,
        descriptionPage1: "Ứng dụng công nghệ mới trong xây dựng và quản lý công trình",
        PIs: [
            {
                PIsCode: "PI1.1",
                PIsPercentage: 35,
                descriptionPage2: "Xác định một vấn đề kỹ thuật trong lĩnh vực công nghệ, kỹ thuật cơ khí",

            },
            {
                PIsCode: "PI1.1",
                PIsPercentage: 35,
                descriptionPage2: "Xác định một vấn đề kỹ thuật trong lĩnh vực công nghệ, kỹ thuật cơ khí",

            },
            {
                PIsCode: "PI1.1",
                PIsPercentage: 35,
                descriptionPage2: "Xác định một vấn đề kỹ thuật trong lĩnh vực công nghệ, kỹ thuật cơ khí",

            },

        ],
        nguoiCapNhat: "Phạm Thị D",
        ngayCapNhat: new Date("2025-04-01")
    }
];