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
import F_upgwbnmsn8_Tab1_Create from "./F_upgwbnmsn8_Tab1_Create";
import F_upgwbnmsn8_Tab1_Delete from "./F_upgwbnmsn8_Tab1_Delete";
import F_upgwbnmsn8_Tab1_Update from "./F_upgwbnmsn8_Tab1_Update";

export interface ICG {
  order?: number;
  description?: string;
  coecgpi?: ICoecgpi[];
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
  // nguoiCapNhat?: string;
  // ngayCapNhat?: Date | undefined;
}

export interface ICoecgpi {
  coepiId?: number;
  coecgId?: number;
  rating?: null;
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
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

export default function F_upgwbnmsn8_Tab1_Read({ coeGradeSubjectId }: { coeGradeSubjectId: number | null }) {
  const store = useS_upgwbnmsn8();
  const [importData, setImportData] = useState(false);

  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  });

  const cgQuery = useQuery<ICG[]>({
    queryKey: [`F_upgwbnmsn8_Tab1_COECG_ByGradeSubjectId=${coeGradeSubjectId}`],
    queryFn: async () => {

      const response = await baseAxios.get(`/COECG/GetSource?COEGradeSubjectId=${coeGradeSubjectId}`);
      return response.data.data;
    },
    enabled: !!coeGradeSubjectId
  });

  const columns = useMemo<MRT_ColumnDef<ICG>[]>(() => [
    {
      header: "Mã CG",
      accessorKey: "code",
    },
    {
      header: "PI",
      accessorKey: "coecgpi",
      accessorFn: (row) => row.coecgpi?.map((pi) => pi.coepi?.code).join(", "),
    },
    {
      header: "Mô tả",
      accessorKey: "description",
    },
    // {
    //     header: "Người cập nhật",
    //     accessorKey: "nguoiCapNhat",
    // },
    // {
    //     header: "Ngày cập nhật",
    //     accessorKey: "ngayCapNhat",
    //     accessorFn(originalRow) {
    //         return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
    //     },
    // },
  ], []);

  const exportConfig = {
    fields: [
      { fieldName: "id", header: "STT" },
      { fieldName: "code", header: "Mã CG" },
      { fieldName: "description", header: "Mô tả" },
      { fieldName: "coecgpi", header: "PI", accessorFn: (row: ICG) => row.coecgpi?.map((pi: ICoecgpi) => pi.coepi?.code).join(", ") },
    ],
  };

  if (cgQuery.isLoading) return <Text>Đang tải dữ liệu...</Text>;
  if (!coeGradeSubjectId) return <Text>Vui lòng chọn môn học</Text>;

  return (
    <MyDataTable
      enableRowSelection={true}
      enableRowNumbers={true}
      renderTopToolbarCustomActions={() => (
        <Group>
          <F_upgwbnmsn8_Tab1_Create coeGradeSubjectId={coeGradeSubjectId} />
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
            data={cgQuery.data!}
            exportConfig={exportConfig}
          />
          <Button leftSection={<IconTrash />} color="red">
            Xóa
          </Button>
        </Group>
      )}
      columns={columns}
      data={cgQuery.data || []}
      renderRowActions={({ row }) => (
        <MyCenterFull>
          <F_upgwbnmsn8_Tab1_Update data={row.original} />
          <F_upgwbnmsn8_Tab1_Delete id={row.original.id!} />
        </MyCenterFull>
      )}
    />
  );
}
