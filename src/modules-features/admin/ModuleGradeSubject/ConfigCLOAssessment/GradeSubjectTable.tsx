'use client'

import baseAxios from "@/api/baseAxios"
import MyCenterFull from "@/components/CenterFull/MyCenterFull"
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable"
import { Button, Flex, Group, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table"
import { useMemo, useState } from "react"
import ConfigCLOAssessmentModalContent from "./ConfigCLOAssessmentModalContent"
import { IGradeSubject } from "./Interfaces"

export default function GradeSubjectTable({ gradeId }: { gradeId: number | undefined | null }) {
    const discConfigCLOAssessmentModal = useDisclosure(false)
    const currentValues = useState<IGradeSubject>({})
    const SelectedSubject = useState<IGradeSubject[]>()
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    const allGradeSubjectsByGradeId = useQuery<IGradeSubject[]>({
        queryKey: ["GradeSubjectTable", gradeId],
        queryFn: async () => {
            if (!gradeId) return []
            let cols = "COEGrade,COESemester,COESubject,COEGradeSubjectAssessments,COEGradeSubjectAssessments.COEAssessment"
            const res = await baseAxios.get(`/COEGradeSubject/GetSubjectByGrade?COEGradeId=${gradeId}&cols=${cols}`)
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    const columns = useMemo<MRT_ColumnDef<IGradeSubject>[]>(() => [
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
            header: "Số tín chỉ",
            accessorKey: "coeSubject.numberCredit"
        },
        {
            header: "Số tiết",
            accessorKey: "coeSubject.numberPeriod"
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

    const handleOnClickConfigCLOAssessmentButton = (row: IGradeSubject) => {
        discConfigCLOAssessmentModal[1].open()
        currentValues[1](row)
    }

    const handleOnCloseConfigCLOAssessmentModal = () => {
        discConfigCLOAssessmentModal[1].close()
        currentValues[1]({})
    }

    return (
        <>
            <MyDataTable
                columns={columns}
                data={allGradeSubjectsByGradeId.data || []}
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
                    </Group>
                )}
                renderRowActions={({ row }: any) => {
                    return (
                        <MyCenterFull>
                            <Button
                                color="indigo"
                                onClick={() => handleOnClickConfigCLOAssessmentButton(row.original)}>
                                Cập nhật
                            </Button>

                        </MyCenterFull>
                    );
                }}>
            </MyDataTable >
            <Modal
                size={"100%"}
                centered={false}
                fullScreen={false}
                title={"Chi tiết chuẩn đầu ra môn học"}
                opened={discConfigCLOAssessmentModal[0]}
                onClose={handleOnCloseConfigCLOAssessmentModal}
            >
                <Flex h={"80vh"} w={'80vw'} direction={"column"} gap={"md"}>
                    <ConfigCLOAssessmentModalContent
                        gradeSubjectValues={currentValues[0]}
                        modalDiscState={discConfigCLOAssessmentModal[0]}
                    />
                </Flex>
            </Modal>
        </>
    )
}