'use client';
import baseAxios from "@/api/baseAxios";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Fieldset, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_ibdt9veg94_Create from "./F_ibdt9veg94_Create";
import F_ibdt9veg94_Delete from "./F_ibdt9veg94_Delete";
import VariantImageList from "@/components/VariantImageList/VariantImageList";
import F_ibdt9veg94_Update from "./F_ibdt9veg94_Update";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";

export interface I_ibdt9veg94_Read {
    id: number;
    name: string;
    slug: string;
    logo: string;
    description: string;
    is_active: boolean;
    is_featured: boolean;
    created_at?: string; // hoặc Date nếu bạn sẽ parse thành đối tượng Date
    updated_at?: string;
}

export default function F_ibdt9veg94_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    function normalizeImages(input: unknown): { url: string }[] {
        if (Array.isArray(input)) return input;
        if (typeof input === "string" && input.length > 0) return [{ url: input }];
        if (input && typeof input === "object" && "url" in input) return [input as { url: string }];
        return [];
    }

    const AllBrandsQuery = useQuery<I_ibdt9veg94_Read[]>({
        queryKey: ["F_ibdt9veg94_Read"],
        queryFn: async () => {
            const result = await baseAxios.get("brands");
            return result.data.data || [];
        },
    });
    const columns = useMemo<MRT_ColumnDef<I_ibdt9veg94_Read>[]>(() => [
        { header: "Tên thương hiệu", accessorKey: "name" },
        { header: "Slug", accessorKey: "slug" },
        {
            header: "Logo",
            Cell: ({ row }) => {
                const images = normalizeImages(row.original.logo);
                return <VariantImageList images={images} />;

            }
        },
        { header: "Mô tả", accessorKey: "description" },
        {
            header: "Trạng thái",
            accessorFn: (row) => row.is_active ? "Đang hoạt động" : "Ngừng hoạt động",
        },
        { header: "Nổi bật", accessorFn: (row) => row.is_featured ? "Nổi bật" : "Không nổi bật" },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "name", header: "Tên thương hiệu" },
            { fieldName: "slug", header: "Slug" },
            { fieldName: "logo", header: "Logo" },
            { fieldName: "description", header: "Mô tả" },
            { fieldName: "is_active", header: "Trạng thái" },
            { fieldName: "is_featured", header: "Nổi bật" },

        ],
    };
    if (AllBrandsQuery.isLoading) return "Loading...";
    if (AllBrandsQuery.isError) return "Error!";

    return (
        <Fieldset legend={"Quản lý thương hiệu"}>
            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>
                                    <F_ibdt9veg94_Create />
                                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                        console.log(form_multiple.values);

                                    }}>s</AQButtonCreateByImportFile>
                                    <AQButtonExportData
                                        isAllData={true}
                                        objectName="qlbrands"
                                        data={AllBrandsQuery.data || []}
                                        exportConfig={exportConfig} />
                                </Group>
                            </>
                        )
                    }}
                    columns={columns}
                    data={AllBrandsQuery.data || []}
                    renderRowActions={({ row }) => {
                        return (
                            <MyFlexColumn>
                                <F_ibdt9veg94_Update values={row.original} />
                                <F_ibdt9veg94_Delete id={row.original.id} />
                            </MyFlexColumn>
                        )
                    }}
                />
            </MyFlexColumn>
        </Fieldset>
    )
}