'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Fieldset, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import baseAxios from "@/api/baseAxios";
import F_p1x0zur5dt_Create from "./F_p1x0zur5dt_Create";
import F_p1x0zur5dt_Update from "./F_p1x0zur5dt_Update";
import F_p1x0zur5dt_Delete from "./F_p1x0zur5dt_Delete";




export interface I_p1x0zur5dt_Read {
    id: number;
    title: string;
    image_url: string;
    link_url: string;
    position: string;
    start_date: string;   // ISO format date string, e.g., "2025-06-18T00:00:00Z"
    end_date: string;     // ISO format date string
    status: boolean;      // hoặc number nếu trong DB bạn dùng 0/1 thay vì true/false
    created_at: string;   // ISO format date string
    update_at: string;    // ISO format date string
}



export default function F_p1x0zur5dt_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I_p1x0zur5dt_Read[]>({
        queryKey: ["F_p1x0zur5dt_Read"],
        queryFn: async () => {
            const result = await baseAxios.get("/banners");
            return result.data.data || [];
        }
    });
    const columns = useMemo<MRT_ColumnDef<I_p1x0zur5dt_Read>[]>(() => [
        { header: "Tiêu đề", accessorKey: "title" },
        { header: "hình ảnh", accessorKey: "image_url" },
        { header: "Link", accessorKey: "link_url" },
        { header: "Vị trí", accessorKey: "position" },
        { header: "Ngày bắt đầu", accessorKey: "start_date" },
        { header: "Ngày kết thúc", accessorKey: "end_date" },
        { header: "Trang thái", accessorKey: "status" },
        { header: "Ngày tạo", accessorKey: "created_at" },
        { header: "Ngày cập nhật", accessorKey: "update_at" },
        
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "title", header: "tiêu đề" },
            { fieldName: "image_url", header: "hình ảnh" },
            { fieldName: "link_url", header: "link" },
            { fieldName: "position", header: "vi_tri" },
            { fieldName: "start_date", header: "ngày bằn" },
            { fieldName: "end_date", header: "ngày kết thúc" },
            { fieldName: "status", header: "trang thái" },
            { fieldName: "created_at", header: "ngày tạo" },
            { fieldName: "update_at", header: "ngày cập nhật" },
        ],
    };

    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <Fieldset legend={`Quản lý banner`}>

            <MyFlexColumn>
                <MyDataTable

                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>
                                    <F_p1x0zur5dt_Create/>
                                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                        console.log(form_multiple.values);
                                    } }>s</AQButtonCreateByImportFile>
                                    <AQButtonExportData
                                        isAllData={true}
                                        objectName="qlbanners"
                                        data={AllUserQuery.data || []}
                                        exportConfig={exportConfig} />
                                </Group>
                            </>
                        );
                    } }  
                    
                    columns={columns}
                    data={AllUserQuery.data || []}  
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <F_p1x0zur5dt_Update values={row.original} />
                            <F_p1x0zur5dt_Delete id={row.original.id} />
                        </MyCenterFull>
                    )}
                    />
            </MyFlexColumn>
        </Fieldset>
    );
}

// const data: I_p1x0zur5dt_Read[] = [
//     {
//         id: 1,
//         code: "CQ",
//         name: "Chính quy",
//         nameEg: "Offline",
//     },
//     {
//         id: 2,
//         code: "TX",
//         name: "Từ xa",
//         nameEg: "Online",
//     },
// ];