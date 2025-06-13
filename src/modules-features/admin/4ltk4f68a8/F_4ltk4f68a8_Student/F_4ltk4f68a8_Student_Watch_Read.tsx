'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import useQ_COEClass_FindByClassIds from "@/hooks/query-hooks/COEClass/useQ_COEClass_FindByClassIds";
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_4ltk4f68a8_Student_Create from "./F_4ltk4f68a8_Student_Create";
import F_4ltk4f68a8_Student_Delete from "./F_4ltk4f68a8_Student_Delete";
import F_4ltk4f68a8_Student_Update from "./F_4ltk4f68a8_Student_Update";

export interface IStudent {
    id?: number; // STT
    studentCode?: string; // Mã sinh viên
    studentName?: string; // Họ tên
    dateOfBirth?: Date | undefined; // Ngày sinh
    genderId?: number
    gender?: string; // Giới tính
    codeClass?: string; // Mã lớp
    nameClass?: string; // Tên lớp
    courseCode?: string; // Mã khóa
    courseName?: string; // Tên khóa
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_Student_Read({ data }: { data: ICOEClass }) {
    const PARAM = `?ClassIds=${data.id}&cols=Users`
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    const dis = useDisclosure()
    const form = useForm<ICOEClassStudent>({
        initialValues: {},
    });

    // Query to fetch mock data
    const studentByClassQuery = useQ_COEClass_FindByClassIds({
        params: PARAM,
        options: {
            enabled: dis[0]
        }
    })
    const columns = useMemo<MRT_ColumnDef<ICOEClassStudent>[]>(() => [
        { header: "Mã SV", accessorKey: "code" },
        { header: "Họ và Tên", accessorKey: "fullName" },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            accessorFn: (row) => row.dateOfBirth ? U0DateToDDMMYYYString(new Date(row.dateOfBirth)) : "",
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
            accessorFn: (row) => row.gender === 1 ? "Nam" : "Nữ",
        },
        {
            header: "Mã lớp",
            accessorKey: "coeCourseSection.code",
            accessorFn: (row) => data.code,

        },
        {
            header: "Tên lớp",
            accessorKey: "coeCourseSection.name",
            accessorFn: (row) => data.name,
        },
        {
            header: "Mã khóa",
            accessorKey: "coeCourseSection.coeGrade.code",
            accessorFn: (row) => data.coeGrade?.code,

        },
        {
            header: "Tên khóa",
            accessorKey: "coeCourseSection.coeGrade.name",
            accessorFn: (row) => data.coeGrade?.name,

        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "studentCode", header: "Mã SV" },
            { fieldName: "studentName", header: "Họ tên" },
            { fieldName: "dateOfBirth", header: "Ngày sinh" },
            { fieldName: "gender", header: "Giới tính" },
            { fieldName: "classCode", header: "Mã lớp" },
            { fieldName: "className", header: "Tên lớp" },
            { fieldName: "courseCode", header: "Mã khóa" },
            { fieldName: "courseName", header: "Tên khóa" },
            {
                header: "Người cập nhật",
                fieldName: "nguoiCapNhat"
            },
            {
                header: "Ngày cập nhật",
                fieldName: "ngayCapNhat",
            }
        ],
    };

    if (studentByClassQuery.isLoading) return "Loading...";

    return (
        <MyButtonModal label="Xem/Cập nhập" title="Danh sách sinh viên" modalSize={'100%'} disclosure={dis}>
            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <F_4ltk4f68a8_Student_Create data={data} />
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form_multiple}
                                onSubmit={() => console.log(form_multiple.values)}
                            >
                                Import
                            </AQButtonCreateByImportFile>
                            <AQButtonExportData
                                isAllData={true}
                                objectName="dsStudent"
                                data={studentByClassQuery.data?.[0]?.users ?? []}
                                exportConfig={exportConfig}
                            />
                            <Button leftSection={<IconTrash />} color="red">
                                Xóa
                            </Button>
                        </Group>
                    )}
                    columns={columns}
                    data={studentByClassQuery.data?.[0]?.users ?? []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <F_4ltk4f68a8_Student_Update data={row.original} />
                            <F_4ltk4f68a8_Student_Delete id={row.original.id!} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyButtonModal>
    );
}

const data: IStudent[] = [

];
