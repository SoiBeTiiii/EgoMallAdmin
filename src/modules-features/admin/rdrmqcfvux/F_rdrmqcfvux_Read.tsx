"use client"
import AQButtonCreateByImportFile from '@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Button, Fieldset, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import F_rdrmqcfvux_Create from './F_rdrmqcfvux_Create';
import F_rdrmqcfvux_Delete from './F_rdrmqcfvux_Delete';
import F_rdrmqcfvux_Update from './F_rdrmqcfvux_Update';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import AQButtonExportData from '@/components/Buttons/ButtonCRUD/AQButtonExportData';
import { IconTrash } from '@tabler/icons-react';
import baseAxios from '@/api/baseAxios';
interface F_4hi65qkj5n_Read {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    nameEg: string;
    numberPeriod: number;
    numberCredit: number;
    note: string;
    coeUnitId: number | null;
    coeUnit: any | null;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_rdrmqcfvux_Read() {

    const AllQuery = useQuery<F_4hi65qkj5n_Read[]>({
        queryKey: [`F_rdrmqcfvux_Read`],
        queryFn: async () => {
            const response = await baseAxios.get("/COESubject/GetAll");
            return response.data.data || [];
          }
    });

    const { data: coeUnits, isLoading: isLoadingCOEUnit } = useQuery({
        queryKey: ["COEUnit_Read"],
        queryFn: async () => {
            const response = await baseAxios.get("/COEUnit/GetAll");
            return response.data.data || [];
        }
    });
    
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })


    // const formatFunctions = {
    //     birthDate: (value: string) => {
    //         const date = new Date(value);
    //         return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
    //     },
    //     isEnabled: (value: boolean) => (value ? "Đã kích hoạt" : "Chưa kích hoạt")
    // };

    const exportConfig = {
        fields: [
            {
                fieldName: "code",
                header: "Mã môn học"
            },
            {
                fieldName: "name",
                header: "Tên môn học"
            },

        ]
    };

    const coeUnitMap = new Map(
        (coeUnits || []).map((unit: { id: any; name: any; }) => [unit.id, unit.name]) // Tạo ánh xạ id -> name
    );
    
    const columns = [
        {
            header: "Mã môn học",
            accessorKey: "code"
        },
        {
            header: "Tên môn học",
            accessorKey: "name"
        },
        {
            header: "Số tiết",
            accessorKey: "numberPeriod"
        },
        {
            header: "Đơn vị quản lý",
            accessorKey: "coeUnitId",
            accessorFn: (row: { coeUnitId: unknown; }) => coeUnitMap.get(row.coeUnitId) || "Chưa cập nhật", // Lấy tên từ Map
        },
    ];
    
            

            // {
            //     header: "Người cập nhật",
            //     accessorKey: "nguoiCapNhat",

            // },
            // {
            //     header: "Ngày cập nhật",
            //     accessorKey: "ngayCapNhat",
            //     accessorFn(originalRow) {
            //         return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            //     },

            // },

        
    

    if (AllQuery.isLoading) return "Đang tải dữ liệu..."
    if (AllQuery.isError) return "Không có dữ liệu..."
    return (
         <Fieldset legend={`Danh mục môn học`}>

<MyFlexColumn>
                <MyDataTable

                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>
                                    <F_rdrmqcfvux_Create />
                                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                        console.log(form_multiple.values);

                                    }} >s</AQButtonCreateByImportFile>
                                    <AQButtonExportData
                                        isAllData={true}
                                        objectName="dm_mh"
                                        data={AllQuery.data || []}
                                        exportConfig={exportConfig}
                                    />
                                    <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                                </Group>
                            </>
                        )
                    }}
                    columns={columns}
                    data={AllQuery.data || []}
                    renderRowActions={({ row }) => {
                        return (

                            <MyCenterFull>
                                <F_rdrmqcfvux_Update lecturerAndExpertValues={row.original} />
                                <F_rdrmqcfvux_Delete id={row.original.id!} />
                            </MyCenterFull>
                        )
                    }}
                />
            </MyFlexColumn>         
            </Fieldset>
    )
}
// const mockData: F_4hi65qkj5n_Read[] = [
//     {
//         id: 1,
//         maMonHoc: "CS101",
//         tenMonHoc: "Nhập môn Tin học",
//         soTiet: 45,
//         khoaQuanLy: 2,
       
//         nguoiCapNhat: "Quản trị viên",
//         ngayCapNhat: new Date("2024-12-23")
//     },
//     {
//         id: 2,
//         maMonHoc: "MATH201",
//         tenMonHoc: "Giải tích II",
//         soTiet: 30,
//         khoaQuanLy: 1,
       
//         nguoiCapNhat: "Quản trị viên",
//         ngayCapNhat: new Date("2024-12-22")
//     },
//     {
//         id: 3,
//         maMonHoc: "ENG301",
//         tenMonHoc: "Tiếng Anh nâng cao",
//         soTiet: 20,
//         khoaQuanLy: 1,
        
//         nguoiCapNhat: "Quản trị viên",
//         ngayCapNhat: new Date("2024-12-20")
//     },
//     {
//         id: 4,
//         maMonHoc: "KTo001",
//         tenMonHoc: "Kế toán cơ bản",
//         soTiet: 15,
//         khoaQuanLy: 3,
    

//         nguoiCapNhat: "Quản trị viên",
//         ngayCapNhat: new Date("2024-12-20")
//     }
// ];

