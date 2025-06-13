'use client';

import AQButtonCreateByImportFile from '@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Group, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import F_iskqrugrpy_Create from './F_iskqrugrpy_Create';
import F_iskqrugrpy_Delete from './F_iskqrugrpy_Delete';

export interface I_iskqrugrpy_Read {
    id?: number;
    department?: string;
    course?: string;
    plo?: string;
    ploName?: string;
    courseCode?: string;
    courseName?: string;
    manageUnit?: string;
    measureUnit?: string;
    measureCycle?: string;
    contribution?: string;
    performance?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

// Mock data query
const useFetchCourseMeasurementData = () => {
    return useQuery<I_iskqrugrpy_Read[]>({
        queryKey: ['F_iskqrugrpy_Read'],
        queryFn: async () => [
            {
                id: 1,
                department: 'Ngoại ngữ',
                course: 'TATM24',
                plo: 'PLO001',
                ploName: 'Hiểu kiến thức nền tảng',
                courseCode: 'TATM',
                courseName: 'Tiếng Anh thương mại',
                manageUnit: 'Khoa Ngoại ngữ',
                measureUnit: 'Phòng Kiêm định chất lượng',
                measureCycle: '2 năm',
                contribution: '10%',
                performance: '60%',
                nguoiCapNhat: 'Admin',
                ngayCapNhat: new Date('2024-12-20'),
            },
        ],
    });
};

export default function F_iskqrugrpy_Read() {
    const { data: fetchedData, isLoading, isError } = useFetchCourseMeasurementData();
    const [data, setData] = useState<I_iskqrugrpy_Read[]>([]); // Local editable state
    const [editingRow, setEditingRow] = useState<Set<number>>(new Set());

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    useEffect(() => {
        if (fetchedData) setData(fetchedData);
    }, [fetchedData]);

    const updateRowValue = (index: number, key: keyof I_iskqrugrpy_Read, value: any) => {
        setData((prevData) =>
            prevData.map((row, i) => {
                if (i === index) {
                    const newValue =
                        key === 'contribution' || key === 'performance'
                            ? `${Number(value)}%` // Add percentage symbol for numeric fields
                            : value;
                    return { ...row, [key]: newValue };
                }
                return row;
            })
        );
    };

    const toggleEditRow = (index: number) => {
        setEditingRow((prevEditing) => {
            const newEditing = new Set(prevEditing);
            if (newEditing.has(index)) {
                newEditing.delete(index); // Exit edit mode
            } else {
                newEditing.add(index); // Enter edit mode
            }
            return newEditing;
        });
    };

    const columns = useMemo<MRT_ColumnDef<I_iskqrugrpy_Read>[]>(
        () => [
            { header: 'Khoa', accessorKey: 'department' },
            { header: 'Khóa', accessorKey: 'course' },
            { header: 'PLO', accessorKey: 'plo' },
            { header: 'Tên PLO', accessorKey: 'ploName' },
            { header: 'Mã môn học', accessorKey: 'courseCode' },
            { header: 'Tên môn học', accessorKey: 'courseName' },
            {
                header: 'Đơn vị quản lý',
                accessorKey: 'manageUnit',
                Cell: ({ cell, row }) =>
                    editingRow.has(row.index) ? (
                        <TextInput
                            value={cell.getValue<string>() || ''}
                            onChange={(e) => updateRowValue(row.index, 'manageUnit', e.target.value)}
                        />
                    ) : (
                        <div
                            onClick={() => toggleEditRow(row.index)}
                            style={{ cursor: 'pointer' }}
                        >
                            {cell.getValue<string>()}
                        </div>
                    ),
            },
            {
                header: 'Đơn vị đo lường',
                accessorKey: 'measureUnit',
                Cell: ({ cell, row }) =>
                    editingRow.has(row.index) ? (
                        <TextInput
                            value={cell.getValue<string>() || ''}
                            onChange={(e) =>
                                updateRowValue(row.index, 'measureUnit', e.target.value)
                            }
                        />
                    ) : (
                        <div
                            onClick={() => toggleEditRow(row.index)}
                            style={{ cursor: 'pointer' }}
                        >
                            {cell.getValue<string>()}
                        </div>
                    ),
            },
            {
                header: 'Trọng số đóng góp',
                accessorKey: 'contribution',
                Cell: ({ cell, row }) =>
                    editingRow.has(row.index) ? (
                        <TextInput
                            type='number'
                            value={cell.getValue<string>().replace('%', '') || ''}
                            onChange={(e) =>
                                updateRowValue(row.index, 'contribution', e.target.value)
                            }
                        />
                    ) : (
                        <div
                            onClick={() => toggleEditRow(row.index)}
                            style={{ cursor: 'pointer' }}
                        >
                            {cell.getValue<string>()}
                        </div>
                    ),
            },
            {
                header: 'Chỉ số thực hiện',
                accessorKey: 'performance',
                Cell: ({ cell, row }) =>
                    editingRow.has(row.index) ? (
                        <TextInput
                            type='number'
                            value={cell.getValue<string>().replace('%', '') || ''}
                            onChange={(e) =>
                                updateRowValue(row.index, 'performance', e.target.value)
                            }
                        />
                    ) : (
                        <div
                            onClick={() => toggleEditRow(row.index)}
                            style={{ cursor: 'pointer' }}
                        >
                            {cell.getValue<string>()}
                        </div>
                    ),
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat",
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },
            }

        ],
        [editingRow]
    );

    if (isLoading) return <Text>Đang tải dữ liệu...</Text>;
    if (isError) return <Text>Không có dữ liệu...</Text>;

    function setImportData(data: any): void {
        throw new Error('Function not implemented.');
    }

    return (
        <MyDataTable
            exportAble
            enableRowSelection
            enableRowNumbers
            columns={columns}
            data={data}
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <F_iskqrugrpy_Create />
                    <AQButtonCreateByImportFile
                        setImportedData={setImportData}
                        form={form_multiple}
                        onSubmit={() => {
                            console.log(form_multiple.values);
                        }}
                    >
                        Import
                    </AQButtonCreateByImportFile>
                </Group>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <F_iskqrugrpy_Delete id={row.original.id!} />
                </MyCenterFull>
            )}
        />
    );
}
