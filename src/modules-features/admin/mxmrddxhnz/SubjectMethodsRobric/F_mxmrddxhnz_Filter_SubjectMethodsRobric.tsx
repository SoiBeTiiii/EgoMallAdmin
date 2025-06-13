import MySelect from "@/components/Combobox/Select/MySelect";
import { I_mxmrddxhnz_CLO, I_mxmrddxhnz_formulaTypeSubjectFormula, I_mxmrddxhnz_SubjectAssessment, I_mxmrddxhnz_SubjectFormula } from "./F_mxmrddxhnz_Read_SubjectMethodsRobric";

interface Props {
  onChangeSubjectFormula: (value?: string) => void;
  onChangeSubjectAssessment: (value?: string) => void;
  onChangeClo: (value?: string) => void;
  subjectFormula: I_mxmrddxhnz_SubjectFormula[];
  subjectAssessment: I_mxmrddxhnz_SubjectAssessment[];
  clo: I_mxmrddxhnz_CLO[];
}

export default function F_mxmrddxhnz_Filter_SubjectMethodsRobric(
  { subjectFormula,
    onChangeSubjectFormula,
    subjectAssessment,
    onChangeSubjectAssessment,
    clo,
    onChangeClo }: Props) {

  return (
    <>
      {subjectFormula && (
        <MySelect
          flex={1}
          label="Hình thức đánh giá"
          data={subjectFormula.map((item) => ({
            value: item.formulaType.toString(),
            label: I_mxmrddxhnz_formulaTypeSubjectFormula[item.formulaType ?? 1],
          }))}
          clearable
          onChange={(value) => onChangeSubjectFormula(value ?? '')}
        />
      )}
      {subjectAssessment && (
        <MySelect
          flex={1}
          label="Nội dung đánh giá"
          data={
            subjectAssessment!.map((item) => {
              return { value: item.id.toString(), label: item?.name }
            })
          }
          clearable
          onChange={(value) => onChangeSubjectAssessment(value ?? '')}
        />
      )}
      {clo && (
        <MySelect
          flex={1}
          label="CLO-Môn học"
          data={
            clo!.map((item) => {
              return { value: item.id.toString(), label: item?.code }
            })
          }
          clearable
          onChange={(value) => onChangeClo(value ?? '')}
        />
      )}
    </>
  );
}