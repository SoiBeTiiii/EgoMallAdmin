"use client";
import { NumberInput, Paper, ScrollArea, Select, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface ISubData {
    subCategory1: string;
    tyTrong: string;
    Pi11: string;
    Pi12: string;
    Pi13: string;
    Pi21: string;
    Pi22: string;
    Pi23: string;
    Pi31: string;
    Pi32: string;
    Pi33: string;
    Pi41: string;
    Pi42: string;
    Pi43: string;
    Pi61: string;
    Pi62: string;
    Pi63: string;
    Pi71: string;
    Pi72: string;
    Pi73: string;
}

interface IValueItem {
    id: number;
    mainCategory: string;
    mainCategory2: string;
    subData: ISubData[];
}

interface IEducationYear {
    id: number;
    title: string;
    value: IValueItem[];
}

export default function F_meigysgtxs_Read() {
    // Helper function to determine if we should render a cell
    const AllUniversityLecturerAndExpertQuery = useQuery<IEducationYear[]>({
        queryKey: [`F_meigysgtxs_Read`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return data
        },
    })
    const isGroupedRow = (rowIndex: number) => {
        return AllUniversityLecturerAndExpertQuery.data![rowIndex].value.some(item => item.subData.length && item.subData.length > 1);
    };

    const shouldRenderCell = (rowIndex: number, field: string) => {
        if (isGroupedRow(rowIndex)) {
            return field === 'mainCategory' || field === 'mainCategory2';
        }
        return true;
    };

    if (AllUniversityLecturerAndExpertQuery.isLoading) return "Đang tải dữ liệu..."
    if (AllUniversityLecturerAndExpertQuery.isError) return "Không có dữ liệu..."

    return (
        <Paper>
            <Select m={10}
                label="Chọn khóa"
                data={[
                    { value: "1", label: "Tiếng Anh Thương Mại 2021" },
                    { value: "2", label: "Công nghệ thông tin 2021" },
                ]}
                defaultValue={1?.toString()}
            // onChange={(value) => form.setFieldValue("tinhChatPhong", parseInt(value?.toString()!))}
            />
            <ScrollArea w={"100%"} >
                <Table w={"105%"} withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th c={'red'} colSpan={4} rowSpan={2} ta={'center'}>
                                Chuẩn đầu ra CTĐT
                            </Table.Th>
                            <Table.Th bg="blue" colSpan={6} rowSpan={1} ta={'center'}>
                                Kiến thức
                            </Table.Th>
                            <Table.Th bg="green" colSpan={6} rowSpan={1} ta={'center'}>
                                Kỹ năng
                            </Table.Th>
                            <Table.Th bg="#D68AEB" colSpan={6} rowSpan={1} ta={'center'}>
                                Mức độ tự chủ và trách nhiệm
                            </Table.Th>
                        </Table.Tr>

                        <Table.Tr>

                            <Table.Th c={'blue'} colSpan={3} rowSpan={1} ta={'center'}>
                                PLO 1
                            </Table.Th>
                            <Table.Th c={'blue'} colSpan={3} rowSpan={1} ta={'center'}>
                                PLO 2
                            </Table.Th>
                            <Table.Th c={'green'} colSpan={3} rowSpan={1} ta={'center'}>
                                PLO 3
                            </Table.Th>
                            <Table.Th c={'green'} colSpan={3} rowSpan={1} ta={'center'}>
                                PLO 4
                            </Table.Th>
                            <Table.Th c={'#D68AEB'} colSpan={3} rowSpan={1} ta={'center'}>
                                PLO 5
                            </Table.Th>
                            <Table.Th c={'#D68AEB'} colSpan={3} rowSpan={1} ta={'center'}>
                                PLO 6
                            </Table.Th>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th colSpan={3}></Table.Th>
                            <Table.Th colSpan={1} ta={'center'} bg="orange">Tỷ trọng (%)</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>20</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>15</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>15</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>10</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>10</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>10</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>20</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>15</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>15</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>10</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>10</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>10</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>20</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>15</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>15</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>10</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>10</Table.Th>
                            <Table.Th ta={'center'} c={'orange'}>10</Table.Th>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th ta={'center'} c={'red'}>Danh mục môn học</Table.Th>
                            <Table.Th ta={'center'} c={'red'}>Mã môn học</Table.Th>
                            <Table.Th ta={'center'} c={'red'}>CĐR môn học</Table.Th>
                            <Table.Th ></Table.Th>
                            <Table.Th ta={'center'} c={'blue'}>Pi 1-1</Table.Th>
                            <Table.Th ta={'center'} c={'blue'}>Pi 1-2</Table.Th>
                            <Table.Th ta={'center'} c={'blue'}>Pi 1-3</Table.Th>
                            <Table.Th ta={'center'} c={'blue'}>Pi 2-1</Table.Th>
                            <Table.Th ta={'center'} c={'blue'}>Pi 2-2</Table.Th>
                            <Table.Th ta={'center'} c={'blue'}>Pi 2-3</Table.Th>
                            <Table.Th ta={'center'} c={'green'}>Pi 3-1</Table.Th>
                            <Table.Th ta={'center'} c={'green'}>Pi 3-2</Table.Th>
                            <Table.Th ta={'center'} c={'green'}>Pi 3-3</Table.Th>
                            <Table.Th ta={'center'} c={'green'}>Pi 4-1</Table.Th>
                            <Table.Th ta={'center'} c={'green'}>Pi 4-2</Table.Th>
                            <Table.Th ta={'center'} c={'green'}>Pi 4-3</Table.Th>
                            <Table.Th ta={'center'} c={'#D68AEB'}>Pi 6-1</Table.Th>
                            <Table.Th ta={'center'} c={'#D68AEB'}>Pi 6-2</Table.Th>
                            <Table.Th ta={'center'} c={'#D68AEB'}>Pi 6-3</Table.Th>
                            <Table.Th ta={'center'} c={'#D68AEB'}>Pi 7-1</Table.Th>
                            <Table.Th ta={'center'} c={'#D68AEB'}>Pi 7-2</Table.Th>
                            <Table.Th ta={'center'} c={'#D68AEB'}>Pi 7-3</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {data.map((row, rowIndex) => {

                            return (
                                <React.Fragment key={row.id}>
                                    <Table.Tr>
                                        <Table.Th colSpan={3} c={'red'} bg={'#FFDE59'}>
                                            {row.title}
                                        </Table.Th>
                                        <Table.Th colSpan={1} bg={'orange'}></Table.Th>
                                        <Table.Th colSpan={6} bg={'blue'}></Table.Th>
                                        <Table.Th colSpan={6} bg={'green'}></Table.Th>
                                        <Table.Th colSpan={6} bg={'#D68AEB'}></Table.Th>
                                    </Table.Tr>
                                    {row.value && Array.isArray(row.value) && row.value.map((subRow, subRowIndex) => (
                                        <React.Fragment key={`${row.id}-${subRowIndex}`}>
                                            {subRow.subData && subRow.subData.map((tableData, dataIndex) => (
                                                <Table.Tr key={`${subRow.id}-${dataIndex}`}>
                                                    {dataIndex === 0 && (
                                                        <>
                                                            {shouldRenderCell(rowIndex, 'mainCategory') && (
                                                                <Table.Td rowSpan={subRow.subData.length}>{subRow.mainCategory}</Table.Td>
                                                            )}
                                                            {shouldRenderCell(rowIndex, 'mainCategory2') && (
                                                                <Table.Td rowSpan={subRow.subData.length}>{subRow.mainCategory2}</Table.Td>
                                                            )}
                                                        </>
                                                    )}
                                                    <Table.Td ta={'center'}>{tableData.subCategory1}</Table.Td>
                                                    <Table.Td ta={'center'} >
                                                        {/* {tableData.tyTrong} */}
                                                        <NumberInput defaultValue={tableData.tyTrong} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi11} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi12} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi13} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi21} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi22} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi23} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi31} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi32} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi33} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi41} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi42} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi43} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi61} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi62} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi63} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi71} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi72} min={2} max={5} />
                                                    </Table.Td>
                                                    <Table.Td ta={'center'}>
                                                        <NumberInput defaultValue={tableData.Pi73} min={2} max={5} />
                                                    </Table.Td>
                                                </Table.Tr>
                                            ))}
                                        </React.Fragment>
                                    ))}

                                </React.Fragment>
                            );
                        })}


                    </Table.Tbody>
                </Table>

            </ScrollArea>
        </Paper>
    );
}

const data: IEducationYear[] = [
    {
        id: 1,
        title: "NĂM 1 - GIÁO DỤC ĐẠI CƯƠNG VÀ KỸ NĂNG MỀM",
        value: [
            {
                id: 1,
                mainCategory: 'Tiếng Anh thương mại',
                mainCategory2: '1_1',
                subData: [
                    { subCategory1: 'CLO 1-1', tyTrong: '20', Pi11: "2", Pi12: "5", Pi13: "4", Pi21: " ", Pi22: "3", Pi23: "4", Pi31: "2", Pi32: "4", Pi33: "3", Pi41: " ", Pi42: "2", Pi43: "4", Pi61: "3", Pi62: " ", Pi63: "2", Pi71: "4", Pi72: "3", Pi73: " " },
                    { subCategory1: 'CLO 1-2', tyTrong: '15', Pi11: "4", Pi12: " ", Pi13: "3", Pi21: "2", Pi22: "4", Pi23: " ", Pi31: "3", Pi32: "2", Pi33: "4", Pi41: " ", Pi42: "3", Pi43: "2", Pi61: "4", Pi62: " ", Pi63: "3", Pi71: "2", Pi72: "4", Pi73: " " },
                    { subCategory1: 'CLO 1-3', tyTrong: '15', Pi11: "3", Pi12: "4", Pi13: "5", Pi21: " ", Pi22: "2", Pi23: "3", Pi31: "4", Pi32: " ", Pi33: "2", Pi41: "3", Pi42: "4", Pi43: " ", Pi61: "2", Pi62: "3", Pi63: "4", Pi71: " ", Pi72: "2", Pi73: "3" }
                ],

            },
            {
                id: 2,
                mainCategory: 'Tiếng Anh văn phòng',
                mainCategory2: '2_1',
                subData: [
                    { subCategory1: 'CLO 2-1', tyTrong: '10', Pi11: "4", Pi12: "3", Pi13: "2", Pi21: " ", Pi22: "4", Pi23: "3", Pi31: "2", Pi32: " ", Pi33: "4", Pi41: "3", Pi42: "2", Pi43: " ", Pi61: "4", Pi62: "3", Pi63: "2", Pi71: " ", Pi72: "4", Pi73: "3" },
                    { subCategory1: 'CLO 2-2', tyTrong: '10', Pi11: "3", Pi12: " ", Pi13: "5", Pi21: "2", Pi22: "5", Pi23: " ", Pi31: "4", Pi32: "2", Pi33: "3", Pi41: " ", Pi42: "4", Pi43: "2", Pi61: "3", Pi62: " ", Pi63: "4", Pi71: "2", Pi72: "3", Pi73: " " },
                    { subCategory1: 'CLO 2-3', tyTrong: '10', Pi11: "2", Pi12: "4", Pi13: " ", Pi21: "3", Pi22: "2", Pi23: "4", Pi31: " ", Pi32: "3", Pi33: "2", Pi41: "4", Pi42: " ", Pi43: "3", Pi61: "2", Pi62: "4", Pi63: " ", Pi71: "3", Pi72: "2", Pi73: "4" }
                ],

            },
            {
                id: 3,
                mainCategory: 'Văn hóa Anh',
                mainCategory2: '3_1',
                subData: [
                    { subCategory1: 'CLO 3-1', tyTrong: '20', Pi11: "5", Pi12: "2", Pi13: "4", Pi21: " ", Pi22: "3", Pi23: "2", Pi31: "4", Pi32: " ", Pi33: "3", Pi41: "2", Pi42: "4", Pi43: " ", Pi61: "3", Pi62: "4", Pi63: "2", Pi71: " ", Pi72: "3", Pi73: "4" },
                    { subCategory1: 'CLO 3-2', tyTrong: '15', Pi11: "4", Pi12: " ", Pi13: "3", Pi21: "2", Pi22: "4", Pi23: " ", Pi31: "3", Pi32: "2", Pi33: "4", Pi41: " ", Pi42: "3", Pi43: "2", Pi61: "4", Pi62: " ", Pi63: "3", Pi71: "2", Pi72: "4", Pi73: " " },
                    { subCategory1: 'CLO 3-3', tyTrong: '15', Pi11: "2", Pi12: "4", Pi13: "3", Pi21: "5", Pi22: "2", Pi23: "4", Pi31: "3", Pi32: " ", Pi33: "2", Pi41: "4", Pi42: "3", Pi43: " ", Pi61: "2", Pi62: "3", Pi63: "4", Pi71: " ", Pi72: "2", Pi73: "3" }
                ],

            },

        ]
    },
    {
        id: 2,
        title: "NĂM 2 - GIÁO DỤC ĐẠI CƯƠNG VÀ KỸ NĂNG MỀM",
        value: [
            {
                id: 1,
                mainCategory: 'Kinh tế quốc tế',
                mainCategory2: '1_1',
                subData: [
                    { subCategory1: 'CLO 1-1', tyTrong: '10', Pi11: "2", Pi12: "3", Pi13: "4", Pi21: " ", Pi22: "3", Pi23: "4", Pi31: "2", Pi32: "4", Pi33: "3", Pi41: " ", Pi42: "2", Pi43: "4", Pi61: "3", Pi62: " ", Pi63: "2", Pi71: "4", Pi72: "3", Pi73: " " },
                    { subCategory1: 'CLO 1-2', tyTrong: '10', Pi11: "4", Pi12: " ", Pi13: "3", Pi21: "2", Pi22: "4", Pi23: " ", Pi31: "3", Pi32: "2", Pi33: "4", Pi41: " ", Pi42: "3", Pi43: "2", Pi61: "4", Pi62: " ", Pi63: "3", Pi71: "2", Pi72: "4", Pi73: " " },
                    { subCategory1: 'CLO 1-3', tyTrong: '10', Pi11: "3", Pi12: "4", Pi13: "2", Pi21: " ", Pi22: "2", Pi23: "3", Pi31: "4", Pi32: " ", Pi33: "2", Pi41: "3", Pi42: "4", Pi43: " ", Pi61: "2", Pi62: "3", Pi63: "4", Pi71: " ", Pi72: "2", Pi73: "3" }
                ],

            },
            {
                id: 2,
                mainCategory: 'Quản trị kinh doanh',
                mainCategory2: '2_1',
                subData: [
                    { subCategory1: 'CLO 2-1', tyTrong: '20', Pi11: "4", Pi12: "3", Pi13: "2", Pi21: " ", Pi22: "4", Pi23: "3", Pi31: "2", Pi32: " ", Pi33: "4", Pi41: "3", Pi42: "2", Pi43: " ", Pi61: "4", Pi62: "3", Pi63: "2", Pi71: " ", Pi72: "4", Pi73: "3" },
                    { subCategory1: 'CLO 2-2', tyTrong: '15', Pi11: "3", Pi12: " ", Pi13: "4", Pi21: "2", Pi22: "3", Pi23: " ", Pi31: "4", Pi32: "2", Pi33: "3", Pi41: " ", Pi42: "4", Pi43: "2", Pi61: "3", Pi62: " ", Pi63: "4", Pi71: "2", Pi72: "3", Pi73: " " },
                    { subCategory1: 'CLO 2-3', tyTrong: '15', Pi11: "2", Pi12: "4", Pi13: " ", Pi21: "3", Pi22: "2", Pi23: "4", Pi31: " ", Pi32: "3", Pi33: "2", Pi41: "4", Pi42: " ", Pi43: "3", Pi61: "2", Pi62: "4", Pi63: " ", Pi71: "3", Pi72: "2", Pi73: "4" }
                ],

            },
            {
                id: 3,
                mainCategory: 'Văn hóa phương Tây',
                mainCategory2: '3_1',
                subData: [
                    { subCategory1: 'CLO 3-1', tyTrong: '10', Pi11: "3", Pi12: "2", Pi13: "4", Pi21: " ", Pi22: "3", Pi23: "2", Pi31: "4", Pi32: " ", Pi33: "3", Pi41: "2", Pi42: "4", Pi43: " ", Pi61: "3", Pi62: "4", Pi63: "2", Pi71: " ", Pi72: "3", Pi73: "4" },
                    { subCategory1: 'CLO 3-2', tyTrong: '10', Pi11: "4", Pi12: " ", Pi13: "3", Pi21: "2", Pi22: "4", Pi23: " ", Pi31: "3", Pi32: "2", Pi33: "4", Pi41: " ", Pi42: "3", Pi43: "2", Pi61: "4", Pi62: " ", Pi63: "3", Pi71: "2", Pi72: "4", Pi73: " " },
                    { subCategory1: 'CLO 3-3', tyTrong: '10', Pi11: "2", Pi12: "4", Pi13: "3", Pi21: " ", Pi22: "2", Pi23: "4", Pi31: "3", Pi32: " ", Pi33: "2", Pi41: "4", Pi42: "3", Pi43: " ", Pi61: "2", Pi62: "3", Pi63: "4", Pi71: " ", Pi72: "2", Pi73: "3" }
                ],

            }
        ]
    },
    {
        id: 3,
        title: "NĂM 3 - CƠ SỞ NGÀNH VÀ KỸ NĂNG CHUYÊN MÔN",
        value: [
            {
                id: 1,
                mainCategory: 'Kinh tế toàn cầu',
                mainCategory2: '1_1',
                subData: [
                    { subCategory1: 'CLO 1-1', tyTrong: '20', Pi11: "2", Pi12: "3", Pi13: "4", Pi21: " ", Pi22: "3", Pi23: "4", Pi31: "2", Pi32: "4", Pi33: "3", Pi41: " ", Pi42: "2", Pi43: "4", Pi61: "3", Pi62: " ", Pi63: "2", Pi71: "4", Pi72: "3", Pi73: " " },
                    { subCategory1: 'CLO 1-2', tyTrong: '15', Pi11: "4", Pi12: " ", Pi13: "3", Pi21: "2", Pi22: "4", Pi23: " ", Pi31: "3", Pi32: "2", Pi33: "4", Pi41: " ", Pi42: "3", Pi43: "2", Pi61: "4", Pi62: " ", Pi63: "3", Pi71: "2", Pi72: "4", Pi73: " " },
                    { subCategory1: 'CLO 1-3', tyTrong: '15', Pi11: "3", Pi12: "4", Pi13: "2", Pi21: " ", Pi22: "2", Pi23: "3", Pi31: "4", Pi32: " ", Pi33: "2", Pi41: "3", Pi42: "4", Pi43: " ", Pi61: "2", Pi62: "3", Pi63: "4", Pi71: " ", Pi72: "2", Pi73: "3" }
                ],

            },
            {
                id: 2,
                mainCategory: 'Quản trị chiến lược',
                mainCategory2: '2_1',
                subData: [
                    { subCategory1: 'CLO 2-1', tyTrong: '10', Pi11: "4", Pi12: "3", Pi13: "2", Pi21: " ", Pi22: "4", Pi23: "3", Pi31: "2", Pi32: " ", Pi33: "4", Pi41: "3", Pi42: "2", Pi43: " ", Pi61: "4", Pi62: "3", Pi63: "2", Pi71: " ", Pi72: "4", Pi73: "3" },
                    { subCategory1: 'CLO 2-2', tyTrong: '10', Pi11: "3", Pi12: " ", Pi13: "4", Pi21: "2", Pi22: "3", Pi23: " ", Pi31: "4", Pi32: "2", Pi33: "3", Pi41: " ", Pi42: "4", Pi43: "2", Pi61: "3", Pi62: " ", Pi63: "4", Pi71: "2", Pi72: "3", Pi73: " " },
                    { subCategory1: 'CLO 2-3', tyTrong: '10', Pi11: "2", Pi12: "4", Pi13: " ", Pi21: "3", Pi22: "2", Pi23: "4", Pi31: " ", Pi32: "3", Pi33: "2", Pi41: "4", Pi42: " ", Pi43: "3", Pi61: "2", Pi62: "4", Pi63: " ", Pi71: "3", Pi72: "2", Pi73: "4" }
                ],

            },
            {
                id: 3,
                mainCategory: 'Kỹ năng Thuyết trình và Thuyết phục',
                mainCategory2: '3_1',
                subData: [
                    { subCategory1: 'CLO 3-1', tyTrong: '20', Pi11: "3", Pi12: "2", Pi13: "4", Pi21: " ", Pi22: "3", Pi23: "2", Pi31: "4", Pi32: " ", Pi33: "3", Pi41: "2", Pi42: "4", Pi43: " ", Pi61: "3", Pi62: "4", Pi63: "2", Pi71: " ", Pi72: "3", Pi73: "4" },
                    { subCategory1: 'CLO 3-2', tyTrong: '15', Pi11: "4", Pi12: " ", Pi13: "3", Pi21: "2", Pi22: "4", Pi23: " ", Pi31: "3", Pi32: "2", Pi33: "4", Pi41: " ", Pi42: "3", Pi43: "2", Pi61: "4", Pi62: " ", Pi63: "3", Pi71: "2", Pi72: "4", Pi73: " " },
                    { subCategory1: 'CLO 3-3', tyTrong: '15', Pi11: "2", Pi12: "4", Pi13: "3", Pi21: " ", Pi22: "2", Pi23: "4", Pi31: "3", Pi32: " ", Pi33: "2", Pi41: "4", Pi42: "3", Pi43: " ", Pi61: "2", Pi62: "3", Pi63: "4", Pi71: " ", Pi72: "2", Pi73: "3" }
                ],

            }
        ]
    },
    {
        id: 4,
        title: "NĂM 4 - CHUYÊN NGÀNH VÀ KỸ NĂNG CHUYÊN MÔN",
        value: [
            {
                id: 1,
                mainCategory: 'Văn hóa Kinh doanh Quốc tế',
                mainCategory2: '1_1',
                subData: [
                    { subCategory1: 'CLO 1-1', tyTrong: '10', Pi11: "2", Pi12: "3", Pi13: "4", Pi21: " ", Pi22: "3", Pi23: "4", Pi31: "2", Pi32: "4", Pi33: "3", Pi41: " ", Pi42: "2", Pi43: "4", Pi61: "3", Pi62: " ", Pi63: "2", Pi71: "4", Pi72: "3", Pi73: " " },
                    { subCategory1: 'CLO 1-2', tyTrong: '10', Pi11: "4", Pi12: " ", Pi13: "3", Pi21: "2", Pi22: "4", Pi23: " ", Pi31: "3", Pi32: "2", Pi33: "4", Pi41: " ", Pi42: "3", Pi43: "2", Pi61: "4", Pi62: " ", Pi63: "3", Pi71: "2", Pi72: "4", Pi73: " " },
                    { subCategory1: 'CLO 1-3', tyTrong: '10', Pi11: "3", Pi12: "4", Pi13: "2", Pi21: " ", Pi22: "2", Pi23: "3", Pi31: "4", Pi32: " ", Pi33: "2", Pi41: "3", Pi42: "4", Pi43: " ", Pi61: "2", Pi62: "3", Pi63: "4", Pi71: " ", Pi72: "2", Pi73: "3" }
                ],

            },
            {
                id: 2,
                mainCategory: 'Tiếng Anh văn phòng',
                mainCategory2: '2_1',
                subData: [
                    { subCategory1: 'CLO 2-1', tyTrong: '20', Pi11: "4", Pi12: "3", Pi13: "2", Pi21: " ", Pi22: "4", Pi23: "3", Pi31: "2", Pi32: " ", Pi33: "4", Pi41: "3", Pi42: "2", Pi43: " ", Pi61: "4", Pi62: "3", Pi63: "2", Pi71: " ", Pi72: "4", Pi73: "3" },
                    { subCategory1: 'CLO 2-2', tyTrong: '15', Pi11: "3", Pi12: " ", Pi13: "4", Pi21: "2", Pi22: "3", Pi23: " ", Pi31: "4", Pi32: "2", Pi33: "3", Pi41: " ", Pi42: "4", Pi43: "2", Pi61: "3", Pi62: " ", Pi63: "4", Pi71: "2", Pi72: "3", Pi73: " " },
                    { subCategory1: 'CLO 2-3', tyTrong: '15', Pi11: "2", Pi12: "4", Pi13: " ", Pi21: "3", Pi22: "2", Pi23: "4", Pi31: " ", Pi32: "3", Pi33: "2", Pi41: "4", Pi42: " ", Pi43: "3", Pi61: "2", Pi62: "4", Pi63: " ", Pi71: "3", Pi72: "2", Pi73: "4" }
                ],

            },
            {
                id: 3,
                mainCategory: 'Marketing Quốc tế',
                mainCategory2: '3_1',
                subData: [
                    { subCategory1: 'CLO 3-1', tyTrong: '10', Pi11: "3", Pi12: "2", Pi13: "4", Pi21: " ", Pi22: "3", Pi23: "2", Pi31: "4", Pi32: " ", Pi33: "3", Pi41: "2", Pi42: "4", Pi43: " ", Pi61: "3", Pi62: "4", Pi63: "2", Pi71: " ", Pi72: "3", Pi73: "4" },
                    { subCategory1: 'CLO 3-2', tyTrong: '10', Pi11: "4", Pi12: " ", Pi13: "3", Pi21: "2", Pi22: "4", Pi23: " ", Pi31: "3", Pi32: "2", Pi33: "4", Pi41: " ", Pi42: "3", Pi43: "2", Pi61: "4", Pi62: " ", Pi63: "3", Pi71: "2", Pi72: "4", Pi73: " " },
                    { subCategory1: 'CLO 3-3', tyTrong: '10', Pi11: "2", Pi12: "4", Pi13: "3", Pi21: " ", Pi22: "2", Pi23: "4", Pi31: "3", Pi32: " ", Pi33: "2", Pi41: "4", Pi42: "3", Pi43: " ", Pi61: "2", Pi62: "3", Pi63: "4", Pi71: " ", Pi72: "2", Pi73: "3" }
                ],

            }
        ]
    },

];
