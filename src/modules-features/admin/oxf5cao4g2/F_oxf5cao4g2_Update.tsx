'use client';
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_oxf5cao4g2_Delete1 from "./F_oxf5cao4g2_Delete1";
// Interface định nghĩa dữ liệu
export interface I_oxf5cao4g2 {
    id?: number; // STT
    year?: number; // Năm thứ
    semester?: number; // Học kỳ
    code?: string; // Mã môn học
    name?: string; // Tên môn học
    credit?: number; // Số tín chỉ
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
let mockData:I_oxf5cao4g2[]=[
    {
    id: 1,
    year: 2024,
    semester: 1,
    code: "TATM01",
    name: "Tiếng Anh thương mại",
    credit: 2,
    nguoiCapNhat: "Nguyễn Văn A",
    ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        id: 2,
        year: 2024,
        semester: 1,
        code: "CS101",
        name: "Nhập môn tin học",
        credit: 3,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        id: 3,
        year: 2024,
        semester: 2,
        code: "MATH201",
        name: "Giải tích II",
        credit: 3,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        
        id: 4,
        year: 2024,
        semester: 2,
        code: "ENG301",
        name: "Tiếng Anh nâng cao",
        credit: 2,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
        
    },
    {
        
        id: 5,
        year: 2024,
        semester: 2,
        code: "KTo001",
        name: "Kế toán cơ bản",
        credit: 2,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
        
    },
]
export default function F_oxf5cao4g2_Update() {
    const dis = useDisclosure()
    const [fileData, setFileData] = useState<any[]>([]);
    const queryClient = useQueryClient()
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_oxf5cao4g2[]>({
        queryKey: ["F_oxf5cao4g2_Update"],
        queryFn: async () => {
            return mockData
        }
    });

    // Cấu hình cột cho bảng
    const columns = useMemo<MRT_ColumnDef<I_oxf5cao4g2>[]>(() => [
        {
            header: "STT",
            accessorKey: "id",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.id}
                />
        },
        {
            header: "Năm thứ",
            accessorKey: "year",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.year}
                />
        },
        {
            header: "Học kỳ",
            accessorKey: "semester",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.semester}
                />
        },
        {
            header: "Mã môn học",
            accessorKey: "code",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.code}
                />
        },
        {
            header: "Tên môn học",
            accessorKey: "name",
        },
        {
            header: "Số tín chỉ",
            accessorKey: "credit",
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

    const exportConfig = {
        fields: [
            {
                header:"Năm thứ",
                fieldName:"year"
            },
            {
                header:"Học kỳ",
                fieldName:"semester"
            },
            {
                header:"Mã môn học",
                fieldName:"code"
            },
            {
                header:"Tên môn học",
                fieldName:"name"
            },
            {
                header:"Số tín chỉ",
                fieldName:"credit"
            },
            {
                header: "Người cập nhật",
                fieldName: "nguoiCapNhat"
            },
            {
                header: "Ngày cập nhật",
                fieldName: "ngayCapNhat",
            }
        ]}
    // Kiểm tra trạng thái của query
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyButtonModal label="Cập nhập" title="Chi tiết chương trình đào tạo khóa" modalSize={'80%'} disclosure={dis}>
        <MyDataTable
            columns={columns}
            data={query.data!}
            enableRowSelection={true}
            enableRowNumbers={false}
            renderTopToolbarCustomActions={() => (
                <>
                    {/* Nút tạo mới */}
                    <Button
                        color='indigo'
                        // eslint-disable-next-line react/jsx-no-undef
                        leftSection={<IconPlus />}
                        onClick={() => {
                            // Tìm giá trị ID lớn nhất hiện tại
                            const maxId = query.data!.reduce((max, item) => item.id! > max ? item.id! : max, 0);
                            const newRecord: I_oxf5cao4g2 = {
                                id: maxId + 1,
                                year:0, // Năm thứ
                                semester: 0, // Học kỳ
                                code: "", // Mã môn học
                                name: "", // Tên môn học
                                credit:0 // Số tín chỉ

                            };

                            queryClient.setQueryData<I_oxf5cao4g2[]>([`F_oxf5cao4g2_Update`], [...query.data!, newRecord]);
                        }}
                    >
                        Thêm
                    </Button>
                    <AQButtonCreateByImportFile
                        setImportedData={setFileData}
                        onSubmit={
                            () => {
                                console.log("data: ");
                            }
                        }
                        form={form_multiple}
                    >s</AQButtonCreateByImportFile>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dsChiTietChuongTrinhDaoTaoKhoa"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <MyButton crudType="delete" />
                </>
            )}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_oxf5cao4g2_Delete1 Id={row.original.id!} /> 
                    </MyCenterFull>
                );
            }}
        />
        </MyButtonModal>
    );
}
