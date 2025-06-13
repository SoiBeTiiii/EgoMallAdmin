'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import useM_COECourseSection_UpdateList from "@/hooks/mutation-hooks/COECourseSection/useM_COECourseSection_UpdateList";
import useQ_COEClass_GetCOECourseSectionByCOEGrade from "@/hooks/query-hooks/COECourseSection/useQ_COEClass_GetCOECourseSectionByCOEGrade";
import useQ_COEUnit_GetAll from "@/hooks/query-hooks/COEUnit/useQ_COEUnit_GetAll";
import { Button, Select } from "@mantine/core";
import { useForm } from '@mantine/form';
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import useS_afqdc7uf8b from "./useS_afqdc7uf8b";
export interface I {
    id?: number
    code?: string
    name?: string
    nhomHoc?: number
    soTinChi?: number
    soTiet?: number
    unitTeachingId?: number | null
    unitMeasurementId?: number | null
    unitAggregateId?: number | null
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}
export interface IUnit {
    id?: number;
    code?: string;
    name?: string;
    unitType?: number;
    unitId?: number;
    note?: string;
    unit?: IUnit;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

export default function F_afqdc7uf8b_Read() {
    const store = useS_afqdc7uf8b()
    const courseSectionUpdateListMutation = useM_COECourseSection_UpdateList()
    const unitQuery = useQ_COEUnit_GetAll({ options: { enabled: true } });
    const [importData, setImportData] = useState(false);
    const [studentAttendanceList, setStudentAttendanceList] = useState<ICOECourseSection[]>([])
    const PARAM = `?COEGradeId=${store.state.gradeId}`
    const courseSectionQuery = useQ_COEClass_GetCOECourseSectionByCOEGrade({ params: PARAM });
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const handleFieldChange = (row: ICOECourseSection, fieldName: keyof ICOECourseSection, fieldValue: any) => {
        if (fieldValue === undefined || fieldValue === null || fieldValue === "") fieldValue = null

        setStudentAttendanceList((prev) => {
            // Check if the row already exists in editedExams
            const existingIndex = prev.findIndex((item) => item.id === row.id);

            if (existingIndex !== -1) {
                // Update existing row
                const updatedExams = [...prev];
                updatedExams[existingIndex] = {
                    ...updatedExams[existingIndex],
                    [fieldName]: fieldValue
                };
                return updatedExams;
            } else {
                // Add new modified row
                return [...prev, {
                    ...row,
                    [fieldName]: fieldValue
                }];
            }
        });
    };
    console.log('====================================');
    console.log(courseSectionQuery.data);
    console.log('====================================');
    const columns = useMemo<MRT_ColumnDef<ICOECourseSection>[]>(() => [

        {
            header: "Mã môn học",
            accessorKey: "code",
        },
        {
            header: "Tên môn học",
            accessorKey: "name",
        },
        {
            header: "Nhóm học",
            accessorKey: "coeGradeSubject.coeSubject.name",
        },
        {
            header: "Số tín chỉ",
            accessorKey: "coeGradeSubject.coeSubject.numberCredit",
        },
        {
            header: "Số tiết",
            accessorKey: "coeGradeSubject.coeSubject.numberPeriod",
        },
        {
            header: "Đơn vị giảng dạy",
            accessorKey: "teachingUnitId",
            accessorFn: (row) =>
                <Select
                    placeholder='điểm danh'
                    data={unitQuery.data?.map((unit) =>
                        ({ value: unit.id?.toString() ?? '', label: unit.name ?? '' })) ?? []}
                    defaultValue={row.teachingUnitId?.toString()}
                    onChange={(value) => {
                        handleFieldChange(row, "teachingUnitId", value === null ? null : parseInt(value))
                    }}
                />
        },
        {
            header: "Đơn vị đo lường",
            accessorKey: "measureUnitId",
            accessorFn: (row) =>
                <Select
                    placeholder='điểm danh'
                    data={unitQuery.data?.map((unit) =>
                        ({ value: unit.id?.toString() ?? '', label: unit.name ?? '' })) ?? []}
                    defaultValue={row.measureUnitId?.toString()}
                    onChange={(value) => {
                        handleFieldChange(row, "measureUnitId", value === null ? null : parseInt(value))
                    }}
                />
        },
        {
            header: "Đơn vị tổng hợp",
            accessorKey: "collectUnitId",
            accessorFn: (row) =>
                <Select
                    placeholder='điểm danh'
                    data={unitQuery.data?.map((unit) =>
                        ({ value: unit.id?.toString() ?? '', label: unit.name ?? '' })) ?? []}
                    defaultValue={row.collectUnitId?.toString()}
                    onChange={(value) => {
                        handleFieldChange(row, "collectUnitId", value === null ? null : parseInt(value))
                    }}
                />
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
    ], [unitQuery.data]);

    if (courseSectionQuery.isLoading) return "Đang tải dữ liệu...";
    if (courseSectionQuery.isError) return "Không có dữ liệu...";
    if (unitQuery.isLoading) return "Đang tải dữ liệu...";
    if (unitQuery.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            exportAble
            enableRowSelection={true}
            columns={columns}
            data={courseSectionQuery.data!}
            renderTopToolbarCustomActions={() =>
                <>
                    <Button color="green" onClick={() => {
                        console.log('====================================');
                        console.log(studentAttendanceList);
                        console.log('====================================');
                        courseSectionUpdateListMutation.mutate(studentAttendanceList)
                    }}>Lưu</Button>
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }

        />
    );
}