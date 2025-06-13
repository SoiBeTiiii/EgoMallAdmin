'use client'
import baseAxios from "@/api/baseAxios";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { ENUM_GENDER } from "@/constants/enum/global";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import useS_fgmpowiqop from "./useS_fgmpowiqop";

export interface I_fgmpowiqop {
    studentCode: string;
    studentFullName: string;
    studentDateOfBirth: Date | undefined;
    studentGender: number;
    totalCLOPoint: number;
    cloPoints: ICloPoint[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

export interface ICloPoint {
    cloId: number;
    cloName: string;
    point: number;
}

export default function F_fgmpowiqop_Read() {
    const store = useS_fgmpowiqop()
    const query = useQuery<I_fgmpowiqop[]>({
        queryKey: ['I_fgmpowiqopData', store.state.gradeSubjectId, store.state.classId],
        queryFn: async () => {
            let url = `/COECourseSectionStudent/StudentPointResultReport?coeGradeSubjectId=${store.state.gradeSubjectId}`;

            if (store.state.classId && store.state.classId > 0) {
                url += `&coeClassId=${store.state.classId}`;
            }

            const response = await baseAxios.post(url);
            return response.data.data;
        },
        enabled: !!store.state.gradeSubjectId && store.state.gradeSubjectId > 0
    })


    const columns = useMemo<MRT_ColumnDef<I_fgmpowiqop>[]>(() => [
        {
            header: "STT",
            accessorKey: "id",

        },
        {
            header: "Mã Sinh Viên",
            accessorKey: "studentCode",

        },
        {
            header: "Họ và Tên",
            accessorKey: "studentFullName",

        },
        {
            header: "Ngày sinh",
            accessorKey: "studentDateOfBirth",
            accessorFn: (originalRow) => {
                return U0DateToDDMMYYYString(new Date(originalRow.studentDateOfBirth!));
            }
        },
        {
            header: "Giới tính",
            accessorKey: "studentGender",
            accessorFn: (originalRow) => {
                return originalRow.studentGender === ENUM_GENDER.Nam ? "Nam" : "Nữ";
            }
        },
        ...query.data?.[0]?.cloPoints?.map((clo: ICloPoint) => ({
            header: clo.cloName,
            accessorFn: (row: I_fgmpowiqop) => {
                const point = row.cloPoints?.find(p => p.cloId === clo.cloId)?.point
                return point?.toFixed(2) ?? '-'
            },
        })) ?? [],
        {
            header: "Tổng kết CLO",
            accessorKey: "totalCLOPoint",
        },
    ], [query.data]);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyFlexColumn>
            <MyDataTable
                exportAble
                enableRowSelection={true}
                enableRowNumbers={false}
                columns={columns}
                data={query.data ?? []}
                initialState={{
                    columnOrder: [
                        "id",
                        "studentCode",
                        "studentFullName",
                        "studentDateOfBirth",
                        "studentGender",
                        ...(query.data?.[0]?.cloPoints?.map(clo => clo.cloName) ?? []),
                        "totalCLOPoint"
                    ]
                }}
            />
        </MyFlexColumn>
    );
}