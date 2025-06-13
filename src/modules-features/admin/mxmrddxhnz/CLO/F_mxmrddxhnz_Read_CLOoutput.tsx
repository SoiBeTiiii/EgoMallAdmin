'use client';
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import useQ_COECLO_GetSource from "@/hooks/query-hooks/COECLO/useQ_COECLO_GetSource";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";



export default function F_afeqrofpwa_Tab2Read({ gradeSubjectId }: { gradeSubjectId: number }) {
    const CLOQuery = useQ_COECLO_GetSource({
        params: "?COEGradeSubjectId=" + gradeSubjectId,
    })

    const columns = useMemo<MRT_ColumnDef<ICoeCLO>[]>(() => [
        {
            header: "Mã CG",
            accessorKey: "coecg.code",

        },
        {
            header: "Mã CLO",
            accessorKey: "code",

        },
        {
            header: "Tỷ trọng CLO",
            accessorKey: "densityCLO",
            Cell: ({ cell }) => `${cell.getValue<number>()}%`,
        },
        {
            header: "Mô tả",
            accessorKey: "description",

        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat"
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            // accessorFn(originalRow) {
            //     return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            // },
        }
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "coecg.code", header: "Mã CG" },
            { fieldName: "code", header: "Mã CLO" },
            { fieldName: "densityCLO", header: "Tỷ trọng CLO" },
            { fieldName: "description", header: "Mô tả" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    if (CLOQuery.isLoading) return "Đang tải dữ liệu...";
    if (CLOQuery.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={CLOQuery.data!}
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={() => (
                <Group>
                    {/*                   
                    <AQButtonCreateByImportFile
                        setImportedData={setFileData}
                        onSubmit={() => {
                            console.log("Dữ liệu đã nhập:", fileData);
                        }}
                        form={form_multiple}
                    />
                     */}
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dsCLO"
                        data={CLOQuery.data!}
                        exportConfig={exportConfig}
                    />

                </Group>
            )}

        />
    );
}

const mockData: any = { id: 1, }
