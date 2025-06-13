'use client'

import baseAxios from "@/api/baseAxios"
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable"
import { Button, Group, Modal, NumberInput, Text, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconCopyX, IconLibraryPlus } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table"
import { useMemo, useState } from "react"
import { ICoreSubject } from "./Interfaces"

export default function CoreSubjectTable({ gradeId }: { gradeId: number | undefined | null }) {

    const [editedCoreSubjects, setEditedCoreSubjects] = useState<ICoreSubject[]>([]);

    const discCreateCourseSection = useDisclosure(false);
    const discDeleteCourseSection = useDisclosure(false);

    const SelectedSubject = useState<ICoreSubject[]>()
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    const allSubjectsByGradeId = useQuery<ICoreSubject[]>({
        queryKey: ["CoreSubjectTable", gradeId],
        queryFn: async () => {
            if (!gradeId) return []
            const res = await baseAxios.get(`/COEGradeSubject/GetSubjectByCore?COEGradeId=${gradeId}&IsCore=true&cols=COESemester,COESubject,COEGrade,COESubjectGroup`)
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    const columns = useMemo<MRT_ColumnDef<ICoreSubject>[]>(() => [
        {
            header: "Năm học Học kỳ",
            accessorKey: "coeSemester.name",
        },
        {
            header: "Thứ tự",
            accessorKey: "order"
        },
        {
            header: "Mã môn học",
            accessorKey: "coeSubject.code"
        },
        {
            header: "Tên môn học",
            accessorKey: "coeSubject.name"
        },
        {
            header: "Nhóm môn học",
            accessorKey: "coeSubjectGroup.name"
        },
        {
            header: "Số tín chỉ",
            accessorKey: "coeSubject.numberCredit"
        },
        {
            header: "Số tiết",
            accessorKey: "coeSubject.numberPeriod"
        },
        {
            header: "Số lượng nhóm học",
            Cell: ({ row }) => {
                return <NumberInput
                    placeholder="Nhập số tiết"
                    defaultValue={row.original.courseSectionQuantity}
                    onChange={(value) => handleFieldChange(row.original, "courseSectionQuantity", Number(value))}
                />
            }
        },
        {
            header: "Số nhóm đã tạo",
            accessorKey: "courseSectionQuantityActual"
        },
        // {
        //     header: "Người cập nhật",
        //     accessorKey: "modifiedBy",
        // },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "modifiedWhen",
        //     accessorFn(originalRow) {
        //         return U0FormatToDateTimetring(new Date(originalRow.modifiedWhen!));
        //     },
        // }
    ], []);

    const handleFieldChange = (row: ICoreSubject, fieldName: keyof ICoreSubject, fieldValue: any) => {
        if (fieldValue === undefined || fieldValue === null || fieldValue === "") fieldValue = null

        setEditedCoreSubjects((prev) => {
            // Check if the row already exists in editedCoreSubjects
            const existingIndex = prev.findIndex((item) => item.id === row.id);

            if (existingIndex !== -1) {
                // Update existing row
                const updatedCoreSubjects = [...prev];
                updatedCoreSubjects[existingIndex] = {
                    ...updatedCoreSubjects[existingIndex],
                    [fieldName]: fieldValue
                };
                return updatedCoreSubjects;
            } else {
                // Add new modified row
                return [...prev, {
                    ...row,
                    [fieldName]: fieldValue
                }];
            }
        });
    };

    const handleSaveButton = async () => {
        const updatedCoreSubjects = editedCoreSubjects.map((CoreSubject) => ({
            id: CoreSubject.id,
            code: CoreSubject.code,
            name: CoreSubject.name,
            concurrencyStamp: CoreSubject.concurrencyStamp,
            isEnabled: CoreSubject.isEnabled,
            coeGradeId: CoreSubject.coeGradeId,
            coeSubjectId: CoreSubject.coeSubjectId,
            coeSemesterId: CoreSubject.coeSemesterId,
            coeSubjectGroupId: CoreSubject.coeSubjectGroupId,
            order: CoreSubject.order,
            isCore: CoreSubject.isCore,
            courseSectionQuantity: CoreSubject.courseSectionQuantity,
        }));

        let response = await baseAxios.post("/COEGradeSubject/UpdateList", updatedCoreSubjects);
        if (response.data.isSuccess === 1) {
            notifications.show({
                title: "Lưu thành công",
                message: "Dữ liệu đã được lưu",
                color: "green"
            })
            setEditedCoreSubjects([]);
        }
        if (response.data.isSuccess !== 1) {
            notifications.show({
                title: "Thao tác thất bại",
                message: "Dữ liệu chưa được lưu",
                color: "red"
            })
            setEditedCoreSubjects([]);
        }
    };

    let handleAPICreateCourseSection = async () => {
        if (!SelectedSubject[0] || SelectedSubject[0].length === 0) return;
        const selectedSubjects = SelectedSubject[0].map((subject: ICoreSubject) => ({
            id: subject.id,
            code: subject.code,
            name: subject.name,
            concurrencyStamp: subject.concurrencyStamp,
            isEnabled: subject.isEnabled,
            coeGradeId: subject.coeGradeId,
            coeSubjectId: subject.coeSubjectId,
            coeSemesterId: subject.coeSemesterId,
            coeSubjectGroupId: subject.coeSubjectGroupId,
            order: subject.order,
            isCore: subject.isCore,
            courseSectionQuantity: subject.courseSectionQuantity,
        }))

        let response = await baseAxios.post("/COEGradeSubject/CreateCourseSection", selectedSubjects);
        if (response.data.isSuccess === 1) {
            notifications.show({
                title: "Thao tác thành công",
                message: "Dữ liệu đã được lưu",
                color: "green"
            })
            discCreateCourseSection[1].close();
        }
        if (response.data.isSuccess !== 1) {
            notifications.show({
                title: "Thao tác thất bại",
                message: "Dữ liệu chưa được lưu",
                color: "red"
            })
            discCreateCourseSection[1].close();
        }

        SelectedSubject[1]([]);
        setRowSelection({});
    }

    let handleAPIDeleteCourseSection = async () => {
        if (!SelectedSubject[0] || SelectedSubject[0].length === 0) return;
        const selectedSubjects = SelectedSubject[0].map((subject: ICoreSubject) => (
            subject.id
        ));

        let response = await baseAxios.put("/COEGradeSubject/RemoveAllCourseSection", selectedSubjects);
        if (response.data.isSuccess === 1) {
            notifications.show({
                title: "Thao tác thành công",
                message: "Dữ liệu đã được lưu",
                color: "green"
            })
            discCreateCourseSection[1].close();
        }
        if (response.data.isSuccess !== 1) {
            notifications.show({
                title: "Thao tác thất bại",
                message: "Dữ liệu chưa được lưu",
                color: "red"
            })
            discCreateCourseSection[1].close();
        }


        SelectedSubject[1]([]);
        setRowSelection({});
    }

    return (
        <>
            <MyDataTable
                columns={columns}
                data={allSubjectsByGradeId.data || []}
                initialState={{
                    density: "md",
                    pagination: { pageIndex: 0, pageSize: 10 },
                }}
                enableRowSelection={true}
                setSelectedRow={SelectedSubject[1]}
                onRowSelectionChange={setRowSelection}
                state={{ rowSelection }}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <Button
                            color="teal"
                        >Export
                        </Button>
                        <Button
                            disabled={editedCoreSubjects.length === 0}
                            color="blue"
                            onClick={handleSaveButton}
                        >Cập nhật dữ liệu môn học
                        </Button>
                        <Button
                            disabled={SelectedSubject[0]?.length === 0}
                            color="green" leftSection={<IconLibraryPlus />}
                            onClick={() => {
                                discCreateCourseSection[1].open()
                            }}
                        >Tạo nhóm
                        </Button>
                        <Button
                            disabled={SelectedSubject[0]?.length === 0}
                            color="red" leftSection={<IconCopyX />}
                            onClick={() => {
                                discDeleteCourseSection[1].open()
                            }}
                        >Xóa nhóm
                        </Button>
                    </Group>
                )}>
            </MyDataTable>

            <Modal opened={discCreateCourseSection[0]} onClose={discCreateCourseSection[1].close} title="Tạo nhóm lớp cho môn học">
                <Group mt={10} justify="center">
                    <Title order={5} fw={400}>
                        Bạn đang <Text span fw={700} tt="uppercase" c="green" inherit>tạo nhóm lớp</Text> cho <Text span fw={600} inherit>{SelectedSubject[0]?.length}</Text> môn được chọn?
                        Bạn có chắc chắn về thao tác này?

                        {SelectedSubject[0]?.some(subject =>
                            (subject.courseSectionQuantity ?? 0) < (subject.courseSectionQuantityActual ?? 0)
                        ) && (
                                <Text fw={700} c="red" ta="center" mt={5}>
                                    Cảnh báo: Có môn học với số nhóm cần tạo ít hơn số nhóm đã tạo!
                                    Không thể thực hiện thao tác này.
                                </Text>
                            )}
                    </Title>
                </Group>
                <Group mt="xl" justify="center" grow>
                    <Button
                        disabled={
                            SelectedSubject[0] === undefined || SelectedSubject[0]?.length === 0 ||
                            SelectedSubject[0]?.some(subject =>
                                (subject.courseSectionQuantity ?? 0) < (subject.courseSectionQuantityActual ?? 0)
                            )
                        }
                        color="green"
                        onClick={handleAPICreateCourseSection}
                    >
                        Xác nhận
                    </Button>
                    <Button
                        color="gray"
                        onClick={
                            discCreateCourseSection[1].close
                        }
                    >
                        Kiểm tra lại
                    </Button>
                </Group>
            </Modal>


            <Modal opened={discDeleteCourseSection[0]} onClose={discDeleteCourseSection[1].close} title="Hủy hoàn thành giảng dạy">
                <Group mt={10} justify="center">
                    <Title order={5} fw={400}>
                        Bạn đang <Text span fw={700} tt="uppercase" c="red" inherit>xóa tất cả</Text> nhóm lớp của <Text span fw={600} inherit>{SelectedSubject[0]?.length}</Text> môn học được chọn?
                        Bạn có chắc chắn về thao tác này?
                    </Title>
                </Group>
                <Group mt="xl" justify="center" grow>
                    <Button
                        color="green"
                        onClick={handleAPIDeleteCourseSection}
                    >
                        Xác nhận
                    </Button>
                    <Button
                        color="gray"
                        onClick={
                            discDeleteCourseSection[1].close
                        }
                    >
                        Kiểm tra lại
                    </Button>
                </Group>
            </Modal>
        </>
    )
}