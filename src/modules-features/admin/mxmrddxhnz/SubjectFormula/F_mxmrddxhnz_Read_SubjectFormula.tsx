"use client"
import baseAxios from '@/api/baseAxios';
import AQButtonCreateByImportFile from '@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile';
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import F_mxmrddxhnz_Create_SubjectFormula from './F_mxmrddxhnz_Create_SubjectFormula';
import F_mxmrddxhnz_Delete_SubjectFormula from './F_mxmrddxhnz_Delete_SubjectFormula';
import F_mxmrddxhnz_Update_SubjectFormula from './F_mxmrddxhnz_Update_SubjectFormula';

export interface ICOESubjectFormula {
    id: number;
    code: string;
    name: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    coeTrainingProgramDetail?: number | null;
    formulaType: number;
    rate: number;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

enum formulaType {
    "Chuyên cần" = 1, // Chuyên cần
    "Quá trình" = 2, // Quá trình
    "Cuối kỳ" = 3  // Cuối kỳ
}

export default function F_mxmrddxhnz_Read_SubjectFormula() {

    const query = useQuery<ICOESubjectFormula[]>({
        queryKey: [`F_mxmrddxhnz_Read_hinhthuc`],
        queryFn: async () => {
            const response = await baseAxios.get("/COESubjectFormula/Getall");
            return response.data.data || [];
        },
    })

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const exportConfig = {
        fields: [
            {
                header: "Hình thức đánh giá",
                fieldName: "name",
            },
            {
                header: "Tỷ trọng",
                fieldName: "rate"
            },
            {
                header: "Người cập nhật",
                fieldName: "nguoiCapNhat",

            },
            {
                header: "Ngày cập nhật",
                fieldName: "ngayCapNhat",
            },
        ]
    };

    const columns = useMemo<MRT_ColumnDef<ICOESubjectFormula>[]>(
        () => [
            {
                header: "Hình thức đánh giá",
                accessorKey: "formulaType",
                accessorFn: (row: any) =>
                    query.isSuccess && query.data ? formulaType[row.formulaType as number] : "",
            },
            {
                header: "Tỷ trọng CA",
                accessorKey: "rate",
                accessorFn: (row: any) => query.isSuccess && query.data ? `${row.rate}%`: "",
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat",
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },
            },
        ],
        [query.data]
    );

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."

    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={query.data!}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <F_mxmrddxhnz_Create_SubjectFormula />
                            <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                console.log(form_multiple.values);

                            }} >s</AQButtonCreateByImportFile>
                            <AQButtonExportData
                                isAllData={true}
                                objectName="F_mxmrddxhnz_Read_hinhthuc"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                            <Button color="red">
                                Xóa
                            </Button>
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_mxmrddxhnz_Update_SubjectFormula data={row.original} />
                        <F_mxmrddxhnz_Delete_SubjectFormula id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}
