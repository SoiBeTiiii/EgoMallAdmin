'use client';

import { MyButton } from '@/components/Buttons/Button/MyButton';
import AQButtonCreateByImportFile from '@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile';
import { Button, Checkbox, Flex, Paper, Select, Table, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconFileExport } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

interface RowData {
    category: string;
    pi1: string;
    pi2: string;
    pi3: string;
    errors: {
        pi1: string;
        pi2: string;
        pi3: string;
    };
}

interface CloData {
    id: number;
    clo: string;
    rows: RowData[];
}

// Mock data fetch function
const useFetchCloData = () => {
    return useQuery<CloData[]>({
        queryKey: ['fetchCloData'],
        queryFn: async () => {
            // Replace this mock data with an actual API call
            return cloData;
        },
    });
};

export default function F_gyzcrisvev_Read() {
    const { data: fetchedData, isLoading, isError } = useFetchCloData();
    const [localData, setLocalData] = useState<CloData[]>([]);

    useEffect(() => {
        if (fetchedData) {
            setLocalData(fetchedData);
        }
    }, [fetchedData]);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    const handleCellChange = (
        cloIndex: number,
        subRowIndex: number,
        key: keyof RowData,
        value: string
    ) => {
        setLocalData((prevData) =>
            prevData.map((row, i) => {
                if (i === cloIndex) {
                    const updatedRows = row.rows.map((subRow, j) => {
                        if (j === subRowIndex) {
                            const isInvalid = isNaN(Number(value)) || value.trim() === ''; // Validate input
                            return {
                                ...subRow,
                                [key]: value,
                                errors: {
                                    ...subRow.errors,
                                    [key]: isInvalid ? 'Vui lòng nhập một số hợp lệ' : '',
                                },
                            };
                        }
                        return subRow;
                    });
                    return { ...row, rows: updatedRows };
                }
                return row;
            })
        );
    };

    if (isLoading) return <Text>Đang tải dữ liệu...</Text>;
    if (isError) return <Text>Không có dữ liệu...</Text>;

    function updateRowValue(index: any, arg1: string, arg2: string) {
        throw new Error('Function not implemented.');
    }

    
    return (
        <Paper style={{ overflowX: 'auto', padding: '16px' }}>
            {/* Header Controls */}
            <div style={{ display: 'flex', marginBottom: '16px' }}>
                <Select
                    label="Chọn Khoa"
                    data={[
                        { value: 'Ngôn ngữ Anh 2024', label: 'Ngôn ngữ Anh 2024' },
                        { value: 'Kinh tế 2024', label: 'Kinh tế 2024' },
                    ]}
                    defaultValue="Ngôn ngữ Anh 2024"
                    style={{ marginRight: "10px" }}
                />
                <Select
                    label="Chọn Môn"
                    data={[
                        { value: 'Tiếng Anh thương mại', label: 'Tiếng Anh thương mại' },
                        { value: 'Kế toán tài chính', label: 'Kế toán tài chính' },
                    ]}
                    defaultValue="Tiếng Anh thương mại"
                    style={{ marginRight: "430px" }}
                />
                <Flex style={{ marginTop: '23px' }}>
                    <Button m="2">Lưu</Button>
                    <AQButtonCreateByImportFile
                        setImportedData={() => { }}
                        form={form_multiple}
                        onSubmit={() => {
                            console.log(form_multiple.values);
                        }}
                        m="2"
                    >
                        Import
                    </AQButtonCreateByImportFile>
                    <MyButton leftSection={<IconFileExport />} m="2" color="green">
                        Export
                    </MyButton>
                </Flex>
            </div>

            {/* Table */}
            <Table withColumnBorders style={{ minWidth: '1200px', tableLayout: 'fixed' }}>
                {/* Table Header */}
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ textAlign: 'center' }}>Chọn</Table.Th>
                        <Table.Th style={{ textAlign: 'center' }}>STT</Table.Th>
                        <Table.Th style={{ textAlign: 'center' }}>Thang đo</Table.Th>
                        <Table.Th style={{ textAlign: 'center' }}>Đánh giá</Table.Th>
                        <Table.Th style={{ textAlign: 'center' }}>Pi1</Table.Th>
                        <Table.Th style={{ textAlign: 'center' }}>Pi2</Table.Th>
                        <Table.Th style={{ textAlign: 'center' }}>Pi3</Table.Th>
                        
                    </Table.Tr>
                </Table.Thead>

                {/* Table Body */}
                <Table.Tbody>
                    {localData.map((cloRow, cloIndex) => (
                        <React.Fragment key={cloRow.id}>
                            {cloRow.rows.map((subRow, subRowIndex) => (
                                <Table.Tr key={subRowIndex}>
                                    <Table.Td style={{ textAlign: 'center' }}>
                                        <Checkbox />
                                    </Table.Td>
                                    {subRowIndex === 0 && (
                                        <>
                                            <Table.Td rowSpan={cloRow.rows.length} style={{ textAlign: 'center' }}>
                                                {cloRow.id}
                                            </Table.Td>
                                            <Table.Td rowSpan={cloRow.rows.length} style={{ textAlign: 'center' }}>
                                                {cloRow.clo}
                                            </Table.Td>
                                        </>
                                    )}
                                    <Table.Td style={{ textAlign: 'center' }}>{subRow.category}</Table.Td>
                                    {Object.entries(subRow).filter(([key])=> key.startsWith('pi'))
                                    .map(([field,value]) => (
                                        <Table.Td key={field} style={{ textAlign: "center" }}>
                                            <TextInput
                                                type="number"
                                                
                                                value={value || ""}
                                                onChange={(e) =>
                                                    handleCellChange(cloIndex, subRowIndex, field as keyof RowData, e.target.value)
                                                }
                                                error={
                                                    subRow.errors[field as keyof typeof subRow.errors] || undefined
                                                }
                                            />
                                        </Table.Td>
                                    ))}

                                </Table.Tr>
                            ))}
                        </React.Fragment>
                    ))}
                </Table.Tbody>

            </Table>
        </Paper>
    );
}
function setLocalData(arg0: (prevData: any) => any) {
    throw new Error('Function not implemented.');
}


const cloData : CloData[] =[
    {
        id: 1,
        clo: 'CLO1.1',
        rows: [
            { category: 'Chuyên cần', pi1: '', pi2: '', pi3: '' ,errors: { pi1: '', pi2: '', pi3: '' } },
            { category: 'Giữa kỳ', pi1: '', pi2: '', pi3: '',errors: { pi1: '', pi2: '', pi3: '' } },
            { category: 'Cuối kỳ', pi1: '', pi2: '', pi3: '',errors: { pi1: '', pi2: '', pi3: '' } },
            { category: 'Đo lường CDR', pi1: '', pi2: '', pi3: '',errors: { pi1: '', pi2: '', pi3: '' } },
        ],
    },
    {
        id: 2,
        clo: 'CLO1.2',
        rows: [
            { category: 'Chuyên cần', pi1: '', pi2: '', pi3: '',errors: { pi1: '', pi2: '', pi3: '' } },
            { category: 'Giữa kỳ', pi1: '', pi2: '', pi3: '',errors: { pi1: '', pi2: '', pi3: ''  }},
            { category: 'Cuối kỳ', pi1: '', pi2: '', pi3: '',errors: { pi1: '', pi2: '', pi3: ''  }},
            { category: 'Đo lường CDR', pi1: '', pi2: '', pi3: '',errors: { pi1: '', pi2: '', pi3: ''  }},
        ],
    },
];