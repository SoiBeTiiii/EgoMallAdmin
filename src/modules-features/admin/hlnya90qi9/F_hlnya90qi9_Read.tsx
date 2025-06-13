'use client';
import baseAxios from '@/api/baseAxios';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import useQ_COEGrade_GetSource from '@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetSource';
import useQ_COEGradeSubject_GetSubjectByGrade from '@/hooks/query-hooks/COEGradeSubject/useQ_COEGradeSubject_GetSubjectByGrade';
import { Button, Fieldset, Group, Modal, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCopy, IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_hlnya90qi9_Create from "./F_hlnya90qi9_Create";
import F_hlnya90qi9_Delete from "./F_hlnya90qi9_Delete";
import F_hlnya90qi9_CreateSubject from "./F_hlnya90qi9_UpdateProgram";

export default function FCoeICoeTrainingProgram_Read() {

    const COETrainingProgramQuery = useQ_COEGrade_GetSource()
    const [fileData, setFileData] = useState<any[]>([]);
    const [copyModalOpen, setCopyModalOpen] = useState(false);
    const [sourceCourse, setSourceCourse] = useState<ICoeGrade | null>(null);
    const [goalCourse, setGoalCourse] = useState<ICoeGrade | null>(null);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });
    const queryClient = useQueryClient();
    const params1 = `?COEGradeId=${sourceCourse?.id ?? 0}&cols=COESemester,COESubjectGroup,COESubject`
    const params2 = `?COEGradeId=${goalCourse?.id ?? 0}&cols=COESemester,COESubjectGroup,COESubject`
    const ENDPOINT = "/COEGradeSubject/GetSubjectByGrade"
    const SourceSubjectQuery = useQ_COEGradeSubject_GetSubjectByGrade({
        params: params1
    })

    const copySubjectMutation = useMutation({
        mutationFn: async ({
            goalTrainingProgramId,
            sourceTrainingProgram
        }: {
            goalTrainingProgramId: number,
            sourceTrainingProgram: ICoeGradeSubject
        }) => {
            const copiedSubject: ICoeGradeSubject = {
                id: 0,
                code: sourceTrainingProgram.code,
                name: sourceTrainingProgram.name,
                concurrencyStamp: sourceTrainingProgram.concurrencyStamp,
                isEnabled: sourceTrainingProgram.isEnabled,
                coeGradeId: goalTrainingProgramId,
                coeSubjectId: sourceTrainingProgram.coeSubjectId,
                coeSemesterId: sourceTrainingProgram.coeSemesterId,
                coeSubjectGroupId: sourceTrainingProgram.coeSubjectGroupId,
                order: sourceTrainingProgram.order,
                isCore: true,
                courseSectionQuantity: 0
            };
            const res = await baseAxios.post(`/COEGradeSubject/create`, copiedSubject);
            if (!res.data.isSuccess) {
                throw new Error(res.data.data[""] || 'Có lỗi xảy ra khi sao chép chương trình đào tạo!');
            }
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`/COEGrade/GetSource`] });
            queryClient.invalidateQueries({
                queryKey: [`${ENDPOINT}${params2}`]
            });
        },
    })

    // Handle Copy Course Function
    const handleCopyCourse = async () => {
        if (SourceSubjectQuery.data && SourceSubjectQuery.data.length > 0) {
            let hasError = false;
            let errorMessage = null;
            await Promise.all(SourceSubjectQuery.data.map(async (item) => {
                try {

                    await copySubjectMutation.mutateAsync({
                        goalTrainingProgramId: goalCourse?.id ?? 0,
                        sourceTrainingProgram: item,
                    });
                } catch (error) {
                    hasError = true;
                    errorMessage = error instanceof Error ? error.message : " Có lỗi xảy ra khi sao chép chương trình đào tạo! "
                }
            }));
            if (!hasError) {
                notifications.show({
                    message: "Copy thành công",
                    color: "green",
                });

            } else {
                notifications.show({
                    message: errorMessage || "No message",
                    color: "red",
                });
            }
            setCopyModalOpen(false);
        } else {
            notifications.show({
                message: "Không có môn học nào để sao chép!",
                color: 'red',
            });
            setCopyModalOpen(false);
        }
    };

    const columns = useMemo<MRT_ColumnDef<ICoeGrade>[]>(() => [
        { header: "Mã khóa", accessorKey: "code" },
        { header: "Tên khóa", accessorKey: "name" },
        { header: "Chương trình", accessorKey: "coeProgram.name" },
        { header: "Khoa", accessorKey: "coeProgram.coeUnit.name" },
        {
            header: "Tổng số môn học",
            accessorKey: "totalSubject",
        },
        { header: "Tổng số tín chỉ", accessorKey: "totalCredit" },
        {
            header: "Chương trình đào tạo",
            accessorKey: "capnhat",
            Cell: ({ row }) => {
                return <F_hlnya90qi9_CreateSubject
                    trainingProgramId={row.original.id ?? 0}
                    semesterStartId={row.original.coeSemesterStartId ?? 1}
                    semesterEndId={row.original.coeSemesterEndId ?? 1}
                />
            }
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",

        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
        },
    ], []);
    // Export config
    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "code", header: "Mã khóa" },
            { fieldName: "name", header: "Tên khóa" },
            { fieldName: "coeProgram.name", header: "Chương trình" },
            { fieldName: "coeProgram.coeUnit.name", header: "Khoa" },
            { fieldName: "totalPeriods", header: "Tổng số môn học" },
            { fieldName: "totalCredit", header: "Tổng số tín chỉ" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    // Handle loading/error states
    if (COETrainingProgramQuery.isLoading) return "Đang tải dữ liệu...";
    if (COETrainingProgramQuery.isError) return "Không có dữ liệu...";

    return (
        <Fieldset legend={`Danh sách chương trình đào tạo - Khóa học`}>
            <MyDataTable
                columns={columns}
                data={COETrainingProgramQuery.data!}
                enableRowSelection={true}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <F_hlnya90qi9_Create />
                        <AQButtonCreateByImportFile
                            setImportedData={setFileData}
                            onSubmit={() => { }}
                            form={form_multiple}
                        />
                        <AQButtonExportData
                            isAllData={true}
                            objectName="dsKhoa"
                            data={COETrainingProgramQuery.data!}
                            exportConfig={exportConfig}
                        />
                        <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                        <Button color="green" leftSection={<IconCopy />} onClick={() => setCopyModalOpen(true)}>Copy</Button>
                    </Group>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F_hlnya90qi9_Delete chosenOne={row.original} />
                    </MyCenterFull>
                )}
            />

            {/* Copy Course Modal */}
            <Modal opened={copyModalOpen} onClose={() => setCopyModalOpen(false)} title="Copy Chương trình đào tạo">
                <Select
                    label="Từ khóa"
                    placeholder="Chọn khóa để sao chép"
                    data={COETrainingProgramQuery.data?.map((item: ICoeGrade) => (
                        {
                            value: item?.id?.toString() || "",
                            label: item.name || ""
                        }
                    )) || []}
                    value={sourceCourse?.id?.toString() || "0"}
                    onChange={(value) => {
                        setSourceCourse(COETrainingProgramQuery.data?.find(course => course.id === Number(value)) || null)
                    }}
                />
                <Select
                    label="Đến khóa"
                    placeholder="Chọn khóa để sao chép"
                    data={COETrainingProgramQuery.data?.map((item: ICoeGrade) => (
                        {
                            value: item?.id?.toString() || "",
                            label: item.name || ""
                        }
                    )) || []}
                    value={goalCourse?.id?.toString() || "0"}
                    onChange={(value) => setGoalCourse(COETrainingProgramQuery.data?.find(course => course.id === Number(value)) || null)}
                />
                <Group mt="md" justify="center" gap="xl">
                    <Button
                        onClick={() => {
                            if (sourceCourse && goalCourse) {
                                if (sourceCourse.id === goalCourse.id) {
                                    notifications.show({
                                        message: "Không thể sao chép vào cùng khóa!",
                                        color: 'red',
                                    });
                                }
                                else {
                                    handleCopyCourse();
                                }
                            } else {
                                setCopyModalOpen(false);
                            }
                        }}
                        color="green"
                        loading={copySubjectMutation.isPending}
                    >Xác nhận</Button>
                    <Button onClick={
                        () => setCopyModalOpen(false)
                    } color="gray">Hủy thao tác</Button>
                </Group>
            </Modal>
        </Fieldset>
    );
}
// function SubjectCount({ trainingProgramId }: { trainingProgramId: number }) {
//     const query = useQ_COETrainingProgramDetail_GetSubjectByTrainingProgram({
//         trainingProgramId,
//         enabled: true,
//     });

//     return query.data && query.data.length || 0;
// }