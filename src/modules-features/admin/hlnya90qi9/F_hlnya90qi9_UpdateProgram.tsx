'use client';
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import useQ_COEGradeSubject_GetSubjectByGrade from "@/hooks/query-hooks/COEGradeSubject/useQ_COEGradeSubject_GetSubjectByGrade";
import useQ_COESemester_getAll from "@/hooks/query-hooks/COESemester/useQ_COESemester_getAll";
import useQ_COESubjectGroup_getAll from "@/hooks/query-hooks/COESubjectGroup/useQ_COESubjectGroup_getAll";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_hlnya90qi9_CreateSubjects from "./F_hlnya90qi9_CreateSubjects";
import F_hlnya90qi9_DeleteSubject from "./F_hlnya90qi9_DeleteSubject";
import F_hlnya90qi9_UpdateSubject from "./F_hlnya90qi9_UpdateSubject";

export default function F_hlnya90qi9_UpdateProgram({
    trainingProgramId,
    cols,
    semesterStartId,
    semesterEndId
}: {
    trainingProgramId: number,
    cols?: string,
    semesterStartId: number,
    semesterEndId: number
}) {
    const params = `?COEGradeId=${trainingProgramId}&cols=COESemester,COESubjectGroup,COESubject`
    // const ENDPOINT = "/COEGradeSubject/GetSubjectByGrade"
    const disMain = useDisclosure();  // Main modal
    const subjectByGradeQuery = useQ_COEGradeSubject_GetSubjectByGrade({
        params: params
    })
    const SemesterQuery = useQ_COESemester_getAll(true);
    const availableSemester = useMemo(() => {
        return SemesterQuery.data?.filter(item => item.id && item.id >= semesterStartId && item.id <= semesterEndId) || [];
    }, [SemesterQuery.data, semesterStartId, semesterEndId]);
    const SubjectGroupQuery = useQ_COESubjectGroup_getAll(true);


    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    // Cấu hình cột cho bảng
    const columns = useMemo<MRT_ColumnDef<ICoeGradeSubject>[]>(() => [
        {
            header: "Năm học Học kỳ",
            accessorKey: "coeSemester.name",
        },
        {
            header: "Thứ tự",
            accessorKey: "order",
        },
        {
            header: "Mã môn học",
            accessorKey: "coeSubject.code",
        },
        { header: "Tên môn học", accessorKey: "coeSubject.name" },
        { header: "Nhóm môn học", accessorKey: "coeSubjectGroup.name" },
        { header: "Số tín chỉ", accessorKey: "coeSubject.numberCredit" },
        { header: "Số tiết", accessorKey: "coeSubject.numberPeriod" },
        { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
        },
    ], []);

    const exportConfig = {
        fields: [
            {
                header: "Năm thứ",
                fieldName: "year"
            },
            {
                header: "Học kỳ",
                fieldName: "order"
            },
            {
                header: "Mã môn học",
                fieldName: "code"
            },
            {
                header: "Tên môn học",
                fieldName: "name"
            },
            {
                header: "Số tín chỉ",
                fieldName: "credit"
            },
            {
                header: "Người cập nhật",
                fieldName: "nguoiCapNhat"
            },
            {
                header: "Ngày cập nhật",
                fieldName: "ngayCapNhat",
            }
        ]
    }

    // Kiểm tra trạng thái của query
    if (subjectByGradeQuery.isLoading) return "Đang tải dữ liệu...";
    if (subjectByGradeQuery.isError) return "Không có dữ liệu...";

    return (
        <MyButtonModal label="Cập nhập" title="Chi tiết chương trình đào tạo khóa" modalSize={'100%'} disclosure={disMain}>
            <MyDataTable
                columns={columns}
                data={subjectByGradeQuery.data!}
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={() => (
                    <>
                        <F_hlnya90qi9_CreateSubjects
                            trainingProgramId={trainingProgramId}
                            availableSemester={availableSemester}
                            subjectGroupData={SubjectGroupQuery.data || []}
                        />
                        <AQButtonCreateByImportFile
                            setImportedData={setFileData}
                            onSubmit={() => { }}
                            form={form_multiple}
                        >s</AQButtonCreateByImportFile>
                        <AQButtonExportData
                            isAllData={true}
                            objectName="dsChiTietChuongTrinhDaoTaoKhoa"
                            data={subjectByGradeQuery.data!}
                            exportConfig={exportConfig}
                        />
                        <MyButton crudType="delete" />
                    </>
                )}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F_hlnya90qi9_UpdateSubject
                                subjectGroupData={SubjectGroupQuery.data || []}
                                values={row.original}
                                availableSemester={availableSemester || []}
                            />
                            <F_hlnya90qi9_DeleteSubject chosenOne={row.original!} />
                        </MyCenterFull>
                    );
                }}
            />
        </MyButtonModal>
    );
}


