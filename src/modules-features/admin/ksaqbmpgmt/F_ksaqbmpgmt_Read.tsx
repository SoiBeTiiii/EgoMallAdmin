import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow';
import { Button, Flex, Paper, Select, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDownload } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

interface IPi {
    id: number;
    subCategory: string;
    pi: string;
    target1: string;
    year1: string;
    target2: string;
    year2: string;
    errors: {
        target1: string;
        year1: string;
        target2: string;
        year2: string;
    };
}

interface IPlan {
    id: number;
    ploCode: string;
    rows: IPi[];
}


export default function F_ksaqbmpgmt_Read() {

    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    
    const query = useQuery<IPlan[]>({
        queryKey: [`F_ksaqbmpgmt_Read`],
        queryFn: async () => {
            return data;
        },
    });


    


    if (query.isLoading) return <div>Đang tải dữ liệu...</div>;
    if (query.isError) return <div>Không có dữ liệu...</div>;

    return (
        <>
            <Flex justify="flex-start" align="center" gap="md" style={{ marginBottom: '10px' }}>
                <Select
                    style={{ width: '250px' }}
                    label="Chọn chương trình"
                    data={[
                        { value: '1', label: 'Tiếng Anh Thương Mại' },
                        { value: '2', label: 'Công Nghệ Thông Tin' },
                    ]}
                    defaultValue="1"
                />
                <Select
                    style={{ width: '250px' }}
                    label="Năm chọn đo"
                    data={[
                        { value: '1', label: '2023-2024' },
                        { value: '2', label: '2022-2023' },
                    ]}
                    defaultValue="1"
                />
            </Flex>
            <Paper style={{ overflowX: 'auto' }}>
                <MyFlexRow style={{ justifyContent: 'flex-start', gap: '10px', marginBottom: '0px', padding: '10px', borderRadius: '8px' }}>
                    {/* <Button>Thêm</Button>
                    <AQButtonCreateByImportFile
                        setImportedData={setImportData}
                        form={form_multiple}
                        onSubmit={() => console.log(form_multiple.values)}
                    >
                        Tải lên
                    </AQButtonCreateByImportFile> */}
                    <Button
                        color="green.8"
                        leftSection={<IconDownload />}
                        variant="filled"
                        
                    >
                        Export
                    </Button>
                    <Button color="blue.8" variant="filled">Lưu</Button>
                </MyFlexRow>
                <Table withRowBorders withColumnBorders style={{ minWidth: '1000px', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th rowSpan={2} ta="center" style={{ border: '1px solid #ddd' }}>STT</Table.Th>
                            <Table.Th rowSpan={2} ta="center" style={{ border: '1px solid #ddd' }}>PLO</Table.Th>
                            <Table.Th rowSpan={2} ta="center" style={{ border: '1px solid #ddd' }}>Pis</Table.Th>
                            <Table.Th rowSpan={2} ta="center" style={{ border: '1px solid #ddd' }}>Nội dung</Table.Th>
                            <Table.Th colSpan={2} ta="center" style={{ border: '1px solid #ddd' }}>Kế hoạch đo lần 1</Table.Th>
                            <Table.Th colSpan={2} ta="center" style={{ border: '1px solid #ddd' }}>Kế hoạch đo lần 2</Table.Th>
                            <Table.Th rowSpan={2} style={{ width: '100px', textAlign: 'center', border: '1px solid #ddd' }}>Thao tác</Table.Th>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th ta="center" style={{ border: '1px solid #ddd' }}>Chỉ tiêu</Table.Th>
                            <Table.Th ta="center" style={{ border: '1px solid #ddd' }}>Năm chọn đo</Table.Th>
                            <Table.Th ta="center" style={{ border: '1px solid #ddd' }}>Chỉ tiêu</Table.Th>
                            <Table.Th ta="center" style={{ border: '1px solid #ddd' }}>Năm chọn đo</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {query.data?.map((ploRow, ploIndex) => (
                            <React.Fragment key={ploRow.id}>
                                {ploRow.rows.map((subRow, subRowIdx) => (
                                    <Table.Tr key={subRowIdx}>
                                        {subRowIdx === 0 && (
                                            <>
                                                <Table.Td rowSpan={ploRow.rows.length} style={{ textAlign: 'center' }}>
                                                    {ploRow.id}
                                                </Table.Td>
                                                <Table.Td rowSpan={ploRow.rows.length} style={{ textAlign: 'center' }}>
                                                    {ploRow.ploCode}
                                                </Table.Td>
                                            </>
                                        )}
                                        <Table.Td style={{ textAlign: 'center' }}>{subRow.subCategory}</Table.Td>
                                        <Table.Td style={{ textAlign: 'center' }}>{subRow.pi}</Table.Td>
                                        <Table.Td style={{ textAlign: 'center' }}><TextInput defaultValue={subRow.target1}/></Table.Td>
                                        <Table.Td style={{ textAlign: 'center' }}><TextInput defaultValue={subRow.year1}/></Table.Td>
                                        <Table.Td style={{ textAlign: 'center' }}><TextInput defaultValue={subRow.target2}/></Table.Td>
                                        <Table.Td style={{ textAlign: 'center' }}><TextInput defaultValue={subRow.year2}/></Table.Td>
                                        <Table.Td style={{ width: '100px', textAlign: 'center', border: '1px solid #ddd' }}>
                                            <Button
                                                color="red"
                                            >
                                                Xóa
                                            </Button>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </Table.Tbody>
                </Table>
            </Paper>
        </>
    );
}

const data: IPlan[] = [
    {
        id: 1,
        ploCode: 'PLO1',
        rows: [
            {
                id: 101,
                subCategory: 'PI1.1',
                pi: 'Trình bày các kiến thức cơ bản về kế toán',
                target1: '70',
                year1: '2021-2022',
                target2: '75',
                year2: '2024-2025',
                errors: {
                    target1: '',
                    year1: '',
                    target2: '',
                    year2: '',
                },
            },
            {
                id: 102,
                subCategory: 'PI1.2',
                pi: 'Vận dụng các kỹ thuật của kế toán trong xử lý các nghiệp vụ kinh tế phát sinh',
                target1: '60',
                year1: '2021-2022',
                target2: '70',
                year2: '2024-2025',
                errors: {
                    target1: '',
                    year1: '',
                    target2: '',
                    year2: '',
                },
            },
        ],
    },
];
