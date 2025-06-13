'use client'

import baseAxios from "@/api/baseAxios"
import MySelect from "@/components/Combobox/Select/MySelect"
import { Group } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import CoreSubjectTable from "./CoreSubjectTable"

export default function CLOCoreSubjectLayout() {
    const programIdState = useState<number | undefined | null>(null)
    const gradeIdState = useState<number | undefined | null>(null)
    let [allProgramsData, setAllProgramsData] = useState<any[]>([])

    const allPrograms = useQuery<any>({
        queryKey: ["CLOCoreSubjectLayoutGrade"],
        queryFn: async () => {
            const res = await baseAxios.get("/COEProgram/getAll")
            programIdState[1](res.data.data[0].id)
            setAllProgramsData(res.data.data)
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    const allGradesByProgramId = useQuery<any>({
        queryKey: ["CLOCoreSubjectLayoutGrade"],
        queryFn: async () => {
            const res = await baseAxios.get("/COEGrade/GetGradeByProgram?COEProgramId=" + programIdState[0])
            gradeIdState[1](res.data.data[0].id)
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        allGradesByProgramId.refetch()
    }, [programIdState[0]])

    return (
        <>
            <Group>
                <MySelect
                    label="Chương trình"
                    data={allProgramsData.map((item: any) => ({
                        value: item.id!.toString(),
                        label: item.code + " - " + item.name
                    })) || []}
                    value={programIdState[0]?.toString()}
                    onChange={(value, option) => {
                        programIdState[1](parseInt(value!))
                    }}
                />

                <MySelect
                    label="Khóa"
                    data={allGradesByProgramId.data?.map((item: any) => ({
                        value: item.id!.toString(),
                        label: item.code + " - " + item.name
                    })) || []}
                    value={gradeIdState[0]?.toString()}
                    onChange={(value, option) => {
                        gradeIdState[1](parseInt(value!))
                    }}
                />
            </Group>
            <CoreSubjectTable gradeId={gradeIdState[0]} />
        </>
    )
}