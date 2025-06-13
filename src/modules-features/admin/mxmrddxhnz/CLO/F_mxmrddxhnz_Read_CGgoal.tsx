'use client';
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import useQ_COECG_GetSource from "@/hooks/query-hooks/COECG/useQ_COECG_GetSource";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";


//mxmrddxhnz
export default function F_mxmrddxhnz_CGgoal({gradeSubjectId}:{gradeSubjectId:number}) {
    const CGGoalquery = useQ_COECG_GetSource({
        params: "?coegradeSubjectId=" + gradeSubjectId,
         options: {
            enabled: true
        }
    });

    const columns = useMemo<MRT_ColumnDef<ICoeCG>[]>(() => [

        {
            header: "Mã CG Mô tả",
            accessorKey: "code",
        },
        {
            header: "",
            accessorKey: "description",
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat"
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
        }
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "code", header: "Mã CG Mô tả" },
            { fieldName: "description", header: "" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    if (CGGoalquery.isLoading) return "Đang tải dữ liệu...";
    if (CGGoalquery.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={CGGoalquery.data!}
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dsCGMoTa"
                        data={CGGoalquery.data!}
                        exportConfig={exportConfig}
                    />
                </Group>
            )}
        />
    );
}


// const mockData: any = { id: 1, }
