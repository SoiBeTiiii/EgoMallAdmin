'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Group, Select, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { MRT_Cell, MRT_ColumnDef, MRT_Row } from "mantine-react-table";
import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import F_xeytjwnrql_Delete from "./F_xeytjwnrql_Delete";

export interface I_xeytjwnrql_Read {
    id?: number;
    courseCode?: string;
    clo?: string;
    description?: string;
    tyTrong?: number;
    plo1?: number;
    plo2?: number;
    plo3?: number;
    plo4?: number;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

// Data Fetching Hook
const useFetchCLOData = () => {
    return useQuery<I_xeytjwnrql_Read[]>({
        queryKey: ['fetchCLOData'],
        queryFn: async () => [
            {
                id: 1,
                courseCode: "CS101",
                clo: "CLO1",
                description: "Hiểu các khái niệm lập trình cơ bản.",
                plo1: 1,
                plo2: 1,
                plo3: 2,
                plo4: 1,
                tyTrong: 20,
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 2,
                courseCode: "CS101",
                clo: "CLO2",
                description: "Áp dụng thuật toán để giải quyết vấn đề.",
                plo1: 3,
                plo2: 5,
                plo3: 1,
                plo4: 4,
                tyTrong: 15,
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 3,
                courseCode: "MAT202",
                clo: "CLO1",
                description: "Hiểu các nguyên lý toán rời rạc.",
                plo1: 5,
                plo2: 1,
                plo3: 1,
                plo4: 5,
                tyTrong: 15,
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 4,
                courseCode: "PHY301",
                clo: "CLO1",
                description: "Phân tích các vấn đề vật lý cơ bản.",
                plo1: 1,
                plo2: 5,
                plo3: 4,
                plo4: 1,
                tyTrong: 10,
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 5,
                courseCode: "BIO503",
                clo: "CLO1",
                description: "Hiểu các khái niệm cơ bản về sinh học phân tử.",
                plo1: 5,
                plo2: 5,
                plo3: 1,
                plo4: 5,
                tyTrong: 10,
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
        ],
    });
};

export default function F_xeytjwnrql_Read() {
    const { data: fetchedData = [], isLoading, isError } = useFetchCLOData();
    const [data, setData] = useState<I_xeytjwnrql_Read[]>([]);

    // Update `data` when `fetchedData` changes
    useEffect(() => {
        setData(fetchedData);
    }, [fetchedData]);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const [editingRow, setEditingRow] = useState<Set<number>>(new Set());

    const updateRowValue = (index: number, key: keyof I_xeytjwnrql_Read, value: any) => {
        setData((prevData) =>
            prevData.map((row, i) =>
                i === index ? { ...row, [key]: value } : row
            )
        );
    };

    const handleAddRow = () => {
        const newRow: I_xeytjwnrql_Read = {
            id: data.length + 1,
            courseCode: "",
            clo: "",
            description: "",
            plo1: 0,
            plo2: 0,
            plo3: 0,
            plo4: 0,
            tyTrong: 0,
            nguoiCapNhat:"",
            ngayCapNhat:new Date(),
        };
        setData((prevData) => [...prevData, newRow]);
        setEditingRow((prevEditing) => new Set([...prevEditing, data.length]));
    };

    const columns = useMemo<MRT_ColumnDef<I_xeytjwnrql_Read>[]>(() => [
        {
            header: "Mã môn học",
            accessorKey: "courseCode",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <TextInput
                        value={cell.getValue<string>() || ""}
                        onChange={(e) => updateRowValue(row.index, "courseCode", e.target.value)}
                    />
                ) : (
                    <div onClick={() => setEditingRow((prev) => new Set([...prev, row.index]))}>
                        {cell.getValue<string>() || ""}
                    </div>
                ),
        },
        {
            header: "Mã CLO",
            accessorKey: "clo",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <TextInput
                        value={cell.getValue<string>() || ""}
                        onChange={(e) => updateRowValue(row.index, "clo", e.target.value)}
                    />
                ) : (
                    <div onClick={() => setEditingRow((prev) => new Set([...prev, row.index]))}>
                        {cell.getValue<string>() || ""}
                    </div>
                ),
        },
        { header: "Tỷ trọng %", accessorKey: "tyTrong" },
        { header: "Mô tả", accessorKey: "description" },
        ...["plo1", "plo2", "plo3", "plo4"].map((key) => ({
            header: key.toUpperCase(),
            accessorKey: key as keyof I_xeytjwnrql_Read,
            Cell: ({
                cell,
                row,
            }: {
                cell: MRT_Cell<I_xeytjwnrql_Read>;
                row: MRT_Row<I_xeytjwnrql_Read>;
            }) =>
                editingRow.has(row.index) ? (
                    <TextInput
                        value={cell.getValue<number>()?.toString() || ""}
                        onChange={(e) =>
                            updateRowValue(row.index, key as keyof I_xeytjwnrql_Read, Number(e.target.value))
                        }
                    />
                ) : (
                    <div onClick={() => setEditingRow((prev) => new Set([...prev, row.index]))}>
                        {cell.getValue<number>() || ""}
                    </div>
                ),
        })),
        { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (row) =>
                row.ngayCapNhat ? U0DateToDDMMYYYString(new Date(row.ngayCapNhat)) : "Không có",
        },
    ], [editingRow]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading data</div>;

    return (
        <MyFlexColumn>
            <Select label="Chọn khóa" placeholder="Ngôn ngữ Anh 2024" />
            <MyDataTable
                exportAble
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <Button style={{ padding: '10px' }} onClick={handleAddRow}>
                            Thêm
                        </Button>
                        <Button style={{ padding: '10px' }}>
                            Lưu
                        </Button>
                        <AQButtonCreateByImportFile
                            setImportedData={() => {}}
                            form={form_multiple}
                            onSubmit={() => {
                                console.log(form_multiple.values);
                            }}
                        >
                            Import
                        </AQButtonCreateByImportFile>
                    </Group>
                )}
                enableRowSelection
                enableRowNumbers
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F_xeytjwnrql_Delete id={row.original.id!} />
                    </MyCenterFull>
                )}
                columns={columns}
                data={data}
            />
        </MyFlexColumn>
    );
}
