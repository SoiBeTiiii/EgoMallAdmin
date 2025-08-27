"use client";

import {
  Box,
  TextInput,
  Chip,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Loader,
} from "@mantine/core";
import { useClickOutside, useDebouncedValue } from "@mantine/hooks";
import { useState } from "react";

type RawItem = {
  id: number;
  value: string;
};

type Item = {
  value: string;
  label: string;
};

type Props = {
  data: RawItem[];
  value: string[];
  onChange: (val: string[]) => void;
  onCreate?: (label: string) => Promise<string>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  nothingFoundMessage?: string;
};

// Helper: bỏ dấu và lowercase
function normalize(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

export default function CreatableMultiSelect({
  data,
  value,
  onChange,
  onCreate,
  label,
  placeholder,
  disabled,
  nothingFoundMessage = "Không tìm thấy",
}: Props) {
  const [search, setSearch] = useState("");
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [debounced] = useDebouncedValue(search, 200);
  const ref = useClickOutside(() => setDropdownOpened(false));

  const items: Item[] = data.map((d) => ({
    value: String(d.id),
    label: d.value,
  }));

  const selectedItems = value.map((val) => {
    const found = items.find((item) => item.value === val);
    return { value: val, label: found?.label || val };
  });

  const availableItems = items.filter((item) => !value.includes(item.value));

  const filteredItems = availableItems.filter((item) => {
    const label = item.label.toLowerCase();
    const query = debounced.toLowerCase();

    return (
      label.includes(query) || normalize(label).includes(normalize(query))
    );
  });

  const handleSelect = (val: string) => {
    onChange([...value, val]);
    setSearch("");
    setDropdownOpened(false);
  };

  const handleRemove = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  const handleCreate = async () => {
    const trimmed = search.trim();
    if (!trimmed || !onCreate) return;

    setLoadingCreate(true);
    const newValue = await onCreate(trimmed);
    setLoadingCreate(false);
    onChange([...value, newValue]);
    setSearch("");
    setDropdownOpened(false);
  };

  return (
    <Box ref={ref} pos="relative">
      <TextInput
        label={label}
        placeholder={placeholder || "Tìm hoặc thêm..."}
        value={search}
        onChange={(e) => {
          setSearch(e.currentTarget.value);
          setDropdownOpened(true);
        }}
        onFocus={() => setDropdownOpened(true)}
        disabled={disabled}
      />

      {dropdownOpened && (
        <Paper
          withBorder
          mt={4}
          style={{ position: "absolute", zIndex: 10, width: "100%" }}
        >
          <ScrollArea h={150}>
            <Stack p="xs">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <Text
                    key={item.value}
                    onClick={() => handleSelect(item.value)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.label}
                  </Text>
                ))
              ) : (
                <Text size="sm" c="dimmed">
                  {nothingFoundMessage}
                </Text>
              )}
              {onCreate && search.trim() !== "" && (
                <Text
                  onClick={handleCreate}
                  c="blue"
                  style={{ cursor: "pointer", fontWeight: 500 }}
                >
                  {loadingCreate ? (
                    <Loader size="xs" />
                  ) : (
                    `+ Thêm mới: "${search}"`
                  )}
                </Text>
              )}
            </Stack>
          </ScrollArea>
        </Paper>
      )}

      <Box mt="xs">
        <Chip.Group multiple value={value} onChange={onChange}>
            {selectedItems.map((item) => (
            <Chip
                key={item.value}
                value={item.value}
                style={{marginBottom: 5 }}
                onClick={() => handleRemove(item.value)}
            >
                {item.label}
            </Chip>
            ))}
        </Chip.Group>
      </Box>
    </Box>
  );
}
