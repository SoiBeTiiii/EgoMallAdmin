'use client'
import AQButtonCreateByImportFile from '@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow';
import { Button, Flex, NumberInput, Paper, Select, Table } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDownload, IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface CLOData {
    header: string;
    value: number;
    status: number;
    percentage: number;
    errorMessage: string;
}

interface DataRow {
    id: number;
    dataCLOPercentage: {
        [key: string]: CLOData;
    };
}

const FetchData = () => {
    return useQuery<DataRow>({
        queryKey: [`F_bqegemjohk_Read`],
        queryFn: async () => {
            return data;
        },
    });
};

export default function F_bqegemjohk_Read() {
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    const { data: fetchedData, isLoading, isError } = FetchData();
    const [localData, setLocalData] = useState<DataRow[]>([]);

    useEffect(() => {
        if (fetchedData) {
            setLocalData([fetchedData]);
        }
    }, [fetchedData]);

    const handleCellChange = (rowIndex: number, cloKey: string, value: number | string) => {
        setLocalData((prevData) =>
            prevData.map((row, index) => {
                if (index === rowIndex) {
                    const numValue = typeof value === 'string' ? Number(value) : value;
                    const isInvalid = isNaN(numValue);
                    return {
                        ...row,
                        dataCLOPercentage: {
                            ...row.dataCLOPercentage,
                            [cloKey]: {
                                ...row.dataCLOPercentage[cloKey],
                                value: isInvalid ? 0 : numValue,
                                errorMessage: isInvalid ? 'Vui lòng nhập một số hợp lệ' : ''
                            }
                        }
                    };
                }
                return row;
            })
        );
    };

    const calculateTotal = (cloKey: string) => {
        return localData.reduce((sum, row) => {
            const value = row.dataCLOPercentage[cloKey]?.value || 0;
            return sum + value;
        }, 0);
    };

    const handleAddRow = () => {
        setLocalData((prevData) => {
            if (prevData.length === 0) return prevData;

            const lastId = prevData[prevData.length - 1].id;
            const newCLOPercentage = Object.keys(prevData[0].dataCLOPercentage).reduce((acc, key) => {
                acc[key] = {
                    header: key,
                    value: 0,
                    status: 0,
                    percentage: 0,
                    errorMessage: ''
                };
                return acc;
            }, {} as { [key: string]: CLOData });

            return [
                ...prevData,
                {
                    id: lastId + 1,
                    dataCLOPercentage: newCLOPercentage
                }
            ];
        });
    };

    const handleDeleteRow = (rowIndex: number) => {
        setLocalData((prevData) => prevData.filter((_, index) => index !== rowIndex));
    };

    if (isLoading) return <div>Đang tải dữ liệu...</div>;
    if (isError) return <div>Không có dữ liệu...</div>;
    if (localData.length === 0) return <div>Không có dữ liệu...</div>;

    const cloKeys = Object.keys(localData[0].dataCLOPercentage);

    return (
        <>
            <Flex justify="flex-start" align="center" gap="md" style={{ marginBottom: '10px' }}>
                <Select
                    style={{ width: '250px' }}
                    label="Chọn khóa"
                    data={[
                        { value: '1', label: 'Ngôn ngữ Anh 2024' },
                        { value: '2', label: 'Công Nghệ Thông Tin 2020' },
                    ]}
                    placeholder="Chọn khóa"
                    defaultValue="1"
                />
                <MySelect
                    style={{ width: '250px' }}
                    label="Chọn môn"
                    data={[
                        { value: '1', label: 'Tiếng Anh thương mại' },
                        { value: '2', label: 'Cấu trúc dữ liệu' },
                    ]}
                    defaultValue="1"
                />
                <MySelect
                    style={{ width: '250px' }}
                    label="Phương pháp đánh giá"
                    data={[
                        { value: '1', label: 'Trắc nghiệm' },
                        { value: '2', label: 'Tự luận' },
                    ]}
                    defaultValue="1"
                />
            </Flex>

            <Paper style={{ overflowX: 'auto' }}>
                <MyFlexRow
                    style={{
                        justifyContent: 'flex-start',
                        gap: '10px',
                        marginBottom: '0px',
                        padding: '10px',
                        borderRadius: '8px',
                    }}
                >
                    <Button color="blue" leftSection={<IconPlus />} onClick={handleAddRow}>
                        Thêm
                    </Button>
                    <AQButtonCreateByImportFile
                        setImportedData={() => { }}
                        form={form_multiple}
                        onSubmit={() => {
                            console.log(form_multiple.values);
                        }}
                    >
                        Import
                    </AQButtonCreateByImportFile>
                    <Button color="green.8" leftSection={<IconDownload />} variant="filled">
                        Export
                    </Button>
                    <Button color="blue.8" variant="filled">
                        Lưu
                    </Button>
                </MyFlexRow>

                <Table
                    withRowBorders
                    withColumnBorders
                    style={{
                        minWidth: '1000px',
                        tableLayout: 'fixed',
                        borderCollapse: 'collapse',
                    }}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th rowSpan={2} style={{ textAlign: 'center', border: '1px solid #ddd' }}>
                                Câu hỏi đề thi
                            </Table.Th>
                            {cloKeys.map((key) => (
                                <Table.Th key={key} style={{ textAlign: 'center', border: '1px solid #ddd' }}>
                                    {localData[0].dataCLOPercentage[key].header.toUpperCase()}
                                </Table.Th>
                            ))}
                            <Table.Th rowSpan={2} style={{ textAlign: 'center', border: '1px solid #ddd' }}>
                                Thao tác
                            </Table.Th>
                        </Table.Tr>
                        <Table.Tr>
                            {cloKeys.map((key) => (
                                <Table.Th key={key} style={{ textAlign: 'center', border: '1px solid #ddd' }}>
                                    {localData[0].dataCLOPercentage[key].percentage}%
                                </Table.Th>
                            ))}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {localData.map((row, rowIndex) => (
                            <Table.Tr key={rowIndex}>
                                <Table.Td style={{ textAlign: 'center', border: '1px solid #ddd' }}>
                                    {row.id}
                                </Table.Td>
                                {cloKeys.map((key) => (
                                    <Table.Td key={key} style={{ textAlign: 'center', border: '1px solid #ddd' }}>
                                        <NumberInput
                                            value={row.dataCLOPercentage[key].value}
                                            onChange={(value) => handleCellChange(rowIndex, key, value)}
                                            error={row.dataCLOPercentage[key].errorMessage || undefined}
                                            min={0}
                                            max={100}
                                            hideControls
                                        />
                                    </Table.Td>
                                ))}
                                <Table.Td style={{ textAlign: 'center', border: '1px solid #ddd' }}>
                                    <Button color="red" onClick={() => handleDeleteRow(rowIndex)}>
                                        Xóa
                                    </Button>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                        <Table.Tr>
                            <Table.Td style={{ textAlign: 'center', border: '1px solid #ddd' }}>Điểm đo</Table.Td>
                            {cloKeys.map((key) => (
                                <Table.Th key={key} style={{ textAlign: 'center', border: '1px solid #ddd' }}>
                                    {calculateTotal(key)}
                                </Table.Th>
                            ))}
                            <Table.Td style={{ textAlign: 'center', border: '1px solid #ddd' }}></Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Paper>
        </>
    );
}

const data = {
    id: 1,
    dataCLOPercentage: {
        clo1: {
            header: "clo1.1",
            value: 10,
            status: 0,
            percentage: 30,
            errorMessage: ""
        },
        clo2: {
            header: "clo2",
            value: 10,
            status: 0,
            percentage: 30,
            errorMessage: ""
        },
        clo3: {
            header: "clo3",
            value: 10,
            status: 0,
            percentage: 30,
            errorMessage: ""
        },
        clo4: {
            header: "clo4",
            value: 10,
            status: 0,
            percentage: 30,
            errorMessage: ""
        },
        clo5: {
            header: "clo5",
            value: 10,
            status: 0,
            percentage: 30,
            errorMessage: ""
        },
    },
};