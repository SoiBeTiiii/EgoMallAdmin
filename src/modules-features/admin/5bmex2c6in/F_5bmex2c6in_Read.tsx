"use client";
import { MyButton } from '@/components/Buttons/Button/MyButton';
import AQButtonCreateByImportFile from '@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile';
import AQButtonExportData from '@/components/Buttons/ButtonCRUD/AQButtonExportData';
import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow';
import { Button, Checkbox, Fieldset, ScrollArea, Select, Table } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
interface ISubData {
    pi11: number;
    pi12: number;
    pi13: number;
    dtb1: number;
    review1: string;
    pi21: number;
    pi22: number;
    dtb2: number;
    review2: string;
    pi31: number;
    pi32: number;
    pi33: number;
    dtb3: number;
    review3: string;
    pi41: number;
    dtb4: number;
    review4: string;
}
interface IStudent {
    id?: number //STT
    code?: string //Mã sinh viên
    name?: string //Họ tên
    dateOfBirth?: Date | undefined //Ngày sinh
    subData: ISubData;
}

export default function F_5bmex2c6in_Read() {
    const { data: students = [] } = useQuery<IStudent[]>({
        queryKey: [`F_5bmex2c6in_Read`],
        queryFn: async () => data,
    });

    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });
    // State để kiểm soát check all
    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState<boolean[]>(
        new Array(students.length).fill(false)
    );

    // Xử lý khi click vào ô checkbox tổng
    const handleCheckAll = (checked: boolean) => {
        setCheckedAll(checked);
        setCheckedItems(new Array(students.length).fill(checked));
    };

    // Xử lý khi click vào từng checkbox con
    const handleCheckItem = (index: number, checked: boolean) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = checked;
        setCheckedItems(updatedCheckedItems);

        // Nếu tất cả checkbox con đều được check -> check vào checkbox chính
        setCheckedAll(updatedCheckedItems.every((item) => item));
    };

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "code", header: "Mã sinh viên" },
            { fieldName: "name", header: "Họ tên" },
            { fieldName: "dateOfBirth", header: "Ngày sinh" },
            { fieldName: "pi11", header: "Pi1.1" },
            { fieldName: "pi12", header: "Pi1.2" },
            { fieldName: "pi13", header: "Pi1.3" },
            { fieldName: "dtb1", header: "Điểm trung bình" },
            { fieldName: "review1", header: "Mức đánh giá" },
            { fieldName: "pi21", header: "Pi2.1" },
            { fieldName: "pi22", header: "Pi2.2" },
            { fieldName: "dtb2", header: "Điểm trung bình " },
            { fieldName: "review2", header: "Mức đánh giá" },
            { fieldName: "pi31", header: "Pi3.1" },
            { fieldName: "pi32", header: "Pi3.2" },
            { fieldName: "pi33", header: "Pi3.3" },
            { fieldName: "dtb3", header: "Điểm trung bình" },
            { fieldName: "review3", header: "Mức đánh giá" },
            { fieldName: "pi41", header: "Pi4.1" },
            { fieldName: "dtb4", header: "Điểm trung bình" },
            { fieldName: "review4", header: "Mức đánh giá" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    return (
        // <Paper style={{ overflowX: 'auto', marginLeft: '10px' }}>
        <>
            <MyFlexRow style={{ marginLeft: '10px', marginBottom: '20px' }}>
                <Select
                    w="30%"
                    label="Chương trình"
                    data={[
                        { value: "1", label: "Kế toán" }
                    ]}
                    defaultValue={1?.toString()}
                />
                <Select
                    w="30%"
                    label="Khóa"
                    data={[
                        { value: "1", label: "Kế toán khóa 15" }
                    ]}
                    defaultValue={1?.toString()}
                />
            </MyFlexRow>
            
            <Fieldset legend={`Kết quả đánh giá mức độ đạt chuẩn đầu ra chương trình đào tạo của người học`}>
            <MyFlexRow style={{ marginLeft: '10px', marginBottom: '20px' }}>
                <MyButton crudType="create">Thêm</MyButton>
                <AQButtonCreateByImportFile
                    setImportedData={setFileData}
                    onSubmit={() => {
                        console.log("Dữ liệu đã nhập:", fileData);
                    }}
                    form={form_multiple}
                />
                <AQButtonExportData
                    isAllData={true}
                    objectName="dsPLO"
                    data={data}
                    exportConfig={exportConfig}
                />
                <Button color="red" leftSection={<IconTrash />}>
                    Xóa
                </Button>
            </MyFlexRow>
                <ScrollArea w={"100%"}>
                    <Table style={{ marginLeft: '10px' }} withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th rowSpan={3}><Checkbox checked={checkedAll}
                                    onChange={(event) => handleCheckAll(event.currentTarget.checked)} /></Table.Th>
                                <Table.Th colSpan={1} rowSpan={3}>STT</Table.Th>
                                <Table.Th colSpan={1} rowSpan={3}>Mã sinh vien</Table.Th>
                                <Table.Th colSpan={1} rowSpan={3}>Họ tên</Table.Th>
                                <Table.Th colSpan={1} rowSpan={3}>Ngày sinh</Table.Th>
                                <Table.Th colSpan={17} rowSpan={1} style={{ textAlign: 'center', border: '1px solid #ddd' }}>Mức đạt PLO và chỉ số Pis</Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th rowSpan={1} colSpan={5} ta={'center'}>PLO1</Table.Th>
                                <Table.Th rowSpan={1} colSpan={4} ta={'center'}>PLO2</Table.Th>
                                <Table.Th rowSpan={1} colSpan={5} ta={'center'}>PLO3</Table.Th>
                                <Table.Th rowSpan={1} colSpan={3} ta={'center'}>PLO4</Table.Th>
                            </Table.Tr>
                            <Table.Tr>

                                <Table.Th ta={'center'}>PI1.1</Table.Th>
                                <Table.Th ta={'center'}>PI1.2</Table.Th>
                                <Table.Th ta={'center'}>PI1.3</Table.Th>
                                <Table.Th ta={'center'}>Điểm TB</Table.Th>
                                <Table.Th ta={'center'}>Mức đánh giá</Table.Th>
                                <Table.Th ta={'center'}>PI2.1</Table.Th>
                                <Table.Th ta={'center'}>PI2.2</Table.Th>
                                <Table.Th ta={'center'}>Điểm TB</Table.Th>
                                <Table.Th ta={'center'}>Mức đánh giá</Table.Th>
                                <Table.Th ta={'center'}>PI3.1</Table.Th>
                                <Table.Th ta={'center'}>PI3.2</Table.Th>
                                <Table.Th ta={'center'}>PI3.3</Table.Th>
                                <Table.Th ta={'center'}>Điểm TB</Table.Th>
                                <Table.Th ta={'center'}>Mức đánh giá</Table.Th>
                                <Table.Th ta={'center'}>PI4.1</Table.Th>
                                <Table.Th ta={'center'}>Điểm TB</Table.Th>
                                <Table.Th ta={'center'}>Mức đánh giá</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {data.map((row, rowIndex) => {
                                return (
                                    <React.Fragment key={row.id}>
                                        <Table.Tr>
                                            <Table.Td><Checkbox checked={checkedItems[rowIndex]}
                                                onChange={(event) => handleCheckItem(rowIndex, event.currentTarget.checked)} /></Table.Td>
                                            <Table.Td>{row.id}</Table.Td>
                                            <Table.Td>{row.code}</Table.Td>
                                            <Table.Td>{row.name}</Table.Td>
                                            <Table.Td>{row.dateOfBirth?.toLocaleDateString()}</Table.Td>
                                            <Table.Td>{row.subData.pi11}</Table.Td>
                                            <Table.Td>{row.subData.pi12}</Table.Td>
                                            <Table.Td>{row.subData.pi13}</Table.Td>
                                            <Table.Td>{row.subData.dtb1}</Table.Td>
                                            <Table.Td>{row.subData.review1}</Table.Td>
                                            <Table.Td>{row.subData.pi21}</Table.Td>
                                            <Table.Td>{row.subData.pi22}</Table.Td>
                                            <Table.Td>{row.subData.dtb2}</Table.Td>
                                            <Table.Td>{row.subData.review2}</Table.Td>
                                            <Table.Td>{row.subData.pi31}</Table.Td>
                                            <Table.Td>{row.subData.pi32}</Table.Td>
                                            <Table.Td>{row.subData.pi33}</Table.Td>
                                            <Table.Td>{row.subData.dtb3}</Table.Td>
                                            <Table.Td>{row.subData.review3}</Table.Td>
                                            <Table.Td>{row.subData.pi41}</Table.Td>
                                            <Table.Td>{row.subData.dtb4}</Table.Td>
                                            <Table.Td>{row.subData.review4}</Table.Td>
                                        </Table.Tr>
                                    </React.Fragment>
                                )
                            })}
                        </Table.Tbody>
                    </Table>
                </ScrollArea>
            </Fieldset>
        </>

    )
}
const data = [
    {
        id: 1,
        code: "SV000001",
        name: "Tô Ngọc Lâ",
        dateOfBirth: new Date("2000-02-01"),
        subData: {
            pi11: 6.5,
            pi12: 8.5,
            pi13: 7.3,
            dtb1: 7.8,
            review1: "Khá",
            pi21: 8.2,
            pi22: 8.1,
            dtb2: 8.1,
            review2: "Giỏi",
            pi31: 7.2,
            pi32: 7.5,
            pi33: 7.4,
            dtb3: 7.4,
            review3: "khá",
            pi41: 5.9,
            dtb4: 5.9,
            review4: "Đạt",
        }
    },
    {
        id: 2,
        code: "SV000002",
        name: "Tô Ngọc Lim",
        dateOfBirth: new Date("2000-02-01"),
        subData: {
            pi11: 6.5,
            pi12: 8.5,
            pi13: 7.3,
            dtb1: 7.8,
            review1: "Khá",
            pi21: 8.2,
            pi22: 8.1,
            dtb2: 8.1,
            review2: "Giỏi",
            pi31: 7.2,
            pi32: 7.5,
            pi33: 7.4,
            dtb3: 7.4,
            review3: "khá",
            pi41: 5.9,
            dtb4: 5.9,
            review4: "Đạt",
        }
    },
    {
        id: 3,
        code: "SV000003",
        name: "Tô Ngọc Li",
        dateOfBirth: new Date("2000-02-01"),
        subData: {
            pi11: 6.5,
            pi12: 8.5,
            pi13: 7.3,
            dtb1: 7.8,
            review1: "Khá",
            pi21: 8.2,
            pi22: 8.1,
            dtb2: 8.1,
            review2: "Giỏi",
            pi31: 7.2,
            pi32: 7.5,
            pi33: 7.4,
            dtb3: 7.4,
            review3: "khá",
            pi41: 5.9,
            dtb4: 5.9,
            review4: "Đạt",
        }
    },
    {
        id: 4,
        code: "SV000004",
        name: "Tô Ngọc Ly",
        dateOfBirth: new Date("2000-02-01"),
        subData: {
            pi11: 6.5,
            pi12: 8.5,
            pi13: 7.3,
            dtb1: 7.8,
            review1: "Khá",
            pi21: 8.2,
            pi22: 8.1,
            dtb2: 8.1,
            review2: "Giỏi",
            pi31: 7.2,
            pi32: 7.5,
            pi33: 7.4,
            dtb3: 7.4,
            review3: "khá",
            pi41: 5.9,
            dtb4: 5.9,
            review4: "Đạt",
        }
    },
    {
        id: 5,
        code: "SV000005",
        name: "Tô Ngọc Lê",
        dateOfBirth: new Date("2000-02-01"),
        subData: {
            pi11: 6.5,
            pi12: 8.5,
            pi13: 7.3,
            dtb1: 7.8,
            review1: "Khá",
            pi21: 8.2,
            pi22: 8.1,
            dtb2: 8.1,
            review2: "Giỏi",
            pi31: 7.2,
            pi32: 7.5,
            pi33: 7.4,
            dtb3: 7.4,
            review3: "khá",
            pi41: 5.9,
            dtb4: 5.9,
            review4: "Đạt",
        }
    },
    {
        id: 6,
        code: "SV000006",
        name: "Tô Ngọc Liu",
        dateOfBirth: new Date("2000-02-01"),
        subData: {
            pi11: 6.5,
            pi12: 8.5,
            pi13: 7.3,
            dtb1: 7.8,
            review1: "Khá",
            pi21: 8.2,
            pi22: 8.1,
            dtb2: 8.1,
            review2: "Giỏi",
            pi31: 7.2,
            pi32: 7.5,
            pi33: 7.4,
            dtb3: 7.4,
            review3: "khá",
            pi41: 5.9,
            dtb4: 5.9,
            review4: "Đạt",
        }
    },
    {
        id: 7,
        code: "SV000007",
        name: "Tô Ngọc A",
        dateOfBirth: new Date("2000-02-01"),
        subData: {
            pi11: 6.5,
            pi12: 8.5,
            pi13: 7.3,
            dtb1: 7.8,
            review1: "Khá",
            pi21: 8.2,
            pi22: 8.1,
            dtb2: 8.1,
            review2: "Giỏi",
            pi31: 7.2,
            pi32: 7.5,
            pi33: 7.4,
            dtb3: 7.4,
            review3: "khá",
            pi41: 5.9,
            dtb4: 5.9,
            review4: "Đạt",
        }
    },
    {
        id: 8,
        code: "SV000008",
        name: "Tô Ngọc Cê",
        dateOfBirth: new Date("2000-02-01"),
        subData: {
            pi11: 6.5,
            pi12: 8.5,
            pi13: 7.3,
            dtb1: 7.8,
            review1: "Khá",
            pi21: 8.2,
            pi22: 8.1,
            dtb2: 8.1,
            review2: "Giỏi",
            pi31: 7.2,
            pi32: 7.5,
            pi33: 7.4,
            dtb3: 7.4,
            review3: "khá",
            pi41: 5.9,
            dtb4: 5.9,
            review4: "Đạt",
        }
    },
    {
        id: 9,
        code: "SV000009",
        name: "Tô Ngọc Tô",
        dateOfBirth: new Date("2000-02-01"),
        subData: {
            pi11: 6.5,
            pi12: 8.5,
            pi13: 7.3,
            dtb1: 7.8,
            review1: "Khá",
            pi21: 8.2,
            pi22: 8.1,
            dtb2: 8.1,
            review2: "Giỏi",
            pi31: 7.2,
            pi32: 7.5,
            pi33: 7.4,
            dtb3: 7.4,
            review3: "khá",
            pi41: 5.9,
            dtb4: 5.9,
            review4: "Đạt",
        }
    },
    {
        id: 10,
        code: "SV0000010",
        name: "Tô Ngọc Li",
        dateOfBirth: new Date("2000-02-01"),
        subData: {
            pi11: 6.5,
            pi12: 8.5,
            pi13: 7.3,
            dtb1: 7.8,
            review1: "Khá",
            pi21: 8.2,
            pi22: 8.1,
            dtb2: 8.1,
            review2: "Giỏi",
            pi31: 7.2,
            pi32: 7.5,
            pi33: 7.4,
            dtb3: 7.4,
            review3: "khá",
            pi41: 5.9,
            dtb4: 5.9,
            review4: "Đạt",
        }
    },
    {
        id: 11,
        code: "SV0000011",
        name: "Tô Ngọc Tim",
        dateOfBirth: new Date("2000-02-01"),
        subData: {
            pi11: 6.5,
            pi12: 8.5,
            pi13: 7.3,
            dtb1: 7.8,
            review1: "Khá",
            pi21: 8.2,
            pi22: 8.1,
            dtb2: 8.1,
            review2: "Giỏi",
            pi31: 7.2,
            pi32: 7.5,
            pi33: 7.4,
            dtb3: 7.4,
            review3: "khá",
            pi41: 5.9,
            dtb4: 5.9,
            review4: "Đạt",
        }
    },
    {
        id: 12,
        code: "SV0000021",
        name: "Tô Ngọc Tân",
        dateOfBirth: new Date("2000-02-01"),
        subData: {
            pi11: 6.5,
            pi12: 8.5,
            pi13: 7.3,
            dtb1: 7.8,
            review1: "Khá",
            pi21: 8.2,
            pi22: 8.1,
            dtb2: 8.1,
            review2: "Giỏi",
            pi31: 7.2,
            pi32: 7.5,
            pi33: 7.4,
            dtb3: 7.4,
            review3: "khá",
            pi41: 5.9,
            dtb4: 5.9,
            review4: "Đạt",
        }
    }
]