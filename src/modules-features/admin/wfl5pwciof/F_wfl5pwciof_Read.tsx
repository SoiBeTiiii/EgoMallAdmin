'use client'
import baseAxios from "@/api/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_wfl5pwciof_Create from "./F_wfl5pwciof_Create";
import F_wfl5pwciof_Delete from "./F_wfl5pwciof_Delete";
import F_wfl5pwciof_Update from "./F_wfl5pwciof_Update";

export interface I_SubjectGroup {
    id?: number;
    code?: string;
    nameId?: number
    name?: string;
    capacity?: string;
    note?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

export interface I_MITScale {
    id?: number;
    code?: string;
    name?: string;
    knowledge?: string;
    skill?: string;
    autonomy?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

export interface I_SubjectGroupMITScale {
    id?: number;
    code?: string | null;
    name?: string | null;
    coemitScaleId?: number;
    coeSubjectGroupId?: number;
    coeSubjectGroup?: I_SubjectGroup | null;
    coemitScale?: I_MITScale | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    // nguoiCapNhat?: string;
    // ngayCapNhat?: Date | undefined;
}

export default function F_SubjectGroup_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const form = useForm<I_SubjectGroupMITScale>({
        initialValues: {},
    });

    const subjectGroupsQuery = useQuery<I_SubjectGroup[]>({
        queryKey: ["COESubjectGroup"],
        queryFn: async () => {
            const response = await baseAxios.get("/COESubjectGroup/getall");
            return response.data.data;
        },
    });

    const mitScalesQuery = useQuery<I_MITScale[]>({
        queryKey: ["COEMITScale"],
        queryFn: async () => {
            const response = await baseAxios.get("/COEMITScale/getall");
            return response.data.data;
        },
    });

    const subjectGroupMITScalesQuery = useQuery<I_SubjectGroupMITScale[]>({
        queryKey: ["COESubjectGroupMITScale"],
        queryFn: async () => {
            const response = await baseAxios.get("/COESubjectGroupMITScale/getall");
            return response.data.data;
        },
    });

    const combinedData = useMemo(() => {
        if (
            !subjectGroupMITScalesQuery.data ||
            !subjectGroupsQuery.data ||
            !mitScalesQuery.data
        ) {
            return [];
        }

        return subjectGroupMITScalesQuery.data.map((item) => {
            const subjectGroup = subjectGroupsQuery.data.find(
                (sg) => sg.id === item.coeSubjectGroupId
            );
            const mitScale = mitScalesQuery.data.find(
                (ms) => ms.id === item.coemitScaleId
            );

            return {
                ...item,
                coeSubjectGroup: subjectGroup,
                coemitScale: mitScale
            };
        });
    }, [subjectGroupMITScalesQuery.data, subjectGroupsQuery.data, mitScalesQuery.data]);

    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        { header: "Mã nhóm môn học", accessorKey: "coeSubjectGroup.code" },
        { header: "Tên nhóm môn học", accessorKey: "coeSubjectGroup.name" },
        { header: "Mức Năng lực", accessorKey: "coemitScale.name", accessorFn: (row) => `${row.coemitScale?.code || ''} - ${row.coemitScale?.name || ''}` },
        { header: "Kiến thức", accessorKey: "coemitScale.knowledge" },
        { header: "Kĩ năng", accessorKey: "coemitScale.skill" },
        { header: "Tự chủ", accessorKey: "coemitScale.autonomy" },
        // { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        // { header: "Ngày cập nhật", accessorKey: "ngayCapNhat" },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "coeSubjectGroup.code", header: "Mã nhóm môn học" },
            { fieldName: "coeSubjectGroup.name", header: "Tên nhóm môn học" },
            { fieldName: "coemitScale.name", header: "Mức Năng lực" },
            { fieldName: "coemitScale.knowledge", header: "Kiến thức" },
            { fieldName: "coemitScale.skill", header: "Kĩ năng" },
            { fieldName: "coemitScale.autonomy", header: "Tự chủ" },
            // { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            // { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    const isLoading = subjectGroupsQuery.isLoading || mitScalesQuery.isLoading || subjectGroupMITScalesQuery.isLoading;

    if (isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <F_wfl5pwciof_Create />
                        <AQButtonCreateByImportFile
                            setImportedData={setImportData}
                            form={form_multiple}
                            onSubmit={() => console.log(form_multiple.values)}
                        >
                            Import
                        </AQButtonCreateByImportFile>
                        <AQButtonExportData
                            isAllData={true}
                            objectName="dsNhomMonHocMITScale"
                            data={combinedData}
                            exportConfig={exportConfig}
                        />
                        <Button leftSection={<IconTrash />} color="red">
                            Xóa
                        </Button>
                    </Group>
                )}
                columns={columns}
                data={combinedData || []}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F_wfl5pwciof_Update values={row.original} />
                        <F_wfl5pwciof_Delete id={row.original.id!} />
                    </MyCenterFull>
                )}
            />
        </MyFlexColumn>
    );
}

