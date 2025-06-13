'use client';
import baseAxios from "@/api/baseAxios";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import useQ_COEGrade_GetGradeNotTrainingProgram from "@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetGradeNotTrainingProgram";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus, IconSelect } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

export default function F_hlnya90qi9_Create() {
    const dis = useDisclosure()
    const GradeNotTrainingProgramQuery = useQ_COEGrade_GetGradeNotTrainingProgram()
    const [fileData, setFileData] = useState<any[]>([]);
    const formCreate = useForm<any>({
        initialValues: {
            "id": 0,
            "code": "string",
            "name": "string",
            "concurrencyStamp": "string",
            "isEnabled": true,
            "coeSemesterStartId": 0,
            "coeSemesterEndId": 0,
            "coeTrainingLevelId": 0,
            "coeProgramId": 0,
            "note": "string",
            "isActive": true
        }
    });

    // Cấu hình cột cho bảng
    const columns = useMemo<MRT_ColumnDef<ICoeGrade>[]>(() => [
        { header: "Mã khóa", accessorKey: "code" },
        { header: "Tên khóa", accessorKey: "name" },
        {
            header: "Chương trình", accessorKey: "coeProgram.name",
            // accessorFn: (row) => { console.log('id:', row.id) } 
        },
        { header: "Khoa", accessorKey: "coeProgram.coeUnit.name" },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "code", header: "Mã khóa" },
            { fieldName: "name", header: "Tên khóa" },
            { fieldName: "coeProgram.name", header: "Chương trình" },
            { fieldName: "coeProgram.coeUnit.name", header: "Khoa" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    // Kiểm tra trạng thái của query
    if (GradeNotTrainingProgramQuery.isLoading) return "Đang tải dữ liệu...";
    if (GradeNotTrainingProgramQuery.isError) return "Không có dữ liệu...";

    return (
        <MyButtonModal label="Thêm" title="Danh mục khóa" modalSize={'100%'} disclosure={dis} leftSection={<IconPlus />}>
            <MyDataTable
                columns={columns}
                data={GradeNotTrainingProgramQuery.data!}
                enableRowSelection={true}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows = table.getSelectedRowModel().rows;
                    return (
                        <Group>
                            <MyButtonCreate
                                title={
                                    `Bạn có chắc là muốn thêm khóa học "${selectedRows.length > 0
                                        ? selectedRows[0].original.name
                                        : ""
                                    }" 
                                    ?`
                                }
                                crudType="default"
                                leftSection={<IconSelect />}
                                onSubmit={async (values) => {
                                    const selectedData = selectedRows.map(item => item.original)
                                    if (selectedData.length === 0) {
                                        notifications.show({
                                            message: "Chưa chọn khóa học",
                                            color: "red",
                                        })
                                        return Promise.reject(new Error("Chưa chọn khóa học"));
                                    }
                                    if (selectedData.length > 1) {
                                        notifications.show({
                                            message: "Nhiều nhất chọn 1 khóa học",
                                            color: "red",
                                        })
                                        return Promise.reject(new Error("Nhiều nhất chọn 1 khóa học"));
                                    }

                                    const updatedValues = {
                                        "note": selectedData[0].note,
                                        "isActive": true,
                                        "id": selectedData[0].id,
                                        "code": selectedData[0].code,
                                        "name": selectedData[0].name,
                                        "concurrencyStamp": selectedData[0].concurrencyStamp,
                                        "isEnabled": true,
                                        "coeSemesterStartId": selectedData[0].coeSemesterStartId,
                                        "coeSemesterEndId": selectedData[0].coeSemesterEndId,
                                        "coeTrainingLevelId": selectedData[0].coeTrainingLevelId,
                                        "coeProgramId": selectedData[0].coeProgramId,
                                    };
                                    try {
                                        const res = await baseAxios.post("/COEGrade/Update",
                                            updatedValues,
                                        )
                                        if (!res.data.isSuccess) {
                                            throw new Error(res.data.data[""] || 'Có lỗi xảy ra khi sao chép chương trình đào tạo!');
                                        }
                                        return Promise.resolve();
                                    } catch (error) {
                                        notifications.show({
                                            message: error instanceof Error ? error.message : "Có lỗi xảy ra khi thêm khóa học.",
                                            color: "red",
                                        })
                                        return Promise.reject(error);
                                    }
                                }} form={formCreate} label="Chọn" />
                            <AQButtonExportData
                                isAllData={true}
                                objectName="Danh mục khóa"
                                data={GradeNotTrainingProgramQuery.data!}
                                exportConfig={exportConfig}
                            />
                        </Group>
                    )
                }
                }
            />
        </MyButtonModal>
    );
}

