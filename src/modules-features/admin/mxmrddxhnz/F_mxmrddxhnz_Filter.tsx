'use client'
import MySelect from "@/components/Combobox/Select/MySelect";
import useQ_COEGrade_GetGradeByProgram from "@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetGradeByProgram";
import useQ_COEProgram_GetAll from "@/hooks/query-hooks/COEProgram/useQ_COEProgram_GetAll";
import { Group } from "@mantine/core";
import { useEffect, useState } from "react";
import useS_mxmrddxhnz from "./useS_mxmrddxhnz";

export default function F_mxmrddxhnz_Filter() {
    const store = useS_mxmrddxhnz()
    const programIdState = useState<number | undefined>(0)
    const programs = useQ_COEProgram_GetAll()
    const grades = useQ_COEGrade_GetGradeByProgram({
        params: `?COEProgramId=${programIdState[0]}`
    })

    useEffect(() => {
        // Load mặc định program đầu tiên
        if (!programs.data) return
        programIdState[1](programs.data[0].id)
    }, [programs.data])

    useEffect(() => {
        if (!grades.data) return
        if (grades.data.length == 0) {
            store.setProperty("noData", true)
            return
        }
        store.setProperty("noData", false)
        store.setProperty("gradeId", grades.data[0].id)
        store.setProperty("gradeCode", grades.data[0].code)
        store.setProperty("programId", programIdState[0])
    }, [grades.data])

    return (
        <Group>
            <MySelect
                label="Chương trình"
                data={programs.data?.map(item => ({
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
                data={grades.data?.map(item => ({
                    value: item.id!.toString(),
                    label: item.code + " - " + item.name
                })) || []}
                value={store.state.gradeId?.toString()}
                onChange={(value, option) => {
                    store.setProperty("gradeId", parseInt(value!))
                    store.setProperty("gradeCode", option.label.split(" - ")[0])
                }}
            />
        </Group>
    )
}
