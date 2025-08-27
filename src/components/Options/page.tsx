"use client";

import { useState, useEffect } from "react";
import { Box, Button, Group, Table, Text, Select } from "@mantine/core";
import baseAxios from "@/api/baseAxios";

type Option = {
  id: number;
  name: string;
};

type Props = {
  defaultOptions?: number[]; // mảng id thay vì object
  onChange: (options: number[]) => void; // trả về mảng id
};

export default function OptionsForm({ defaultOptions = [], onChange }: Props) {
  const [options, setOptions] = useState<number[]>(defaultOptions); // lưu id
  const [allOptions, setAllOptions] = useState<Option[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // gọi API lấy toàn bộ option
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await baseAxios("/variant-options");
        console.log("API /variant-options:", res.data.data);
        setAllOptions(res.data.data);
      } catch (error) {
        console.error("Lỗi fetch /variant-options:", error);
      }
    };
    fetchOptions();
  }, []);
// đồng bộ lại options khi defaultOptions thay đổi (edit form)
useEffect(() => {
  setOptions(defaultOptions);
}, [JSON.stringify(defaultOptions)]);

// báo về cha khi options thay đổi
useEffect(() => {
  onChange(options);
}, [options]);

  const addOption = () => {
    if (!selectedId) return;
    const id = Number(selectedId);

    // tránh thêm trùng
    if (options.includes(id)) return;

    setOptions([...options, id]);
    setSelectedId(null);
  };

  const removeOption = (id: number) => {
    setOptions(options.filter((optId) => optId !== id));
  };

  return (
    <Box mt="md">
      <Group>
        <Select
          placeholder="Chọn option..."
          data={allOptions.map((opt) => ({
            value: opt.id.toString(),
            label: opt.name,
          }))}
          value={selectedId}
          onChange={setSelectedId}
          searchable
          clearable
        />
        <Button onClick={addOption}>Thêm</Button>
      </Group>

      {options.length > 0 ? (
        <Table mt="md" withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Tên option</Table.Th>
              <Table.Th>Hành động</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {options.map((id) => {
              const opt = allOptions.find((o) => o.id === id);
              return (
                <Table.Tr key={id}>
                  <Table.Td>{id}</Table.Td>
                  <Table.Td>{opt?.name ?? "—"}</Table.Td>
                  <Table.Td>
                    <Button
                      color="red"
                      variant="light"
                      size="xs"
                      onClick={() => removeOption(id)}
                    >
                      Xóa
                    </Button>
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      ) : (
        <Text mt="md" c="dimmed">
          Chưa có option nào
        </Text>
      )}
    </Box>
  );
}
