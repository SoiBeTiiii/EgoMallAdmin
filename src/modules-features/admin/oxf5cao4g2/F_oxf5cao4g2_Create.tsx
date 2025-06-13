'use client';
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconSelect } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

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

export default function F_oxf5cao4g2_Create() {
    const dis = useDisclosure()
    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_oxf5cao4g2[]>({
        queryKey: ["F_oxf5cao4g2_Create"],
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
        <MyButtonModal label="Thêm" title="Danh mục khóa" modalSize={'80%'} disclosure={dis} leftSection={<IconPlus />}>
        <MyDataTable
            columns={columns}
            data={query.data!}
            enableRowSelection={true}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <Button leftSection={<IconSelect />}>Chọn</Button>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dsKhoa"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                </Group>
            )}
        />
        </MyButtonModal>
    );
}
