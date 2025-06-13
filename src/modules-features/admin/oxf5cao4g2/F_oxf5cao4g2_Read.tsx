'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_oxf5cao4g2_Create from "./F_oxf5cao4g2_Create";
import F_oxf5cao4g2_Delete from "./F_oxf5cao4g2_Delete";
import F_oxf5cao4g2_Update from "./F_oxf5cao4g2_Update";

// Interface định nghĩa dữ liệu
export interface I_oxf5cao4g2 {
    id?: number; // STT
    code?: string; // Mã khóa
    name?: string; // Tên khóa
    branch?: string; // Ngành
    facultyOfManagement?: string; // Khoa quản lý
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_oxf5cao4g2_Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_oxf5cao4g2[]>({
        queryKey: ["courseData"],
        queryFn: async () => [
            {
                id: 1,
                code: "NNA21",
                name: "Ngôn ngữ Anh 2021",
                branch: "Ngôn ngữ Anh",
                facultyOfManagement: "Ngoại ngữ",
                nguoiCapNhat: "Nguyễn Văn A",
                ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },
            
        ],
    });

    // Cấu hình cột cho bảng
    const columns = useMemo<MRT_ColumnDef<I_oxf5cao4g2>[]>(() => [
        {
            header: "Mã khóa",
            accessorKey: "code",
        },
        {
            header: "Tên khóa",
            accessorKey: "name",
        },
        {
            header: "Ngành",
            accessorKey: "branch",
        },
        {
            header: "Khoa quản lý",
            accessorKey: "facultyOfManagement",
        },
        {
            header: "Chương trình đào tạo",
            accessorKey: "program",
            accessorFn(row){
                return(
                    <F_oxf5cao4g2_Update/>  
                )
            }
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
            { fieldName: "id", header: "STT" },
            { fieldName: "code", header: "Mã khóa" },
            { fieldName: "name", header: "Tên khóa" },
            { fieldName: "branch", header: "Ngành" },
            { fieldName: "facultyOfManagement", header: "Khoa quản lý" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };
    // Kiểm tra trạng thái của query
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            enableRowSelection={true}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <F_oxf5cao4g2_Create/>
                    <AQButtonCreateByImportFile
                        setImportedData={setFileData}
                        onSubmit={() => {
                            console.log("Dữ liệu đã nhập:", fileData);
                        }}
                        form={form_multiple}
                    />
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dsKhoa"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <Button color="red" leftSection={<IconTrash />}>
                        Xóa
                    </Button>
                </Group>
            )}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull >
                        
                        <F_oxf5cao4g2_Delete Id={row.original.id!} /> 
                    </MyCenterFull>
                );
            }}
        />
    );
}
