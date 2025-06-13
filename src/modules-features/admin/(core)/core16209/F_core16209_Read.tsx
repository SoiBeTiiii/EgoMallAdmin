'use client'
import baseAxios from "@/api/baseAxios";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { OBJECT_DOCUMENT_TYPES } from "@/constants/object/documentTypes";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_core16209_Create from "./F_core16209_Create";
import F_core16209_Delete from "./F_core16209_Delete";
import F_core16209_Update from "./F_core16209_Update";


interface I {
    path?: string;
    orderBy?: number;
    documentType?: number;
    promulgateDate?: Date;
    decisionCode?: string;
    departmentName?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    conclusion?: string;
    note?: string;
    documentAttributeId?: number;
    documentAttributeName?: string;
    isCycleCheck?: boolean;
    meetingDate?: Date;
    fileDetail?: {
        fileBase64String?: string,
        fileExtension?: string,
        fileName?: string
    };
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    ngayChinhSua?: Date;
    nguoiChinhSua?: string;
}

export default function F_core16209_Read() {
    const query = useQuery<I[]>({
        queryKey: ["F_core16209_Read"],
        queryFn: async () => {
            const result = await baseAxios.get(`/Document/GetByType?documentType=${OBJECT_DOCUMENT_TYPES.Refinement}`);
            return result.data?.data || []
        }
    })
    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Đơn vị yêu cầu",
                accessorKey: "departmentName"
            },
            {
                header: "Nội dung cải tiến",
                accessorKey: "description"
            },
            {
                header: "Ngày bắt đầu",
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.startDate!))
            },
            {
                header: "Ngày kết thúc",
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.endDate!))
            },
            {
                header: "File",
                accessorFn: (row) => {
                    return (
                        <MyCenterFull>
                            <MyButtonViewPDF id={row.id} />
                        </MyCenterFull>
                    )
                }
            },
        ],
        []
    );

    if (query.isLoading) return "Loading..."
    if (query.isError) return "có lỗi xảy ra!"
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => <F_core16209_Create />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_core16209_Update values={row.original} />
                        <F_core16209_Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

