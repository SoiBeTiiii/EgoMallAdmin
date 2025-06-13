import baseAxios from "@/api/baseAxios";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_notification_show } from "@/utils/notification";
import { Button, Fieldset, Group, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { I_core71678_Read } from "./F_core71678_Read";


interface IRole extends IBaseEntity {

}
export default function F_core71678_ChangePermission({ user }: { user: I_core71678_Read }) {
  const disc = useDisclosure();
  const queryClient = useQueryClient()
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const rowSelect = useState<IRole[]>()
  const query = useQuery<IRole[]>({
    queryKey: [`F1_1ChangePermission`],
    queryFn: async () => {
      const response = await baseAxios.get("/Role/GetAdminRole");
      return response.data.data
    },
  })
  const mutation = useMutation({
    mutationFn: async (roleIds: number[]) => {
      const res = await baseAxios.post("/Role/AddUser?userId=" + user.id, roleIds)
      return res
    }
  })
  const permissionColumns = useMemo<MRT_ColumnDef<IRole>[]>(
    () => [
      {
        header: "Quyền",
        accessorKey: "name",
      },
    ],
    []
  );
  function handleSave() {
    mutation.mutate(Object.keys(rowSelection).map(Number), {
      onSuccess: () => {
        utils_notification_show({ crudType: "update" })
        disc[1].close()
        queryClient.invalidateQueries()
      }
    })
  }
  useEffect(() => {
    const result = user.roles?.reduce((acc, item) => {
      if (item.id !== undefined) {  // Chỉ gán khi id có giá trị
        acc[item.id] = true;
      }
      return acc;
    }, {} as Record<string, boolean>);
    setRowSelection(result!)
  }, [])
  return (
    <MyButtonModal modalSize={"xl"} disclosure={disc} title="Chọn quyền cho người dùng" label="Sửa quyền">

      <Table
        // mt={{ base: 0, lg: 16 }}
        w={'100%'}
        variant="vertical" layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <Table.Th w={160}>Họ và tên:</Table.Th>
            <Table.Td>{user.fullName}</Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>Tên đăng nhập:</Table.Th>
            <Table.Td>
              {user.userName}
            </Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>Email:</Table.Th>
            <Table.Td>{user.email}</Table.Td>
          </Table.Tr>


        </Table.Tbody>
      </Table>
      {query.isLoading && "Đang tải dữ liệu..."}
      {query.isError && "Lỗi khi tải dữ liệu..."}
      <Fieldset legend="Chọn quyền">
        <MyDataTable
          enableRowSelection={true}
          onRowSelectionChange={setRowSelection}
          state={{ rowSelection }}
          setSelectedRow={rowSelect[1]}
          getRowId={(originalRow) => originalRow.id?.toString()}
          initialState={{
            density: "xs",
            pagination: { pageIndex: 0, pageSize: 10 },
            columnPinning: { right: ["mrt-row-actions"] },
            columnVisibility: {
              nguoiCapNhat: false,
              ngayCapNhat: false
            }
          }}
          columns={permissionColumns}
          data={query.data!}
        />
      </Fieldset>
      <Group justify='flex-end' mt={24}>
        <Button onClick={handleSave}>Lưu</Button>
      </Group>
    </MyButtonModal>
  )
}
