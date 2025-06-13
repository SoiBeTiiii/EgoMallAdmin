'use client'
import baseAxios from "@/api/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Button, Fieldset, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_vf2cwmibmh_Create from "./F_vf2cwmibmh_Create";
import F_vf2cwmibmh_Delete from "./F_vf2cwmibmh_Delete";
import F_vf2cwmibmh_Update from "./F_vf2cwmibmh_Update";

export interface I_vf2cwmibmh_Read {
  id?: number;          // Unique identifier
  code?: string;
  name?: string;
  nameEg?: string;
  note?: string
  nguoiCapNhat?: string;
  ngayCapNhat?: Date;
}

export default function F_vf2cwmibmh_Read() {
  const [importData, setImportData] = useState(false);
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  })
  const form = useForm<I_vf2cwmibmh_Read>({
    initialValues: {},
  });

  // Query to fetch the mock data
  const AllQuery = useQuery<I_vf2cwmibmh_Read[]>({
    queryKey: ["F_vf2cwmibmh_Read"],
    queryFn: async () => {
      const result = await baseAxios.get(`/COETrainingLevel/GetAll`);
      return result.data?.data || []
    },
  });

  const columns = useMemo<MRT_ColumnDef<I_vf2cwmibmh_Read>[]>(() => [
    { header: "Mã bậc", accessorKey: "code" },
    { header: "Tên bậc", accessorKey: "name" },
  ], []);

  const exportConfig = {
    fields: [
      { fieldName: "id", header: "STT" },
      { fieldName: "code", header: "Mã bậc đào tạo" },
      { fieldName: "name", header: "Tên bậc đào tạo" },
    ],
  };

  if (AllQuery.isLoading) return "Loading...";

  if (AllQuery.error) return 'Có lỗi xảy ra';

  return (
    <Fieldset legend={`Danh mục bậc đào tạo`}>
      <MyFlexColumn>
        <MyDataTable
          enableRowSelection={true}
          enableRowNumbers={true}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <>
                <Group>
                  <F_vf2cwmibmh_Create />
                  <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                  }} >s</AQButtonCreateByImportFile>
                  <AQButtonExportData
                    isAllData={true}
                    objectName="danhSachBacDaoTao"
                    data={AllQuery.data || []}
                    exportConfig={exportConfig}
                  />
                  <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                </Group>
              </>
            )
          }}
          columns={columns}
          data={AllQuery.data || []}
          renderRowActions={({ row }) => {
            return (
              <MyCenterFull>
                <F_vf2cwmibmh_Update values={row.original} />
                <F_vf2cwmibmh_Delete id={row.original.id!} />
              </MyCenterFull>
            )
          }}
        />
      </MyFlexColumn>
    </Fieldset>
  );
}
