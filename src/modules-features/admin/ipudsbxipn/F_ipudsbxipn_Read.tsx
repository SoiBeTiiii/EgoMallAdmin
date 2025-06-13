'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Flex, MultiSelect, Select, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import F_ipudsbxipn_Delete from "./F_ipudsbxipn_Delete";

export interface Iipudsbxipn {
    id: number;
    thanhPhanDanhGia: string;
    baiDanhGia: string;
    thoiDiem: string;
    CLO: string[];
    PLO: string;
    hinhThuc: string;
    noiDung: string;
    thoiLuong: string;
    congCuDanhGia: string;
    tyLe: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

const FetchData = () => {
    return useQuery<Iipudsbxipn[]>({
        queryKey: ['Iipudsbxipn'],
        queryFn: async () => [
            {
                id: 1,
                thanhPhanDanhGia: "Quá trình",
                baiDanhGia: "Thảo luận",
                thoiDiem: "Sau chương 2",
                CLO: ["CLO3"],
                PLO: "PLO1",
                hinhThuc: "[TL-01] Thảo luận nhóm, thực hiện trên LMS",
                noiDung: "Thảo luận về thông tin tài chính cơ bản trên báo cáo tài chính",
                thoiLuong: "3 tuần",
                congCuDanhGia: "Rubrics 1",
                tyLe: "10%",
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 2,
                thanhPhanDanhGia: "Quá trình",
                baiDanhGia: "Bài tập thực hành",
                thoiDiem: "Sau chương 7",
                CLO: ["CLO1", "CLO2"],
                PLO: "PLO1",
                hinhThuc: "Bài tập cá nhân/nhóm thực hiện trên LMS",
                noiDung: "Bài tập thực hiện nghiệp vụ mua- bán hàng hóa và tính giá hàng tồn kho",
                thoiLuong: "20 phút",
                congCuDanhGia: "Rubrics 2",
                tyLe: "10%",
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 3,
                thanhPhanDanhGia: "Giữa kì",
                baiDanhGia: "Tự luận",
                thoiDiem: "Sau chương 4",
                CLO: ["CLO2"],
                PLO: "PLO1",
                hinhThuc: "Thực hiện bài kiểm tra tại lớp gồm 2-3 câu tự luận",
                noiDung: "Bài kiểm tra từ chương 1 đến chương 4",
                thoiLuong: "60 phút",
                congCuDanhGia: "Rubrics 3",
                tyLe: "30%",
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23"),

            },
            {
                id: 4,
                thanhPhanDanhGia: "Cuối kì",
                baiDanhGia: "Trắc nghiệm",
                thoiDiem: "Khi thi hết môn",
                CLO: ["CLO1"],
                PLO: "PLO1",
                hinhThuc: "Thực hiện bài thi theo kế hoạch thi học kì của nhà trường: 30 câu trắc nghiệm",
                noiDung: "Bài kiểm tra từ chương 1 đến chương 9",
                thoiLuong: "75 phút",
                congCuDanhGia: "Ma trận",
                tyLe: "50%",
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
        ]
    })
}

export default function EditableTable() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const { data, isLoading, isError } = FetchData();
    const [editingRow, setEditingRow] = useState<Set<number>>(new Set());
    const [updatedData, setUpdatedData] = useState<Iipudsbxipn[]>(data || []);

    useEffect(() => {
        if (data) {
            setUpdatedData(data);
        }
    }, [data]);

    const updateRowValue = (
        index: number,
        key: keyof Iipudsbxipn,
        value: string | number | string[]
    ) => {
        const newData = updatedData.map((row, i) =>
            i === index ? { ...row, [key]: value } : row
        );
        setUpdatedData(newData);
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

    const handleAddRow = () => {
        const newRow = {
            id: updatedData.length + 1,
            thanhPhanDanhGia: "",
            baiDanhGia: "",
            thoiDiem: "",
            CLO: [],
            PLO: "",
            hinhThuc: "",
            noiDung: "",
            thoiLuong: "",
            congCuDanhGia: "",
            tyLe: "",
            nguoiCapNhat: "",
            ngayCapNhat: new Date(Date.now()),
        };
        setUpdatedData((prevData) => [...prevData, newRow]);
        setEditingRow((prevEditing) => {
            const newEditing = new Set(prevEditing);
            newEditing.add(updatedData.length);
            return newEditing;
        });
    };

    const columns = useMemo<MRT_ColumnDef<Iipudsbxipn>[]>(() => [
        {
            header: "Thành phần đánh giá",
            accessorKey: "thanhPhanDanhGia",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <Select
                        value={cell.getValue<string>() || ""}
                        onChange={(value) =>
                            updateRowValue(row.index, "thanhPhanDanhGia", value ?? "")
                        }
                        data={["Quá trình", "Giữa kì", "Cuối kì"]}
                    />
                ) : (
                    <div onClick={() => toggleEditRow(row.index)} style={{ cursor: "pointer" }}>
                        {cell.getValue<string>()}
                    </div>
                ),
        },
        {
            header: "Bài đánh giá",
            accessorKey: "baiDanhGia",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <TextInput
                        value={cell.getValue<string>()}
                        onChange={(e) =>
                            updateRowValue(row.index, "baiDanhGia", e.target.value)
                        }
                    />
                ) : (
                    <div onClick={() => toggleEditRow(row.index)} style={{ cursor: "pointer" }}>
                        {cell.getValue<string>()}
                    </div>
                ),
        },
        {
            header: "Thời điểm",
            accessorKey: "thoiDiem",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <TextInput
                        type="string"
                        value={cell.getValue<string>().toString()}
                        onChange={(e) =>
                            updateRowValue(row.index, "thoiDiem", String(e.target.value))
                        }
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
            header: "CLO",
            accessorKey: "CLO",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <MultiSelect
                        value={cell.getValue<string[]>() || []}
                        onChange={(value) =>
                            updateRowValue(row.index, "CLO", value ?? [])
                        }
                        data={['CLO1', 'CLO2', 'CLO3']}
                        clearable
                    />
                ) : (
                    <div
                        onClick={() => toggleEditRow(row.index)}
                        style={{ cursor: "pointer" }}
                    >
                        {cell.getValue<string[]>().join(', ')}
                    </div>
                ),
        },
        {
            header: "PLO",
            accessorKey: "PLO",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <Select
                        value={cell.getValue<string>() || ""}
                        onChange={(value) =>
                            updateRowValue(row.index, "PLO", value ?? "")
                        }
                        data={["PLO1", "PLO2", "PLO3"]}
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
            header: "Hình thức",
            accessorKey: "hinhThuc",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <TextInput
                        type="string"
                        value={cell.getValue<string>().toString()}
                        onChange={(e) =>
                            updateRowValue(row.index, "hinhThuc", String(e.target.value))
                        }
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
            header: "Nội dung",
            accessorKey: "noiDung",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <TextInput
                        type="string"
                        value={cell.getValue<string>().toString()}
                        onChange={(e) =>
                            updateRowValue(row.index, "noiDung", String(e.target.value))
                        }
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
            header: "Thời lượng",
            accessorKey: "thoiLuong",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <TextInput
                        type="string"
                        value={cell.getValue<string>().toString()}
                        onChange={(e) =>
                            updateRowValue(row.index, "thoiLuong", String(e.target.value))
                        }
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
            header: "Công cụ đánh giá",
            accessorKey: "congCuDanhGia",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <TextInput
                        type="string"
                        value={cell.getValue<string>().toString()}
                        onChange={(e) =>
                            updateRowValue(row.index, "congCuDanhGia", String(e.target.value))
                        }
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
            header: "Tỷ lệ",
            accessorKey: "tyLe",
            Cell: ({ cell, row }) =>
                editingRow.has(row.index) ? (
                    <TextInput
                        type="string"
                        value={cell.getValue<string>().toString()}
                        onChange={(e) =>
                            updateRowValue(row.index, "tyLe", String(e.target.value))
                        }
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
        // Thêm các cột khác tại đây nếu cần
    ], [editingRow, updatedData]);

    const handleSave = () => {
        console.log("Dữ liệu sau khi lưu:", updatedData);
    };

    return (
        <MyFlexColumn>
            <Flex direction={{ base: 'column', sm: 'row' }} gap="lg">
                <MySelect label="Chọn khóa" data={["Ngôn ngữ Anh 2024"]} defaultValue="Ngôn ngữ Anh 2024" />
                <MySelect data={["Tiếng Anh thương mại"]} label="Chọn môn" defaultValue="Tiếng Anh thương mại" />
            </Flex>
            <MyDataTable
                exportAble
                columns={columns}
                data={updatedData}
                renderTopToolbarCustomActions={() => (
                    <>
                        <Button onClick={handleAddRow}>Thêm</Button>
                        <MyButton crudType="save" onClick={handleSave}>Lưu</MyButton>
                        <AQButtonCreateByImportFile
                            setImportedData={setImportData}
                            form={form_multiple}
                            onSubmit={() => console.log(form_multiple.values)}
                        >
                            Tải lên
                        </AQButtonCreateByImportFile>
                    </>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F_ipudsbxipn_Delete id={row.original.id!} />
                    </MyCenterFull>
                )}
            />
        </MyFlexColumn>
    );
}
