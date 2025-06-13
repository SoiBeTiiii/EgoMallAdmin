"use client"
import { MyButton } from '@/components/Buttons/Button/MyButton';
import AQButtonCreateByImportFile from '@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile';
import AQButtonExportData from '@/components/Buttons/ButtonCRUD/AQButtonExportData';
import { Group, Paper, Table } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import F_rkmys3r5qu_Update from '../F_rkmys3r5qu_Update';
import F_rkmys3r5qu_Create_PIs_Adjustment from './F_rkmys3r5qu_Create_PIs_Adjustment';
import F_rkmys3r5qu_Delete_PIs_Adjustment from './F_rkmys3r5qu_Delete_PIs_Adjustment';
import F_rkmys3r5qu_Update_PIs_Adjustment from './F_rkmys3r5qu_Update_PIs_Adjustment';
interface IF_rkmys3r5qu_PIs {
    id: number,
    PIsCode: string;
    PIsPercentage: number;
    descriptionPage2: string
}
interface IF_rkmys3r5qu_PIs_Adjustment {
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

export default function F_rkmys3r5qu_PIs_Adjustment() {

    const AllUniversityLecturerAndExpertQuery = useQuery<IF_rkmys3r5qu_PIs_Adjustment[]>({
        queryKey: [`F_rkmys3r5qu_PIs_Adjustment`],
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

        ]
    };


    const columns = useMemo<MRT_ColumnDef<IF_rkmys3r5qu_PIs_Adjustment>[]>(
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

        ],
        []
    );


    if (AllUniversityLecturerAndExpertQuery.isLoading) return "Đang tải dữ liệu..."
    if (AllUniversityLecturerAndExpertQuery.isError) return "Không có dữ liệu..."
    return (

        <Paper mt={10}>
            <Group>
                <F_rkmys3r5qu_Create_PIs_Adjustment />
                <AQButtonCreateByImportFile
                    setImportedData={() => { }}
                    form={form_multiple}
                    onSubmit={() => {
                        console.log(form_multiple.values);
                    }}
                >
                    Import
                </AQButtonCreateByImportFile>
                <AQButtonExportData data={AllUniversityLecturerAndExpertQuery.data!} exportConfig={exportConfig} isAllData={false} objectName={'test'} />
                <MyButton crudType='delete' />
            </Group>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th ta={'center'}>STT</Table.Th>
                        <Table.Th ta={'center'}>Mã PLO</Table.Th>
                        <Table.Th ta={'center'}>Tỷ trọng PLO</Table.Th>
                        <Table.Th ta={'center'}>Mã PIs</Table.Th>
                        <Table.Th ta={'center'}>Tỷ trọng PIs</Table.Th>
                        <Table.Th ta={'center'}>Mô tả</Table.Th>
                        <Table.Th ta={'center'}>Thao tác</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {AllUniversityLecturerAndExpertQuery.data?.map((row, rowIndex) => (
                        row.PIs.map((pi, piIndex) => (
                            <Table.Tr key={`${row.id}-${piIndex}`}>
                                {/* Render STT only once per PLO */}
                                {piIndex === 0 && (
                                    <>
                                        <Table.Td ta={'center'} rowSpan={row.PIs.length}>{rowIndex + 1}</Table.Td>
                                        <Table.Td rowSpan={row.PIs.length}>{row.PLOCode}</Table.Td>
                                        <Table.Td rowSpan={row.PIs.length}>{row.PLOPercentage}%</Table.Td>
                                    </>
                                )}
                                <Table.Td>{pi.PIsCode}</Table.Td>
                                <Table.Td>{pi.PIsPercentage}%</Table.Td>
                                <Table.Td>{pi.descriptionPage2}</Table.Td>

                                <Table.Td ta={'center'}>
                                    <F_rkmys3r5qu_Update_PIs_Adjustment dataPLO={row} dataPi={pi} />
                                    <F_rkmys3r5qu_Delete_PIs_Adjustment id={pi.id} />
                                </Table.Td>
                            </Table.Tr>
                        ))
                    ))}
                </Table.Tbody>
            </Table>

        </Paper>
    )
}
const mockData: IF_rkmys3r5qu_PIs_Adjustment[] = [
    {
        id: 1,
        code: "CKCT",
        name: "Cơ khí chế tạo",
        courseCode: "CKCT24",
        falcutyCode: "Khoa Cơ khí",
        descriptionPage1: "Thiết kế, chế tạo và vận hành hệ thống cơ khí trong các ngành công nghiệp hiện đại.",
        PLOCode: "PLO1",
        PLOPercentage: 18,
        PIs: [
            {
                id: 1,
                PIsCode: "PI1.1",
                PIsPercentage: 40,
                descriptionPage2: "Thiết kế hệ thống máy móc cơ khí đáp ứng yêu cầu kỹ thuật."
            },
            {
                id: 2,
                PIsCode: "PI1.2",
                PIsPercentage: 60,
                descriptionPage2: "Sử dụng phần mềm mô phỏng để tối ưu hóa thiết kế cơ khí."
            }
        ],
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-12-23")
    },
    {
        id: 2,
        code: "CKDL",
        name: "Cơ khí động lực",
        courseCode: "CKDL24",
        falcutyCode: "Khoa Cơ khí",
        descriptionPage1: "Phân tích, thiết kế và vận hành các hệ thống cơ khí trong ngành động lực.",
        PLOCode: "PLO2",
        PLOPercentage: 22,
        PIs: [
            {
                id: 3,
                PIsCode: "PI2.1",
                PIsPercentage: 100,
                descriptionPage2: "Mô phỏng và đánh giá hiệu suất động cơ đốt trong."
            }
        ],
        nguoiCapNhat: "Lê Minh C",
        ngayCapNhat: new Date("2025-01-10")
    },
    {
        id: 3,
        code: "DTVT",
        name: "Điện tử - Viễn thông",
        courseCode: "DTVT24",
        falcutyCode: "Khoa Điện - Điện tử",
        descriptionPage1: "Nghiên cứu, phát triển và ứng dụng công nghệ viễn thông hiện đại.",
        PLOCode: "PLO3",
        PLOPercentage: 20,
        PIs: [
            {
                id: 4,
                PIsCode: "PI3.1",
                PIsPercentage: 100,
                descriptionPage2: "Xây dựng và tối ưu hóa hệ thống mạng viễn thông."
            }
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
        descriptionPage1: "Lập trình, phân tích dữ liệu và bảo mật hệ thống thông tin.",
        PLOCode: "PLO4",
        PLOPercentage: 25,
        PIs: [
            {
                id: 5,
                PIsCode: "PI4.1",
                PIsPercentage: 55,
                descriptionPage2: "Thiết kế và triển khai hệ thống phần mềm quy mô lớn."
            },
            {
                id: 6,
                PIsCode: "PI4.2",
                PIsPercentage: 45,
                descriptionPage2: "Phát triển các thuật toán bảo mật trong hệ thống CNTT."
            }
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
        descriptionPage1: "Ứng dụng công nghệ mới trong xây dựng và quản lý công trình.",
        PLOCode: "PLO5",
        PLOPercentage: 22,
        PIs: [
            {
                id: 7,
                PIsCode: "PI5.1",
                PIsPercentage: 30,
                descriptionPage2: "Thiết kế và tính toán kết cấu công trình dân dụng."
            },
            {
                id: 8,
                PIsCode: "PI5.2",
                PIsPercentage: 35,
                descriptionPage2: "Xâ dựng mô hình dựa trên thiết kế công trình dân dụng."
            },
            {
                id: 9,
                PIsCode: "PI5.3",
                PIsPercentage: 35,
                descriptionPage2: "Ứng dụng vật liệu xanh và bền vững trong xây dựng."
            }
        ],
        nguoiCapNhat: "Phạm Thị D",
        ngayCapNhat: new Date("2025-04-01")
    }
]
