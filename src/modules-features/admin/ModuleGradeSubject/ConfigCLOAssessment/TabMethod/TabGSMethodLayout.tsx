'use client'

import baseAxios from "@/api/baseAxios"
import { Flex, Group, Select } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { IGSAssessment } from "../TabAssessment/Interfaces"
import { IGSFormula } from "../TabFormula/Interfaces"
import GSMethodTable from "./GSMethodTable"

enum formulaType {
    "Chuyên cần" = 1,
    "Quá trình" = 2,
    "Cuối kỳ" = 3
}

export default function TabGSMethodLayout({ gradeSubjectId }: { gradeSubjectId?: number }) {
    const formulaIdState = useState<number | null>(null)
    const assessmentIdState = useState<number | null>(null)

    const formulaValues = useState<IGSFormula | undefined>(undefined)
    const assessmentValues = useState<IGSAssessment | undefined>(undefined)

    const allGSFormula = useQuery<IGSFormula[]>({
        queryKey: [`GSFormulaFilterGSId`, gradeSubjectId],
        queryFn: async () => {
            if (!gradeSubjectId) return [];
            const response = await baseAxios.get(`/COESubjectFormula/FindByGradeSubject?coeGradeSubjectId=${gradeSubjectId}`);
            formulaIdState[1](response.data.data[0].id)
            return response.data.data || [];
        },
        refetchOnWindowFocus: false
    })

    const allGSAssessmentByGSFormula = useQuery<IGSAssessment[]>({
        queryKey: [`GSAssessmentFilterGSId`, gradeSubjectId, formulaIdState[0]],
        queryFn: async () => {
            if (formulaIdState[0] === null) return [];
            const response = await baseAxios.get(`/COESubjectAssessment/GetAssessmentByFormula?coeFormulaId=${formulaIdState[0]}`)
            assessmentIdState[1](response.data.data[0].coeSubjectAssessments[0].id)
            return response.data.data[0].coeSubjectAssessments || [];
        },
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        assessmentIdState[1](null)
        allGSAssessmentByGSFormula.refetch()
    }, [formulaIdState[0]])

    useEffect(() => {
        formulaValues[1](allGSFormula.data?.find((item: IGSFormula) => item.id === formulaIdState[0]))
    }, [formulaIdState[0]])

    useEffect(() => {
        assessmentValues[1](allGSAssessmentByGSFormula.data?.find((item: IGSAssessment) => item.id === assessmentIdState[0]))
    }, [assessmentIdState[0]])

    return (
        <>
            <Flex
                gap="md"
                justify="center"
                direction="column"
            >
                <Group >
                    <Select
                        w={{ base: '100%', md: '20%' }}
                        placeholder={"Chọn hình thức đánh giá CA"}
                        label="Hình thức đánh giá CA"
                        data={allGSFormula.data?.map((item: IGSFormula) => (
                            {
                                value: item.id!.toString(),
                                label: formulaType[item.formulaType!]
                            }
                        )) || []}
                        value={formulaIdState[0]?.toString()}
                        onChange={(value, option) => {
                            formulaIdState[1](parseInt(value!))
                        }}
                    />
                    <Select
                        w={{ base: '100%', md: '75%' }}
                        placeholder={"Chọn nội dung đánh giá"}
                        label="Nội dung đánh giá"
                        data={allGSAssessmentByGSFormula.data?.map((item: IGSAssessment) => ({
                            value: item.id!.toString(),
                            label: item.content === null ? 'Không có dữ liệu nội dung' : item.content!
                        })) || []}
                        value={assessmentIdState[0] === null ? null : assessmentIdState[0]?.toString()}
                        onChange={(value, option) => {
                            assessmentIdState[1](parseInt(value!))
                        }}
                    />
                </Group>
                <GSMethodTable
                    assessmentId={assessmentIdState[0]}
                    formulaValues={formulaValues[0]}
                    assessmentValues={assessmentValues[0]}
                    gradeSubjectId={gradeSubjectId}
                />
            </Flex>
        </>
    )
}