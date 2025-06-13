'use client'
import MySelect from "@/components/Combobox/Select/MySelect";
import useQ_COEGrade_GetGradeByProgram from "@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetGradeByProgram";
import useQ_COEProgram_GetAll from "@/hooks/query-hooks/COEProgram/useQ_COEProgram_GetAll";
import { Group } from "@mantine/core";
import { useEffect, useState } from "react";
import useS_upgwbnmsn8 from "./useS_upgwbnmsn8";

export default function F_upgwbnmsn8_Filter() {
  const store = useS_upgwbnmsn8()
  const [programId, setProgramId] = useState<number | undefined>(0)
  const programs = useQ_COEProgram_GetAll()
  const grades = useQ_COEGrade_GetGradeByProgram({
    params: `?COEProgramId=${programId}`,
    option: {
      enabled: programId != undefined && programId != 0
    }
  })

  useEffect(() => {
    // Load mặc định program đầu tiên
    if (!programs.data) return
    setProgramId(programs.data[0].id)
    store.setProperty("programId", programs.data[0].id)
    store.setProperty("programCode", programs.data[0].code)
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
  }, [grades.data])

  return (
    <Group>
      <MySelect
        label="Chương trình"
        data={programs.data?.map(item => ({
          value: item.id!.toString(),
          label: item.code + " - " + item.name
        })) || []}
        value={programId?.toString()}
        onChange={(value, option) => {
          const id = parseInt(value!)
          setProgramId(id)
          store.setProperty("programId", id)
          store.setProperty("programCode", option.label.split(" - ")[0])
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
