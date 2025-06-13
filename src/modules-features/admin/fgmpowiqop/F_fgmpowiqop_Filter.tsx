'use client'
import MySelect from "@/components/Combobox/Select/MySelect";
import useQ_COEClass_FindByGradeId from "@/hooks/query-hooks/COEClass/useQ_COEClass_FindByGradeId";
import useQ_COEGrade_GetGradeByProgram from "@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetGradeByProgram";
import useQ_COEGradeSubject_GetSubjectByGrade from "@/hooks/query-hooks/COEGradeSubject/useQ_COEGradeSubject_GetSubjectByGrade";
import useQ_COEProgram_GetAll from "@/hooks/query-hooks/COEProgram/useQ_COEProgram_GetAll";
import { Group } from "@mantine/core";
import { useEffect, useState } from "react";
import useS_fgmpowiqop from "./useS_fgmpowiqop";

export default function F_fgmpowiqop_Filter() {
  const store = useS_fgmpowiqop()
  const [programId, setProgramId] = useState<number | undefined>(0)
  const programs = useQ_COEProgram_GetAll()
  const grades = useQ_COEGrade_GetGradeByProgram({
    params: `?COEProgramId=${programId}`,
    option: {
      enabled: programId != undefined && programId != 0
    }
  })
  const gradeSubjects = useQ_COEGradeSubject_GetSubjectByGrade({
    params: `?COEGradeId=${store.state.gradeId}&cols=COESubject`
  })
  const classes = useQ_COEClass_FindByGradeId({
    params: `?COEGradeId=${store.state.gradeId}`
  })

  useEffect(() => {
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

  useEffect(() => {
    if (!gradeSubjects.data) return
    if (gradeSubjects.data.length == 0) return
    store.setProperty("gradeSubjectId", gradeSubjects.data[0].id)
    store.setProperty("gradeSubjectCode", gradeSubjects.data[0].coeSubject?.code)
  }, [gradeSubjects.data])

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

      <MySelect
        label="Môn học"
        data={gradeSubjects.data?.map(item => ({
          value: item.id!.toString(),
          label: item.coeSubject?.name ?? ""
        })) || []}
        value={store.state.gradeSubjectId?.toString()}
        onChange={(value, option) => {
          store.setProperty("gradeSubjectId", parseInt(value!))
          store.setProperty("gradeSubjectCode", option.label.split(" - ")[0])
        }}
      />

      <MySelect
        label="Lớp"
        data={classes.data?.map(item => ({
          value: item.id!.toString(),
          label: item.name ?? ""
        })) || []}
        value={store.state.classId?.toString()}
        clearable
        placeholder="Chọn lớp"
        onChange={(value, option) => {
          store.setProperty("classId", value ? parseInt(value) : 0)
          store.setProperty("className", option?.label || "")
        }}
      />
    </Group>
  )
}
