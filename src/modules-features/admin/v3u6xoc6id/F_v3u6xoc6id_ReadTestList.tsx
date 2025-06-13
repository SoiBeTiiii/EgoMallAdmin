'use client'

import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Fieldset, Group, Select, Space } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_v3u6xoc6id_EditTest from "./F_v3u6xoc6id_EditTest";

interface ITestViewModel {
    id?: number;
    academicYear?: string;
    programName?: string;
    programAcademicYear?: string;
    semester?: number;
    subjectCode?: string;
    subjectName?: string;
    subjectCredit?: number;
    ratingTypeId?: number;
    ratingContentId?: number;
    ratingMethodId?: number;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData: ITestViewModel[] = [
    {
        id: 1,
        academicYear: "2024",
        semester: 1,
        programName: "TATM Tiếng Anh thương mại",
        programAcademicYear: "TATM24",
        subjectCode: "TATM01",
        subjectName: "Tiếng Anh thương mại",
        subjectCredit: 2,
        ratingTypeId: 1,
        ratingContentId: 1,
        ratingMethodId: 1,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        id: 2,
        academicYear: "2024",
        semester: 1,
        programName: "CKCT - Cơ khí chế tạo",
        programAcademicYear: "CKCT24",
        subjectCode: "CTM",
        subjectName: "Chế tạo máy",
        subjectCredit: 2,
        ratingTypeId: 1,
        ratingContentId: 2,
        ratingMethodId: 1,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    }
]

export default function F_v3u6xoc6id_ReadTestList() {

    const AllTest = useQuery<ITestViewModel[]>({
        queryKey: [`F_v3u6xoc6id_ReadTestList`],
        queryFn: async () => {
            return mockData
        }
    });

    const columns = useMemo<MRT_ColumnDef<ITestViewModel>[]>(() => [
        {
            header: "Năm học",
            accessorKey: "academicYear",
            size: 140
        },
        {
            header: "Học kỳ",
            accessorKey: "semester",
            size: 140
        },
        {
            header: "Mã môn học",
            accessorKey: "subjectCode"
        },
        {
            header: "Tên môn học",
            accessorKey: "subjectName"
        },
        {
            header: "Số tín chỉ",
            accessorKey: "subjectCredit",
            size: 140
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat"
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                            return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                        },
        }
    ], []);

    if (AllTest.isLoading) return "Đang tải dữ liệu...";
    if (AllTest.isError) return "Bị lỗi khi tải dữ liệu...";

    return (
        <>
            <Fieldset legend="Mẫu đề thi môn học">
                <Group>
                    <Select
                        w={{ base: "100%", md: "40%" }}
                        label="Chương trình"
                        placeholder="Chọn chương trình"
                        data={[
                            {
                                value: '1',
                                label: 'CKCT - Cơ khí chế tạo'
                            },
                            {
                                value: '2',
                                label: 'CNTT - Công nghệ thông tin'
                            },
                            {
                                value: '3',
                                label: 'QTKD - Quản trị kinh doanh'
                            },
                        ]}
                        allowDeselect
                    />

                    <Select
                        w={{ base: "70%", sm: "50%", md: "20%" }}
                        label="Khóa"
                        placeholder="Chọn khóa"
                        data={[
                            {
                                value: '1',
                                label: 'CKCT24'
                            },
                            {
                                value: '2',
                                label: 'CKCT23'
                            },
                            {
                                value: '3',
                                label: 'CKCT22'
                            },
                        ]}
                        allowDeselect
                    />
                </Group>
                <Space></Space>
                <MyDataTable
                    columns={columns}
                    data={AllTest.data!}
                    enableRowSelection={true}
                    exportAble
                    renderRowActions={({ row }) => {
                        return (
                            <>
                                <F_v3u6xoc6id_EditTest testValues={row.original} />
                            </>
                        )
                    }}
                >
                </MyDataTable>
            </Fieldset>
        </>
    )
}