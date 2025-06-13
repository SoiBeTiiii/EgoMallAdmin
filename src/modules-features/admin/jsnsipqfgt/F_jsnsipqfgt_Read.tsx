'use client';

import { Button, Fieldset, Paper, Select, Table } from '@mantine/core';
import { IconFileExport } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

// Define the structure of your data
interface PloRowData {
    subCategory: string;
    content: string;
    target1: string;
    result1: string;
    year1: string;
    target2: string;
    result2: string;
    year2: string;
}

interface PloData {
    id: number;
    ploCode: string;
    rows: PloRowData[];
}

// Mock data fetching function
const useFetchPLOResultsData = () => {
    return useQuery<PloData[]>({
        queryKey: ['fetchPLOResultsData'],
        queryFn: async () => [
            {
                id: 1,
                ploCode: 'PLO1',
                rows: [
                    {
                        subCategory: 'PI1.1',
                        content: 'Trình bày các kiến thức cơ bản về kế toán',
                        target1: '70',
                        result1: 'Đạt',
                        year1: '2021-2022',
                        target2: '75',
                        result2: 'Đạt',
                        year2: '2024-2025',
                    },
                    {
                        subCategory: 'PI1.2',
                        content: 'Vận dụng các kỹ thuật của kế toán trong xử lý các nghiệp vụ kinh tế phát sinh',
                        target1: '60',
                        result1: 'Không đạt',
                        year1: '2021-2022',
                        target2: '70',
                        result2: 'Đạt',
                        year2: '2024-2025',
                    },
                ],
            },
        ],
    });
};

export default function F_jsnsipqfgt_Read() {
    // Fetch data using react-query
    const { data, isLoading, isError } = useFetchPLOResultsData();

    if (isLoading) return <p>Đang tải dữ liệu...</p>;
    if (isError) return <p>Lỗi khi tải dữ liệu...</p>;

    return (
        <Fieldset legend={`Kết quả đo chuẩn đầu ra theo chương trình đào tạo`}>
                <Paper style={{ overflowX: 'auto' }}>

                {/* Header Controls */}
                <div style={{ display: 'flex', marginBottom: '16px', marginLeft: '10px' }}>
                    <Select
                        w="30%"
                        label="Chọn Chương trình"
                        data={[
                            { value: '1', label: 'Tiếng Anh Thương Mại' },
                            { value: '2', label: 'Công Nghệ Thông Tin' },
                        ]}
                        defaultValue="1"
                    />
                    <Select
                        style={{ marginLeft: '30px' }}
                        w="30%"
                        label="Năm chọn đo"
                        data={[
                            { value: '1', label: '2023-2024' },
                            { value: '2', label: '2022-2023' },
                        ]}
                        defaultValue="1"
                    />
                    <Button
                        color="green.8"
                        leftSection={<IconFileExport />}
                        variant="filled"
                        style={{ marginTop: '24px', marginLeft: '300px' }}
                    >
                        Export
                    </Button>
                </div>

                {/* Table */}
                <Table withColumnBorders style={{ minWidth: '1200px', tableLayout: 'fixed' }}>
                    {/* Table Header */}
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th rowSpan={2} style={{ textAlign: 'center' }}>
                                STT
                            </Table.Th>
                            <Table.Th rowSpan={2} style={{ textAlign: 'center' }}>
                                PLO
                            </Table.Th>
                            <Table.Th rowSpan={2} style={{ textAlign: 'center' }}>
                                Pis
                            </Table.Th>
                            <Table.Th rowSpan={2} style={{ textAlign: 'center', width: '300px' }}>
                                Nội dung
                            </Table.Th>
                            <Table.Th colSpan={3} style={{ textAlign: 'center' }}>
                                Kết quả đo lần 1
                            </Table.Th>
                            <Table.Th colSpan={3} style={{ textAlign: 'center' }}>
                                Kết quả đo lần 2
                            </Table.Th>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th style={{ textAlign: 'center' }}>Tỷ lệ % đạt</Table.Th>
                            <Table.Th style={{ textAlign: 'center' }}>Kết quả</Table.Th>
                            <Table.Th style={{ textAlign: 'center' }}>Năm chọn đo</Table.Th>
                            <Table.Th style={{ textAlign: 'center' }}>Tỷ lệ % đạt</Table.Th>
                            <Table.Th style={{ textAlign: 'center' }}>Kết quả</Table.Th>
                            <Table.Th style={{ textAlign: 'center' }}>Năm chọn đo</Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    {/* Table Body */}
                    <Table.Tbody>
                        {data?.map((ploRow) => (
                            <React.Fragment key={ploRow.id}>
                                {ploRow.rows.map((subRow, subRowIndex) => (
                                    <Table.Tr key={subRowIndex}>
                                        {/* STT and PLO with RowSpan */}
                                        {subRowIndex === 0 && (
                                            <>
                                                <Table.Td rowSpan={ploRow.rows.length} style={{ textAlign: 'center' }}>
                                                    {ploRow.id}
                                                </Table.Td>
                                                <Table.Td rowSpan={ploRow.rows.length} style={{ textAlign: 'center' }}>
                                                    {ploRow.ploCode}
                                                </Table.Td>
                                            </>
                                        )}
                                        {/* Sub-row details */}
                                        <Table.Td style={{ textAlign: 'center' }}>{subRow.subCategory}</Table.Td>
                                        <Table.Td>
                                            <div>{subRow.content}</div>
                                        </Table.Td>
                                        <Table.Td>
                                            <div>{subRow.target1}</div>
                                        </Table.Td>
                                        <Table.Td>
                                            <div>{subRow.result1}</div>
                                        </Table.Td>
                                        <Table.Td>
                                            <div>{subRow.year1}</div>
                                        </Table.Td>
                                        <Table.Td>
                                            <div>{subRow.target2}</div>
                                        </Table.Td>
                                        <Table.Td>
                                            <div>{subRow.result2}</div>
                                        </Table.Td>
                                        <Table.Td>
                                            <div>{subRow.year2}</div>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </Table.Tbody>
                </Table>
        </Paper>
            </Fieldset>
    );
}
