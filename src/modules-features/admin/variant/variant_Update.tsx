'use client';

import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import { MyTextInput } from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { Button, Divider, Group, ScrollArea, Stack } from "@mantine/core";
import { toast } from "react-toastify";
import { useEffect } from "react";

export interface VariantValue {
  id?: number;
  value: string;
  _deleted?: boolean;
}

export interface VariantOptionUpdateDTO {
  id?: number;
  name: string;
  values: VariantValue[];
}

interface VariantOptionUpdateProps {
  data: VariantOptionUpdateDTO;
  onSuccess?: () => void;
}

export default function VariantOption_Update({ data, onSuccess }: VariantOptionUpdateProps) {
  const form = useForm<VariantOptionUpdateDTO>({
    initialValues: {
      id: data.id,
      name: data.name,
      values: data.values.length ? data.values : [{ value: "" }],
    },
    validate: {
      name: val => val.trim() ? null : "Tên biến thể không được để trống",
      values: vals =>
        vals.filter(v => !v._deleted).every(v => v.value.trim()) ? null : "Không được để trống",
    },
  });

  useEffect(() => {
    form.setValues({
      id: data.id,
      name: data.name,
      values: data.values.length ? data.values : [{ value: "" }],
    });
  }, [data]);

  const handleAddValue = () => {
    form.insertListItem("values", { value: "" });
  };

  const handleRemoveValue = (index: number) => {
    const item = form.values.values[index];
    if (item.id) {
      // đánh dấu xoá mềm
      form.setFieldValue(`values.${index}._deleted`, true);
    } else {
      // xoá thẳng khỏi mảng nếu là giá trị mới
      form.removeListItem("values", index);
    }
  };

  const handleSubmit = async (values: VariantOptionUpdateDTO) => {
    const validation = form.validate();
    if (validation.hasErrors) {
      toast.error("Vui lòng kiểm tra các trường bị lỗi");
      return;
    }

    try {
      // 1. Cập nhật tên
      await baseAxios.put(`/variant-options/${values.id}`, { name: values.name.trim() });

      // 2. Thao tác CRUD value
      const actions = values.values.map(async (v) => {
        if (v.id && v._deleted) {
          return baseAxios.delete(`/variant-options/values/${v.id}`);
        }
        if (v.id && !v._deleted) {
          return baseAxios.put(`/variant-options/values/${v.id}`, { value: v.value.trim() });
        }
        if (!v.id && !v._deleted && v.value.trim()) {
          return baseAxios.post(`/variant-options/${values.id}/values`, { value: v.value.trim() });
        }
      });

      await Promise.all(actions);

      toast.success("Cập nhật biến thể thành công");
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật biến thể thất bại");
    }
  };

  return (
    <MyActionIconUpdate form={form} onSubmit={handleSubmit}>
      <MyTextInput label="Tên biến thể" required {...form.getInputProps("name")} />

      <Divider label="Danh sách giá trị" labelPosition="center" my="md" />

      <ScrollArea h={250}>
        <Stack gap="xs">
          {form.values.values.map((value, index) => (
            !value._deleted && (
              <Group key={index} gap="xs" align="flex-end">
                <MyTextInput
                  label={`Giá trị #${index + 1}`}
                  required
                  style={{ flex: 1 }}
                  {...form.getInputProps(`values.${index}.value`)}
                />
                <Button
                  variant="subtle"
                  color="red"
                  onClick={() => handleRemoveValue(index)}
                  disabled={form.values.values.filter(v => !v._deleted).length <= 1}
                >
                  Xoá
                </Button>
              </Group>
            )
          ))}
        </Stack>
      </ScrollArea>

      <Button mt="sm" variant="light" onClick={handleAddValue}>
        + Thêm giá trị
      </Button>
    </MyActionIconUpdate>
  );
}
