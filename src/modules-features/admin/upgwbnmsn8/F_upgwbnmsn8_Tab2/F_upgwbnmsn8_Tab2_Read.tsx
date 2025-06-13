'use client'

import baseAxios from "@/api/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import useS_upgwbnmsn8 from "../useS_upgwbnmsn8";
import F_upgwbnmsn8_Tab2_Create from "./F_upgwbnmsn8_Tab2_Create";
import F_upgwbnmsn8_Tab2_Delete from "./F_upgwbnmsn8_Tab2_Delete";
import F_upgwbnmsn8_Tab2_Update from "./F_upgwbnmsn8_Tab2_Update";

export interface ICLO {
  order?: number;
  coecgId?: number | undefined;
  description?: string;
  densityCLO?: number;
  coecg?: ICoecg;
  coeclopi?: ICoeclopi[];
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
}

export interface ICoecg {
  order?: null;
  description?: string;
  coeGradeSubjectId?: number;
  coeGradeSubject?: null;
  coeclOs?: any[];
  coecgpi?: any[];
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
}

export interface ICoeclopi {
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
  coecloId?: number;
  coepiId: number;
  rating?: number;
  coepi?: ICoepi;
}

export interface ICoepi {
  order?: number;
  description?: string;
  densityPI?: number;
  coeploId?: number;
  coeplo?: null;
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
}

export default function F_upgwbnmsn8_Tab2_Read({ coegradeSubjectId }: { coegradeSubjectId: number | null }) {
  const store = useS_upgwbnmsn8();
  const [importData, setImportData] = useState(false);

  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  });

  const cloQuery = useQuery<ICLO[]>({
    queryKey: [`F_upgwbnmsn8_Tab2_COECLO_ByGradeSubjectId=${coegradeSubjectId}`],
    queryFn: async () => {

      const response = await baseAxios.get(`/COECLO/GetSource?COEGradeSubjectId=${coegradeSubjectId}`)
      return response.data.data;
    },
    enabled: !!coegradeSubjectId
  });

  const totalCLO = useMemo(() => {
    return cloQuery.data?.reduce((acc, curr) => acc + (curr.densityCLO ?? 0), 0) ?? 0;
  }, [cloQuery.data]);

  const columns = useMemo<MRT_ColumnDef<ICLO>[]>(() => [
    {
      header: "Mã CO",
      accessorKey: "coecg.code",
    },
    {
      header: "Mã CLO",
      accessorKey: "code",
    },
    {
      header: "Tỷ trọng CLO",
      accessorKey: "densityCLO",
      Cell: ({ cell }) => `${(cell.getValue<number>())}%`,
    },
    {
      header: "PIs",
      accessorKey: "coeclo",
      accessorFn: (row) => row.coeclopi?.map((pi) => pi.coepi?.code).join(", "),
    },
    {
      header: "Mô tả",
      accessorKey: "description",
    },
  ], []);

  const exportConfig = {
    fields: [
      { fieldName: "coecg.code", header: "STT" },
      { fieldName: "coecg.coCode", header: "Mã CO" },
      { fieldName: "coecg.clo", header: "Mã CLO" },
      { fieldName: "coecg.cloDensity", header: "Tỷ trọng CLO" },
      { fieldName: "coecg.pis", header: "PIs" },
      { fieldName: "coecg.description", header: "Mô tả" },
    ],
  };

  if (cloQuery.isLoading) return <Text>Đang tải dữ liệu...</Text>;
  if (cloQuery.isError) return <Text>Không có dữ liệu...</Text>;
  if (!coegradeSubjectId) return <Text>Vui lòng chọn môn học</Text>;

  return (
    <MyDataTable
      enableRowSelection={true}
      enableRowNumbers={true}
      columns={columns}
      data={cloQuery.data!}
      renderTopToolbarCustomActions={() => (
        <Group>
          <F_upgwbnmsn8_Tab2_Create coegradeSubjectId={coegradeSubjectId} totalCLO={totalCLO} />
          <AQButtonCreateByImportFile
            setImportedData={setImportData}
            form={form_multiple}
            onSubmit={() => console.log(form_multiple.values)}
          >
            Import
          </AQButtonCreateByImportFile>
          <AQButtonExportData
            isAllData={true}
            objectName="dsCG"
            data={cloQuery.data!}
            exportConfig={exportConfig}
          />
          <Button leftSection={<IconTrash />} color="red">
            Xóa
          </Button>
        </Group>
      )}
      renderRowActions={({ row }) => {
        return (
          <MyCenterFull>
            <F_upgwbnmsn8_Tab2_Update data={row.original} totalCLO={totalCLO} />
            <F_upgwbnmsn8_Tab2_Delete id={row.original.id!} />
          </MyCenterFull>
        );
      }}
    />
  );
}
