'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

import baseAxios from "@/api/baseAxios";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { IconTrash } from "@tabler/icons-react";
import F_zvib1md6z9_Create from "./F_zvib1md6z9_Create";
import F_zvib1md6z9_Delete from "./F_zvib1md6z9_Delete";
import F_zvib1md6z9_Update from "./F_zvib1md6z9_Update";

//  Danh mục bậc đào tạo
export interface COETrainingLevel {
    id?: number;          // Unique identifier
    code?: string;
    name?: string;
    nameEg?: string;
    ghiChu?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

// Danh mục hệ đào tạo
export interface COETrainingSystem {
    id?: number;          // Unique identifier
    code?: string;
    name?: string;
    nameEg?: string;
    ghiChu?: string
    updatedBy?: string;
    updatedAt?: Date | undefined;
}

// Danh mục quy chế
export interface COERegulation {
    id?: number;
    code?: string;
    name?: string;
    base?: string;
    ghiChu?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}



export interface I_zvib1md6z9_Read {
    id: number;
    code: string;
    name: string;
    nameEg: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    coeRegulationId: number;
    coeTrainingSystemId: number;
    coeTrainingLevelId: number;
    numSemestersMax: number;
    numSemestersProgram: number;
    numSemestersYear: number;
    coeRegulation: COERegulation | null;
    coeTrainingLevel: COETrainingLevel | null;
    coeTrainingSystem: COETrainingSystem | null;

    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}


export default function F_zvib1md6z9_Read() {
    const COEDegreeLevelQuery = useQuery<I_zvib1md6z9_Read[]>({
        queryKey: ["F_zvib1md6z9_Read"],
        queryFn: async () => {
            const result = await baseAxios.get("/COEDegreeLevel/GetAll");
            return result.data?.data || []
        }
    });
    const COERegulationQuery = useQuery({
        queryKey: ["COERegulation_Read"],
        queryFn: async () => {
            const response = await baseAxios.get("/COERegulation/GetAll");
            return response.data.data || [];
        }
    });
    const COETrainingSystemQuery = useQuery({
        queryKey: ["COETrainingSystem_Read"],
        queryFn: async () => {
            const response = await baseAxios.get("/COETrainingSystem/GetAll");
            return response.data.data || [];
        }
    });
    const COETrainingLevelQuery = useQuery({
        queryKey: ["COETrainingLevel_Read"],
        queryFn: async () => {
            const response = await baseAxios.get("/COETrainingLevel/GetAll");
            return response.data.data || [];
        }
    });


    // const mappedData = allData.map((item) => ({
    //     ...item,
    //     coeRegulation: coeRegulations.find((reg) => reg.id === item.coeRegulationId)?.name || "N/A",
    //   })); 
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    // // Query to fetch the mock data
    // const AllUserQuery = useQuery<I_zvib1md6z9_Read[]>({
    //     queryKey: ["F_hahgkfzpul_Read"],
    //     queryFn: async () => data,
    // });

    console.log(COERegulationQuery.isSuccess)

    // console.log(COEDegreeLevelQuery.data)

    const columns = useMemo<MRT_ColumnDef<I_zvib1md6z9_Read>[]>(() => [
        { header: "Mã bậc hệ", accessorKey: "code" },
        { header: "Tên bậc hệ", accessorKey: "name" },
        // { header: "Quy chế", accessorKey: "coeRegulation" },
        {
            header: "Quy chế",
            accessorKey: "coeRegulation",
            accessorFn: (originalRow) => {
                if (COEDegreeLevelQuery.isSuccess && COERegulationQuery.isSuccess) {
                    return COERegulationQuery?.data.find((reg: COERegulation) => reg.id === originalRow.coeRegulationId)?.name || "N/A";
                }
                return "Loading...";
            },
        },
        {
            header: "Bậc",
            accessorKey: "coeTrainingLevel",
            accessorFn: (originalRow) => {
                if (COEDegreeLevelQuery.isSuccess && COETrainingLevelQuery.isSuccess) {
                    return COETrainingLevelQuery?.data.find((reg: COETrainingLevel) => reg.id === originalRow.coeTrainingLevelId)?.name || "N/A";
                }
                return "Loading...";
            },

        },
        {
            header: "Hệ",
            accessorKey: "coeTrainingSystem",
            accessorFn: (originalRow) => {
                if (COEDegreeLevelQuery.isSuccess && COETrainingSystemQuery.isSuccess) {
                    return COETrainingSystemQuery?.data.find((reg: COETrainingSystem) => reg.id === originalRow.coeTrainingSystemId)?.name || "N/A";
                }
                return "Loading...";
            },

        },
        { header: "Số học kỳ chương trình", accessorKey: "numSemestersProgram" },
        { header: "Số học kỳ tối đa", accessorKey: "numSemestersMax" },
        { header: "Số học kỳ năm học", accessorKey: "numSemestersYear" },
        { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (originalRow) => U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!)),
        },
    ], [COERegulationQuery.data, COETrainingLevelQuery.data, COETrainingSystemQuery.data]);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "code", header: "Mã bậc hệ" },
            { fieldName: "name", header: "Tên bậc hệ" },
            { fieldName: "coeRegulation", header: "Quy chế" },
            { fieldName: "coeTrainingLevel", header: "Bậc" },
            { fieldName: "coeTrainingSystem", header: "Hệ" },
            { fieldName: "numSemestersProgram", header: "Số học kỳ chương trình" },
            { fieldName: "numSemestersMax", header: "Số học kỳ tối đa" },
            { fieldName: "numSemestersYear", header: "Số học kỳ năm học" },
            { fieldName: "updatedBy", header: "Người cập nhật" },
            { fieldName: "updatedAt", header: "Ngày cập nhật" },
        ],
    };
    if (COEDegreeLevelQuery.isLoading) return "Loading...";
    function setImportData(data: any): void {
        throw new Error("Function not implemented.");
    }


    return (
        <MyFlexColumn>
            <MyDataTable

                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <F_zvib1md6z9_Create />
                                <AQButtonCreateByImportFile
                                    setImportedData={setImportData}
                                    form={form_multiple}
                                    onSubmit={async () => console.log(form_multiple.values)}
                                >
                                    Import
                                </AQButtonCreateByImportFile>
                                <AQButtonExportData
                                    isAllData={true}
                                    objectName="dsKhoa"
                                    data={COEDegreeLevelQuery.data!}
                                    exportConfig={exportConfig}
                                />
                                <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                            </Group>
                        </>
                    )
                }}
                columns={columns}
                data={COEDegreeLevelQuery.data || []}
                renderRowActions={({ row }) => {
                    return (

                        <MyCenterFull>
                            <F_zvib1md6z9_Update values={row.original} />
                            <F_zvib1md6z9_Delete id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    );
}

// const data: I_zvib1md6z9_Read[] = [
//     {
//         id: 1,
//         code: "CDCQ",
//         name: "Cao đẳng chính quy",
//         nameEg: "Regular College Program",
//         regulation: "TT08",
//         level: "CD",
//         system: "CQ",
//         totalSemesters: 7,
//         maxSemesters: 11,
//         academicSemesters: 2,
//         updatedBy: "Nguyễn Văn A",
//         updatedAt: new Date("2024-01-15"),
//     },
// ];