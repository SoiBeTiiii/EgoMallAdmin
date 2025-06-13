'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import useQ_COEClass_GetAll from "@/hooks/query-hooks/COEClass/useQ_COEClass_GetAll";
import { Button, Fieldset, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_4ltk4f68a8_Create from "./F_4ltk4f68a8_Create";
import F_4ltk4f68a8_Delete from "./F_4ltk4f68a8_Delete";
import F_4ltk4f68a8_Student_Watch_Read from "./F_4ltk4f68a8_Student/F_4ltk4f68a8_Student_Watch_Read";
import F_4ltk4f68a8_Update from "./F_4ltk4f68a8_Update";


export default function F_4ltk4f68a8_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const form = useForm<ICOEClass>({
        initialValues: {},
    });

    // Query to fetch mock data
    const COECourseSectionQuery = useQ_COEClass_GetAll({
        params: "?cols=COEGrade"
    })

    const columns = useMemo<MRT_ColumnDef<ICOEClass>[]>(() => [
        { header: "Mã lớp", accessorKey: "code" },
        { header: "Tên lớp", accessorKey: "name" },
        { header: "Mã khóa", accessorKey: "coeGrade.code" },
        { header: "Tên khóa", accessorKey: "coeGrade.name" },
        { header: "Sĩ số lớp", accessorKey: "totalStudent" },
        {
            header: "Danh sách lớp", accessorKey: "classList", accessorFn(row) {
                return (
                    <F_4ltk4f68a8_Student_Watch_Read data={row} />
                )
            }
        },
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
        // }
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "codeClass", header: "Mã lớp" },
            { fieldName: "nameClass", header: "Tên lớp" },
            { fieldName: "courseCode", header: "Mã khóa" },
            { fieldName: "courseName", header: "Tên khóa" },
            { fieldName: "classSize", header: "Sĩ số lớp" },
            { fieldName: "classList", header: "Danh sách lớp" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    if (COECourseSectionQuery.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <Fieldset legend={`Danh sách lớp`}>

                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <F_4ltk4f68a8_Create />
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form_multiple}
                                onSubmit={() => console.log(form_multiple.values)}
                            >
                                Import
                            </AQButtonCreateByImportFile>
                            <AQButtonExportData
                                isAllData={true}
                                objectName="dsClass"
                                data={COECourseSectionQuery.data!}
                                exportConfig={exportConfig}
                            />
                            <Button leftSection={<IconTrash />} color="red">
                                Xóa
                            </Button>
                        </Group>
                    )}
                    columns={columns}
                    data={COECourseSectionQuery.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <F_4ltk4f68a8_Update data={row.original} />
                            <F_4ltk4f68a8_Delete id={row.original.id!} />
                        </MyCenterFull>
                    )}
                />
            </Fieldset>
        </MyFlexColumn>
    );
}

