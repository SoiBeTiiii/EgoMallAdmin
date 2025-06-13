"use client"

import baseAxios from '@/api/baseAxios';
import AQButtonExportData from '@/components/Buttons/ButtonCRUD/AQButtonExportData';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { Fieldset, Group, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import F_upgwbnmsn8_Read_Update from './F_upgwbnmsn8_Read_Update';
import useS_upgwbnmsn8 from './useS_upgwbnmsn8';

export interface IProgram {
  note?: string;
  coeUnitId?: number;
  coeUnit?: any;
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
}

export interface IGradeByProgram {
  coeSemesterStartId?: number;
  coeSemesterEndId?: number;
  coeTrainingLevelId?: number;
  coeProgramId?: number;
  note?: string;
  coeSemesterStart?: any;
  coeSemesterEnd?: any;
  coeTrainingLevel?: any;
  coeProgram?: any;
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
}

export interface IF_upgwbnmsn8_Read {
  id?: number;
  code?: string;
  name?: string;
  coeGradeSubjectId?: number;
  coeSubjectId?: number;
  coeSemesterId?: number;
  coeSubjectGroupId?: number;
  order?: number;
  coeGradeSubject?: any;
  coeSubject?: any;
  coeSemester?: any;
  coeSubjectGroup?: any;
  concurrencyStamp?: string;
  isEnabled?: boolean;
}

export default function F_upgwbnmsn8_Read() {
  const store = useS_upgwbnmsn8();

  const subjectByGradeQuery = useQuery<IF_upgwbnmsn8_Read[]>({
    queryKey: [`F_upgwbnmsn8_Read_COEGradeSubject_GetSubjectByGrade`, store.state.gradeId],
    queryFn: async () => {
      const response = await baseAxios.get(`/COEGradeSubject/GetSubjectByGrade/?COEGradeID=${store.state.gradeId}&cols=COESubject,COESemester`);
      return response.data.data;
    },
    enabled: !!store.state.gradeId
  });

  const exportConfig = {
    fields: [
      { fieldName: "id", header: "STT" },
      { fieldName: "coeSemester.name", header: "Năm học - Học kỳ" },
      { fieldName: "order", header: "Thứ tự" },
      { fieldName: "coeSubject.code", header: "Mã môn học" },
      { fieldName: "coeSubject.name", header: "Tên môn học" },
      { fieldName: "coeSubject.numberCredit", header: "Số tín chỉ" },
      { fieldName: "coeSubject.numberPeriod", header: "Số tiết" },
    ],
  };

  const columns = useMemo<MRT_ColumnDef<IF_upgwbnmsn8_Read>[]>(() => [
    { header: "Năm học Học kỳ", accessorKey: "coeSemester.name" },
    { header: "Thứ tự", accessorKey: "order" },
    { header: "Mã môn học", accessorKey: "coeSubject.code" },
    { header: "Tên môn học", accessorKey: "coeSubject.name" },
    { header: "Số tín chỉ", accessorKey: "coeSubject.numberCredit" },
    { header: "Số tiết", accessorKey: "coeSubject.numberPeriod" },
    {
      header: "CLO",
      accessorFn: (originalRow) => (
        <F_upgwbnmsn8_Read_Update
          data={originalRow}
          coeGradeSubjectId={originalRow?.id ?? null}
        />
      )
    },
  ], []);

  return (
    <MyFlexColumn gap="lg">
      <Fieldset
        legend={store.state.gradeCode ?
          <Text size="sm">
            Danh sách cấu trúc đề thi các Môn học thuộc chương trình đào tạo - Khóa học <b>{store.state.gradeCode}</b>
          </Text>
          :
          <Text size="sm">
            Danh sách cấu trúc đề thi các Môn học thuộc chương trình đào tạo
          </Text>}>
        <MyDataTable
          enableRowSelection={true}
          enableRowNumbers={true}
          renderTopToolbarCustomActions={() => {
            return (
              <Group>
                <AQButtonExportData
                  isAllData={true}
                  objectName="dsKhoa"
                  data={subjectByGradeQuery.data || []}
                  exportConfig={exportConfig}
                />
              </Group>
            )
          }}
          columns={columns}
          data={subjectByGradeQuery.data || []}
        />
      </Fieldset>
    </MyFlexColumn>
  );
}