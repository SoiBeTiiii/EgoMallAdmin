import { MyButton } from '@/components/Buttons/Button/MyButton';
import AQButtonCreateByImportFile from '@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

import baseAxios from '@/api/baseAxios';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import F_lz8rrabyws_Create from '../F_lz8rrabyws_Create';
import F_lz8rrabyws_Delete_PLO_Adjustment from './F_lz8rrabyws_Delete_PLO_Adjustment';
import F_lz8rrabyws_Update_PLO_Adjustment from './F_lz8rrabyws_Update_PLO_Adjustment';

export default function F_lz8rrabyws_PLO_Adjustment({ id }: { id: number }) {
    const queryPLO = useQuery<any[]>({
        queryKey: ["F_lz8rrabyws_PLO_Adjustment", id],
        queryFn: async () => {
            const result = await baseAxios.get(`/COEPLO/GetCOEPLOByGrade?COEGradeId=${id}`)
            return result.data?.data || []
        },
    });


    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const chuanDauRaPLOColumns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                header: "Mã PLO",
                accessorKey: "PLOCode",
                accessorFn: (row) => row.code,

            },
            {
                header: "Tỷ trọng PLO (%)",
                accessorKey: "PLOPercentage",
                accessorFn: (row) => row.densityPLO,
            },
            {
                header: "Mô tả",
                accessorKey: "descriptionPage1",
                accessorFn: (row) => row.description,

            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat"
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn: (originalRow) => U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!)),
            },
        ],
        []
    );
    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "PLOCode", header: "Mã PLO" },
            { fieldName: "PLOPercentage", header: "Tỷ trọng PLO (%)" },
            { fieldName: "descriptionPage1", header: "Mô tả" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };
    if (queryPLO.isLoading) return "Đang tải dữ liệu..."
    if (queryPLO.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            exportAble
            enableRowSelection={true}
            columns={chuanDauRaPLOColumns}
            enableRowNumbers={true}
            data={queryPLO.data!}
            renderTopToolbarCustomActions={() =>
                <>
                    <F_lz8rrabyws_Create id={id} />
                    <AQButtonCreateByImportFile form={form_multiple} onSubmit={() => {

                    }} >s</AQButtonCreateByImportFile>
                    {/* <AQButtonExportData
                        isAllData={true}
                        objectName="dsKhoa"
                        data={queryPLO.data!}
                        exportConfig={exportConfig}
                    /> */}
                    <MyButton crudType='delete' >
                        Xóa
                    </MyButton>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_lz8rrabyws_Update_PLO_Adjustment data={row.original} />
                        <F_lz8rrabyws_Delete_PLO_Adjustment id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    )
}
