'use client';

import { MyButton } from '@/components/Buttons/Button/MyButton';
import { Fieldset, Flex, Paper, Select, Table } from '@mantine/core';
import { IconFileExport } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

// Define the data structure
interface PLOData {
    id: number;
    programName: string;
    totalPLO: number;
    measurablePLO: number;
    sampleSubjectsHK1: number;
    sampleSubjectsHK2: number;
    targetPercentage: string;
    achievedPercentage: string;
}

// Query function to fetch PLO data
const useFetchPLOData = () => {
    return useQuery<PLOData[]>({
        queryKey: ['fetchPLOData'],
        queryFn: async () => [
            {
                id: 1,
                programName: 'Tiếng Anh Thương mại',
                totalPLO: 20,
                measurablePLO: 12,
                sampleSubjectsHK1: 7,
                sampleSubjectsHK2: 5,
                targetPercentage: '70%',
                achievedPercentage: '62%',
            },
            {
                id: 2,
                programName: 'Ngôn ngữ Anh',
                totalPLO: 21,
                measurablePLO: 10,
                sampleSubjectsHK1: 6,
                sampleSubjectsHK2: 4,
                targetPercentage: '70%',
                achievedPercentage: '75%',
            },
        ], // Replace this with an API call in a real scenario
    });
};

export default function F_qgpxxmcfjh_Read() {
    const { data, isLoading, isError } = useFetchPLOData();

    if (isLoading) return <p>Đang tải dữ liệu...</p>;
    if (isError) return <p>Lỗi khi tải dữ liệu...</p>;

    return (
        <Fieldset legend={`Kết quả đo chuẩn đầu ra đơn vị`}>

            <Paper style={{ overflowX: 'auto', padding: '20px' }}>
                <Flex align="center" mb="20px">
                    <Select
                        w="30%"
                        label="Chọn Khoa"
                        data={[{ value: "1", label: 'Kinh tế' }, { value: "2", label: 'Công nghệ thông tin' }, { value: "3", label: 'Ngoại ngữ' }]}
                        defaultValue="1"
                        style={{ marginRight: '20px' }}
                    />
                    <Select
                        w="30%"
                        label="Năm chọn đo"
                        data={[{ value: "1", label: '2023-2024' }, { value: "2", label: '2024-2025' }, { value: "3", label: '2025-2026' }]}
                        defaultValue="1"
                    />
                    <MyButton
                        leftSection={<IconFileExport />}
                        style={{ marginTop: '20px', marginLeft: '300px' }}
                        color="green"
                    >
                        Export
                    </MyButton>
                </Flex>
                <Table withColumnBorders style={{ minWidth: '1000px', tableLayout: 'fixed' }}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th ta="center" rowSpan={2}>
                                STT
                            </Table.Th>
                            <Table.Th ta="center" rowSpan={2}>
                                Chương trình
                            </Table.Th>
                            <Table.Th ta="center" rowSpan={2}>
                                Số lượng PLO
                            </Table.Th>
                            <Table.Th ta="center" rowSpan={2}>
                                Số lượng PLO cần đo
                            </Table.Th>
                            <Table.Th ta="center" rowSpan={2}>
                                Số lượng môn học lấy mẫu HK1
                            </Table.Th>
                            <Table.Th ta="center" rowSpan={2}>
                                Số lượng môn học lấy mẫu HK2
                            </Table.Th>
                            <Table.Th ta="center" colSpan={2}>
                                Mức độ đạt PLO
                            </Table.Th>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th ta="center">Chỉ tiêu</Table.Th>
                            <Table.Th ta="center">Kết quả</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {data?.map((row) => (
                            <Table.Tr key={row.id}>
                                <Table.Td ta="center">{row.id}</Table.Td>
                                <Table.Td ta="center">{row.programName}</Table.Td>
                                <Table.Td ta="center">{row.totalPLO}</Table.Td>
                                <Table.Td ta="center">{row.measurablePLO}</Table.Td>
                                <Table.Td ta="center">{row.sampleSubjectsHK1}</Table.Td>
                                <Table.Td ta="center">{row.sampleSubjectsHK2}</Table.Td>
                                <Table.Td ta="center">{row.targetPercentage}</Table.Td>
                                <Table.Td ta="center">{row.achievedPercentage}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Paper>
        </Fieldset>
    );
}
