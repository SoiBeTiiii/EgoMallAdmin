"use client"
import baseAxios from '@/api/baseAxios';
import AQButtonCreateByImportFile from '@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile';
import AQButtonExportData from '@/components/Buttons/ButtonCRUD/AQButtonExportData';
import MySelect from '@/components/Combobox/Select/MySelect';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import F_mxmrddxhnz_Filter_SubjectMethodsRobric from './F_mxmrddxhnz_Filter_SubjectMethodsRobric';
import F_mxmrddxhnz_Update_SubjectMethodsRobric from './F_mxmrddxhnz_Update_SubjectMethodsRobric';
// mxmrddxhnz

export interface I_mxmrddxhnz_SubjectMethod {
  coeSubjectAssessmentId: number;
  coecloId: number;
  questionQuantity: number;
  maxPoint: number;
  id: number;
  code: string;
  name: string;
  subjectFormula: I_mxmrddxhnz_SubjectFormula | null;
  coeSubjectAssessment: I_mxmrddxhnz_SubjectAssessment | null;
  coeclo: I_mxmrddxhnz_CLO | null;
  ngayCapNhat?: Date | undefined;
  nguoiCapNhat?: string;
}

export interface I_mxmrddxhnz_SubjectMethodsRobric {
  id?: number;
  coeSubjectMethodId?: number | null;
  coeRubricsMethodId?: number | null;
  content?: string;
  name?: string;
  code?: string;
}

export interface I_mxmrddxhnz_RubricsMethod {
  id: number;
  code: string;
  name: string;
  order: number | null;
  note: string | null;
  isFailed: boolean | null;
}

export interface I_mxmrddxhnz_CLO {
  id: number;
  code: string;
  order: number,
  coecgId: number,
  description: string,
  densityCLO: number,
  coecg: any,
  coeclopi: any,
  name: string,
}

export interface I_mxmrddxhnz_SubjectFormula {
  coeTrainingProgramDetailId: number | null;
  formulaType: number;
  rate: number;
  id: number;
  code: string;
  name: string;
}

export interface I_mxmrddxhnz_SubjectAssessment {
  coeSubjectFormulaId: number;
  content: string;
  assessmentWhen: string;
  assessmentDuration: string;
  assessmentTool: number;
  questionType: number;
  totalQuestion: number;
  coeGradeSubjectId: number | null;
  coeSubjectFormula: I_mxmrddxhnz_SubjectFormula | null;
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

export enum I_mxmrddxhnz_formulaTypeSubjectFormula {
  'Chuyên cần' = 1,
  'Quá trình' = 2,
  'Cuối kỳ' = 3
}

export default function F_mxmrddxhnz_Read_SubjectMethodsRobric() {
  const [selectFormula, setSelectFormula] = useState<string | null>(null); // Hình thức đánh giá
  const [selectAssessment, setSelectAssessment] = useState<string | null>(null); //Nội dung đánh giá
  const [enrichedSubjectMethod, setEnrichedSubjectMethod] = useState<I_mxmrddxhnz_SubjectMethod[]>([]);
  const [enrichedSubjectMethodRubrics, setEnrichedSubjectMethodRubrics] = useState<I_mxmrddxhnz_SubjectMethodsRobric[]>([]);
  const [tempSubjectMethodRubrics, setTempSubjectMethodRubrics] = useState<I_mxmrddxhnz_SubjectMethodsRobric[]>([]);
  const [selectCLO, setSelectCLO] = useState<string | null>(null); //CLO
  const [importData, setImportData] = useState(false);

  const subjectMethod = useQuery<I_mxmrddxhnz_SubjectMethod[]>({
    queryKey: ['F_mxmrddxhnz_Read'],
    queryFn: async () => {
      const res = await baseAxios.get('COESubjectMethod/GetAll?cols=COESubjectAssessment,COECLO')
      setEnrichedSubjectMethod(res.data.data);
      return res.data.data;
    }
  });

  const { data: subjectMethodsRobric } = useQuery<I_mxmrddxhnz_SubjectMethodsRobric[]>({
    queryKey: ['F_mxmrddxhnz_subjectMethodsRobrics'],
    queryFn: async () => {
      const res = await baseAxios.get('COESubjectMethodRubrics/GetAll');
      setEnrichedSubjectMethodRubrics(res.data.data);
      return res.data.data;
    },
    enabled: !!subjectMethod
  });

  const { data: coeCLO } = useQuery<I_mxmrddxhnz_CLO[]>({
    queryKey: ['F_mxmrddxhnz_coeCLO'],
    queryFn: async () => {
      const res = await baseAxios.get('COECLO/GetAll');
      return res.data.data;
    },
    enabled: !!subjectMethod
  });

  const { data: subjectAssessments } = useQuery<I_mxmrddxhnz_SubjectAssessment[]>({
    queryKey: ['F_mxmrddxhnz_subjectAssessment'],
    queryFn: async () => {
      const res = await baseAxios.get('COESubjectAssessment/GetAll?cols=COESubjectFormula');
      return res.data.data;
    },
    enabled: !!subjectMethod
  });

  const { data: subjectFormulas } = useQuery<I_mxmrddxhnz_SubjectFormula[]>({
    queryKey: ['F_mxmrddxhnz_subjectFormula'],
    queryFn: async () => {
      const res = await baseAxios.get('COESubjectFormula/GetAll');
      return res.data.data;
    },
    enabled: !!subjectMethod
  });

  const { data: rubricsMethod } = useQuery<I_mxmrddxhnz_RubricsMethod[]>({
    queryKey: ['F_mxmrddxhnz_rubricsMethod'],
    queryFn: async () => {
      const res = await baseAxios.get('COERubricsMethod/GetAll');
      return res.data.data;
    },
    enabled: !!subjectMethod
  });

  useEffect(() => {
    const enrichedSubjectMethodnew = subjectMethod.data?.map((item) => {
      return item
    });

    enrichedSubjectMethodnew && setEnrichedSubjectMethod(enrichedSubjectMethodnew);

    setEnrichedSubjectMethod((prev) => {
      if (!selectFormula) return prev
      const formulasId = selectFormula ? subjectFormulas?.find(f => f.formulaType === Number(selectFormula))?.id : null;
      return prev.filter(item => item.coeSubjectAssessment?.coeSubjectFormulaId === formulasId)
    });

    setEnrichedSubjectMethod((prev) =>
      selectAssessment
        ? prev.filter(item => item.coeSubjectAssessmentId === Number(selectAssessment))
        : prev
    );

    setEnrichedSubjectMethod((prev) =>
      selectCLO
        ? prev.filter(item => item.coecloId === Number(selectCLO))
        : prev
    );
  }, [
    subjectFormulas,
    selectFormula,
    selectAssessment,
    selectCLO,
    subjectMethod.data
  ]);

  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  })

  const exportConfig = {
    fields: []
  };

  const columns = useMemo<MRT_ColumnDef<I_mxmrddxhnz_SubjectMethod>[]>(
    () => [
      {
        header: "Hình thức đánh giá",
        accessorKey: "subjectFormula",
        accessorFn: (row) => {
          const formula = subjectFormulas?.find(f => Number(f.id) === Number(row?.coeSubjectAssessment?.coeSubjectFormulaId)) ?? null;
          return formula?.formulaType ? I_mxmrddxhnz_formulaTypeSubjectFormula[formula?.formulaType] : '';
        }
      },
      {
        header: "Nội dung đánh giá",
        accessorKey: "subjectAssessment",
        accessorFn: (row) => {
          return row.coeSubjectAssessment?.name;
        }
      },
      {
        header: "CLO",
        accessorKey: "CLO",
        accessorFn: (row) => {
          return row.coeclo?.code
        }
      },
      ...(rubricsMethod ? rubricsMethod
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) // Sắp xếp tăng dần dựa trên order
        .map((item) => ({
          header: item.name,
          accessorFn: (row: I_mxmrddxhnz_SubjectMethod) => {
            const existingRubric = enrichedSubjectMethodRubrics?.find(
              rubric => rubric.coeRubricsMethodId === item.id && rubric.coeSubjectMethodId === row.id
            );

            return <MyTextInput
              variant="unstyled"
              onFocus={(event) => event.currentTarget.style.border = '1px solid #ccc'}
              onBlur={(event) => event.currentTarget.style.border = 'none'}
              max={10}
              min={0}
              defaultValue={
                enrichedSubjectMethodRubrics?.find(rubric => Number(rubric?.coeRubricsMethodId) === item.id && Number(rubric?.coeSubjectMethodId) === row.id)?.content
              }
              onChange={(event) => {
                const newValue = event.target.value;

                if (existingRubric) {
                  setEnrichedSubjectMethodRubrics((prev) =>
                    prev.map((rubric) =>
                      rubric.coeRubricsMethodId === item.id && rubric.coeSubjectMethodId === row.id
                        ? { ...rubric, content: newValue }
                        : rubric
                    )
                  );
                } else {
                  setTempSubjectMethodRubrics((prev) => {
                    const existingIndex = prev.findIndex(
                      (rubric) =>
                        rubric.coeRubricsMethodId === item.id && rubric.coeSubjectMethodId === row.id
                    );

                    if (existingIndex !== -1) {
                      // Nếu đã có, cập nhật nội dung
                      const updatedTempRubrics = [...prev];
                      updatedTempRubrics[existingIndex] = {
                        ...updatedTempRubrics[existingIndex],
                        content: newValue,
                      };
                      return updatedTempRubrics;
                    } else {
                      // Nếu chưa có, thêm mới
                      return [
                        ...prev,
                        {
                          content: newValue,
                          coeRubricsMethodId: item.id,
                          coeSubjectMethodId: row.id,
                          code: `${row.id}-${item.id}`,
                          name: `${row.id}-${item.id}`,
                        },
                      ];
                    }
                  });
                }
              }}
            />
          },
        })) : []),
      {
        header: "Người cập nhật",
        accessorKey: "nguoiCapNhat",
      },
      {
        header: "Ngày cập nhật",
        accessorKey: "ngayCapNhat",
        accessorFn(originalRow) {
          return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
        },
      },
    ],
    [enrichedSubjectMethod]
  );

  if (subjectMethod.isLoading) return "Đang tải dữ liệu..."
  if (subjectMethod.isError || !enrichedSubjectMethod) return "Không có dữ liệu..."
  return (
    <MyDataTable
      enableRowSelection={true}
      columns={columns}
      enableRowNumbers={true}
      data={enrichedSubjectMethod!}
      renderTopToolbarCustomActions={({ table }) => {
        return (
          <MyFlexColumn>
            <MyFlexRow>
              {
                <F_mxmrddxhnz_Filter_SubjectMethodsRobric subjectFormula={subjectFormulas!}
                  onChangeSubjectFormula={(value) => setSelectFormula(value || '')}
                  subjectAssessment={subjectAssessments!}
                  onChangeSubjectAssessment={(value) => setSelectAssessment(value || '')}
                  clo={coeCLO!}
                  onChangeClo={(value) => setSelectCLO(value || '')}
                />
              }

              <MySelect label="Công cụ đánh giá" flex={1} value={'1'} data={[{ value: "1", label: 'Brubrics' }]} />
            </MyFlexRow>
            <Group>
              <F_mxmrddxhnz_Update_SubjectMethodsRobric
                tempSubjectMethodRubrics={tempSubjectMethodRubrics}
                enrichedSubjectMethodRubrics={enrichedSubjectMethodRubrics}
              />
              <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
              }} >s</AQButtonCreateByImportFile>
              <AQButtonExportData
                isAllData={true}
                objectName="dsCauHoi"
                data={[]}
                exportConfig={exportConfig}
              />
              <Button color="red" leftSection={<IconTrash />}>
                Xóa
              </Button>
            </Group>
          </MyFlexColumn>
        )
      }}
    />
  )
}