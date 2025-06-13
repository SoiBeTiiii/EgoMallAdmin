'use client'
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Accordion, Blockquote } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import baseAxios from "@/api/baseAxios";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { OBJECT_DOCUMENT_TYPES } from "@/constants/object/documentTypes";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_core12196_Delete from "./F_core12196_Delete";
import F_core12196_Update from "./F_core12196_Update";
interface I {
    documentType?: number;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

export default function F_core12196_Read() {
    const documentAttributeQuery = useQuery<I[]>({
        queryKey: ['F_core12196_Read', OBJECT_DOCUMENT_TYPES.Regulations],
        queryFn: async () => {
            const result = await baseAxios.get("/DocumentAttribute/GetByType?", { params: { documentType: OBJECT_DOCUMENT_TYPES.Form } })
            return result.data?.data || []
        },
    })
    if (documentAttributeQuery.isLoading) return "Loading..."
    if (documentAttributeQuery.isError) return "có lỗi xảy ra!"
    if (documentAttributeQuery.data?.length == 0) return (
        <Blockquote color="yellow">
            Chưa có loại văn bản
        </Blockquote>
    )
    return (
        <MyFlexColumn>
            <Accordion defaultValue={documentAttributeQuery.data?.map(item => item.id?.toString()!)} multiple>
                {documentAttributeQuery.data?.map((item, idx) => (
                    <SubRead key={idx} name={item.name!} documentType={item.id!} />
                ))}
            </Accordion>
        </MyFlexColumn>
    )
}




function SubRead({ name, documentType }: { name: string, documentType: number }) {
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
    const documentQuery = useQuery<I[]>({
        queryKey: ["SF2_3Read" + documentType],
        queryFn: async () => {
            const result = await baseAxios.get(`/Document/GetByDocumentAttribute?id=${documentType}`);
            return result.data.data
        }
    })
    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Số quy định",
                accessorKey: "decisionCode"
            },
            {
                header: "Ngày ban hành",
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.promulgateDate!))
            },
            {
                header: "Tên tài liệu",
                accessorKey: "name"
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
    if (documentQuery.isLoading) return "Loading..."
    if (documentQuery.isError) return "Error!"
    return (
        <Accordion.Item value={documentType.toString()}>
            <Accordion.Control>{name}</Accordion.Control>
            <Accordion.Panel>
                <MyDataTable
                    columns={columns}
                    data={documentQuery.data!}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <F_core12196_Update values={row.original!} />
                            <F_core12196_Delete id={row.original.id!} />
                        </MyCenterFull>
                    )}
                />
            </Accordion.Panel>
        </Accordion.Item>

    )
}