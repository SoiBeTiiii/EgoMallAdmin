'use client';

import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Button, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_uizlrvwfpd_Delete from "./F_uizlrvwfpd_Delete";

// Interface for your data
export interface I_uizlrvwfpd_Read {
    id: number;
    programName: string;
    ploCount: number;
    sampleSubjectsHK1: number;
    sampleSubjectsHK2: number;
    targetAchieved: number;
    notes: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

// Mock data fetch function using react-query
const useFetchPLOData = () => {
    return useQuery<I_uizlrvwfpd_Read[]>({
        queryKey: ['fetchPLOData'],
        queryFn: async () => [
            {
                id: 1,
                programName: "Tiếng Anh thương mại",
                ploCount: 5,
                sampleSubjectsHK1: 3,
                sampleSubjectsHK2: 2,
                targetAchieved: 75,
                notes: "AUN_QA",
                nguoiCapNhat: 'Admin',
                ngayCapNhat: new Date('2024-12-20'),
            },
        ], // Replace with actual API call
    });
};

export default function F_uizlrvwfpd_Read() {
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    const { data, isLoading, isError } = useFetchPLOData();
    const [editingRow, setEditingRow] = useState<Set<number>>(new Set());

    const addNewRow = () => {
        if (!data) return; // Ensure data is not undefined
        const newRow: I_uizlrvwfpd_Read = {
            id: data.length + 1,
            programName: "",
            ploCount: 0,
            sampleSubjectsHK1: 0,
            sampleSubjectsHK2: 0,
            targetAchieved: 0,
            notes: "",
            nguoiCapNhat: "",
            ngayCapNhat: new Date(Date.now())

        };
        setEditingRow((prevEditing) => new Set([...prevEditing, data.length]));
    };

    const updateRowValue = (
        index: number,
        key: keyof I_uizlrvwfpd_Read,
        value: string | number
    ) => {
        if (!data) return;

        const updatedData = data.map((row, i) =>
            i === index ? { ...row, [key]: value } : row
        );

        console.log("Updated Data:", updatedData); // Simulate data update (this is where you'd typically make a PUT/POST request)
    };

    const toggleEditRow = (index: number) => {
        setEditingRow((prevEditing) => {
            const newEditing = new Set(prevEditing);
            if (newEditing.has(index)) {
                newEditing.delete(index);
            } else {
                newEditing.add(index);
            }
            return newEditing;
        });
    };

    const columns = useMemo<MRT_ColumnDef<I_uizlrvwfpd_Read>[]>(() => [
        {
            header: "Chương trình",
            accessorKey: "programName",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <Select
                        value={cell.getValue<string>() || ""}
                        onChange={(value) =>
                            updateRowValue(row.index, "programName", value ?? "")
                        }
                        data={["Tiếng Anh thương mại", "Quản trị kinh doanh", "Công nghệ thông tin"]}
                    />
                ) : (
                    <div
                        onClick={() => toggleEditRow(row.index)}
                        style={{ cursor: "pointer" }}
                    >
                        {cell.getValue<string>()}
                    </div>
                ),
        },
        {
            header: "Số lượng PLO cần đo",
            accessorKey: "ploCount",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <TextInput
                        type="number"
                        value={cell.getValue<number>().toString()}
                        onChange={(e) =>
                            updateRowValue(row.index, "ploCount", Number(e.target.value))
                        }
                    />
                ) : (
                    <div
                        onClick={() => toggleEditRow(row.index)}
                        style={{ cursor: "pointer" }}
                    >
                        {cell.getValue<number>()}
                    </div>
                ),
        },
        {
            header: "Số môn học lấy mẫu HK1",
            accessorKey: "sampleSubjectsHK1",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <TextInput
                        type="number"
                        value={cell.getValue<number>().toString()}
                        onChange={(e) =>
                            updateRowValue(row.index, "sampleSubjectsHK1", Number(e.target.value))
                        }
                    />
                ) : (
                    <div
                        onClick={() => toggleEditRow(row.index)}
                        style={{ cursor: "pointer" }}
                    >
                        {cell.getValue<number>()}
                    </div>
                ),
        },
        {
            header: "Số môn học lấy mẫu HK2",
            accessorKey: "sampleSubjectsHK2",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <TextInput
                        type="number"
                        value={cell.getValue<number>().toString()}
                        onChange={(e) =>
                            updateRowValue(row.index, "sampleSubjectsHK2", Number(e.target.value))
                        }
                    />
                ) : (
                    <div
                        onClick={() => toggleEditRow(row.index)}
                        style={{ cursor: "pointer" }}
                    >
                        {cell.getValue<number>()}
                    </div>
                ),
        },
        {
            header: "Chỉ tiêu % cần đạt",
            accessorKey: "targetAchieved",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <Select
                        value={cell.getValue<number>().toString() || ""}
                        onChange={(value) =>
                            updateRowValue(
                                row.index,
                                "targetAchieved",
                                Number(value ?? "0")
                            )
                        }
                        data={["50", "60", "75", "90"]}
                    />
                ) : (
                    <div
                        onClick={() => toggleEditRow(row.index)}
                        style={{ cursor: "pointer" }}
                    >
                        {cell.getValue<number>()}
                    </div>
                ),
        },
        {
            header: "Ghi chú",
            accessorKey: "notes",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <Select
                        value={cell.getValue<string>() || ""}
                        onChange={(value) =>
                            updateRowValue(row.index, "notes", value ?? "")
                        }
                        data={["AUN_QA", "Internal", "External"]}
                    />
                ) : (
                    <div
                        onClick={() => toggleEditRow(row.index)}
                        style={{ cursor: "pointer" }}
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
    ], [editingRow]);

    return (
        <div>
            <MyFlexRow style={{ marginBottom: "16px" }}>
                <Select
                    w="30%"
                    label="Chọn Khoa"
                    data={["Kinh tế", "Công nghệ thông tin", "Ngoại ngữ"]}
                    defaultValue="Kinh tế"
                />
                <Select
                    w="30%"
                    label="Năm chọn đo"
                    data={["2023-2024", "2024-2025", "2025-2026"]}
                    defaultValue="2023-2024"
                />
            </MyFlexRow>
            <MyDataTable
                columns={columns}
                data={data || []}
                exportAble
                enableRowSelection
                renderRowActions={({ row }) => (
                    <F_uizlrvwfpd_Delete id={row.original.id!} />
                )}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <Button onClick={addNewRow}>Thêm</Button>
                        <Button> Lưu </Button>
                        <AQButtonCreateByImportFile
                            setImportedData={() => { }}
                            form={form_multiple}
                            onSubmit={() => {
                                console.log(form_multiple.values);
                            }}
                        >
                            Import
                        </AQButtonCreateByImportFile>
                    </Group>
                )}
            />
        </div>
    );
}
