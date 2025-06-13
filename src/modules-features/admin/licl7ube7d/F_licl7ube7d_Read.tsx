'use client'
import baseAxios from "@/api/baseAxios";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Fieldset, Flex, Select, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useState } from "react";



export default function F_licl7ube7d_Read() {
    const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
    const [selectedKhoaId, setSelectedKhoaId] = useState<string | null>(null);

    const form = useForm<any>({
        initialValues: {

        },
    });

    const programSelect = useQuery<any>({
        queryKey: ["programSelect"],
        queryFn: async () => {
            const result = await baseAxios.get("/COEGrade/GetSource")
            return result.data.data || []
        },
    });


    const AllUserQuery = useQuery<any>({
        queryKey: [`F_licl7ube7d_Read`, selectedKhoaId],
        queryFn: async () => {
            const result = await baseAxios.get(`/COEGradeSubject/GetSubjectByGrade?COEGradeId=${selectedKhoaId}&cols=COESubject%2CCOESemester%2CCOESubjectGroup`)
            console.log("Dữ liệu trả về:", result.data.data);
            return result.data.data || []
        },
        enabled: !!selectedKhoaId

    });

    const programQuery = useQuery<any>({
        queryKey: ["queryProgram"],
        queryFn: async () => {
            const result = await baseAxios.get("/COESubjectGroupMITScale/GetAll?cols=COEMITScale%2CCOESubjectGroup")
            console.log(result.data.data)
            return result.data.data || []
        },
    });

    const mergedData = AllUserQuery.data?.map((userItem: any) => {
        const matchedProgram = programQuery.data?.find(
            (programItem: any) => programItem.coeSubjectGroupId === userItem.coeSubjectGroupId
        );
        return {
            ...userItem, // Giữ tất cả thuộc tính của AllUserQuery
            matchedProgram, // Thêm thuộc tính từ programQuery
        };
    }) || [];


    const uniqueProgramsMap = new Map();

    programSelect.data?.forEach((program: any) => {
        if (!uniqueProgramsMap.has(program.coeProgram.id)) {
            uniqueProgramsMap.set(program.coeProgram.id, {
                value: program.coeProgram.id.toString(),
                label: `${program.coeProgram.code} - ${program.coeProgram.name}`,
            });
        }
    });

    const selectProgram = Array.from(uniqueProgramsMap.values());

    const selectProgramCode = programSelect.data
        ?.filter((program: any) => program.coeProgram.id.toString() === selectedProgramId) // Lọc theo chương trình
        ?.map((program: any) => ({
            value: program.id.toString(),
            label: `${program.name}`,
        })) ?? [];



    const columns: MRT_ColumnDef<any>[] = [
        { header: "Năm học Học kỳ", accessorKey: "yearSemester", Cell: ({ row }) => row.original.coeSemester.name },
        { header: "Thứ tự", accessorKey: "order" },
        { header: "Mã môn học", accessorKey: "subjectCode", Cell: ({ row }) => row.original.coeSubject.code },
        { header: "Tên môn học", accessorKey: "subjectName", Cell: ({ row }) => row.original.coeSubject.name },
        { header: "Số tín chỉ", accessorKey: "credit", Cell: ({ row }) => row.original.coeSubject.numberCredit },
        { header: "Số tiết", accessorKey: "periods", Cell: ({ row }) => row.original.coeSubject.numberPeriod },
        { header: "CLO", accessorKey: "clo", Cell: () => <Button variant="subtle" size="xs">Xem</Button> },
        { header: "Năng lực", accessorKey: "competency", Cell: ({ row }) => `${row.original.matchedProgram?.coemitScale.name ?? ""} ` },
        { header: "Kiến thức", accessorKey: "knowledge", Cell: ({ row }) => row.original.matchedProgram?.coemitScale.knowledge ?? "" },
        { header: "Kỹ năng", accessorKey: "skills", Cell: ({ row }) => row.original.matchedProgram?.coemitScale.skill ?? "" },
        { header: "Tự chủ", accessorKey: "notes", Cell: ({ row }) => row.original.matchedProgram?.coemitScale.autonomy ?? "" },
        { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (originalRow) => U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!)),
        },
    ];
    const [selectedKhoa, setSelectedKhoa] = useState<string | null>(null);


    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <MyFlexColumn>


            <Flex align="center" gap="lg" justify="flex-start" wrap="wrap">
                <Flex align="center" gap="sm">
                    <Text>Chương trình: </Text>
                    <Select
                        data={selectProgram}
                        w={200}
                        value={selectedProgramId}
                        onChange={(value) => setSelectedProgramId(value)}
                        placeholder="Chọn chương trình"
                    />
                </Flex>

                <Flex align="center" gap="sm">
                    <Text>Khóa: </Text>
                    <Select
                        data={selectProgramCode}
                        w={200}
                        value={selectedKhoaId}
                        onChange={(value) => {
                            const selectedItem = selectProgramCode.find((item: any) => item.value === value);
                            if (selectedItem) {
                                setSelectedKhoaId(value);
                                setSelectedKhoa(selectedItem.label); // Lưu luôn mã + tên khóa học
                            }
                        }}
                        placeholder="Chọn khóa"
                        disabled={!selectedProgramId} // Không thể chọn nếu chưa chọn chương trình
                    />
                </Flex>
            </Flex>


            <Fieldset legend={`Danh sách CLO Môn học thuộc chương trình đào tạo - Khóa học: ${selectedKhoa || "(chưa chọn)"}`}>
                <MyDataTable
                    exportAble
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    columns={columns}
                    data={mergedData || []}
                />
            </Fieldset>

        </MyFlexColumn>
    );
}


