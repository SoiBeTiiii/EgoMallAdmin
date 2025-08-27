'use client';
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import MySelect from "@/components/Combobox/Select/MySelect";
import { useForm } from "@mantine/form";
import { Button, Group } from "@mantine/core";
import { MyTextInput } from "aq-fe-framework/components";
import { toast } from "react-toastify";
import baseAxios from "@/api/baseAxios";
import { useState } from "react";

export interface VariantValueCreate {
  value: string;
}

export interface CreateVariantOptionDTO {
  name: string;
  values: VariantValueCreate[];
}

export default function Variant_Create() {
  const [loading, setLoading] = useState(false);

  const form = useForm<CreateVariantOptionDTO>({
    initialValues: {
      name: '',
      values: [{ value: '' }],
    },
    validate: {
      name: (val) => (val.trim() ? null : 'Tên không được để trống'),
      values: {
        value: (val) => (val.trim() ? null : 'Giá trị không được để trống'),
      },
    },
  });

  const handleAddValue = () => {
    form.insertListItem('values', { value: '' });
  };

  const handleRemoveValue = (index: number) => {
    if (form.values.values.length > 1) {
      form.removeListItem('values', index);
    }
  };

  const handleSubmit = async (values: CreateVariantOptionDTO) => {
    const validation = form.validate();
    if (validation.hasErrors) {
      toast.error('Vui lòng kiểm tra lại các trường nhập');
      return;
    }

    const payload = {
      name: values.name,
      values: values.values.map(v => v.value),
    };

    try {
      setLoading(true);
      await baseAxios.post('/variant-options', payload);
      toast.success('Tạo biến thể thành công');
      form.reset();
    } catch (err) {
      toast.error('Tạo thất bại');
    } finally {
      setLoading(false);
    }
  };


  return (
    <MyButtonCreate
      label="Thêm biến thể"
      form={form}
      onSubmit={handleSubmit}
      objectName="Biến thể"
      loading={loading}
    >
      <MyTextInput
        label="Tên biến thể"
        placeholder="Ví dụ: Màu sắc"
        required
        {...form.getInputProps('name')}
      />

      {form.values.values.map((_, index) => (
        <Group key={index} mt="xs" align="center">
          <MyTextInput
            label={`Giá trị #${index + 1}`}
            placeholder="Ví dụ: Đỏ"
            required
            style={{ flex: 1 }}
            {...form.getInputProps(`values.${index}.value`)}
          />
          <Button
            variant="subtle"
            color="red"
            onClick={() => handleRemoveValue(index)}
            disabled={form.values.values.length <= 1}
          >
            Xoá
          </Button>
        </Group>
      ))}

      <Button mt="md" onClick={handleAddValue} variant="light">
        + Thêm giá trị
      </Button>
    </MyButtonCreate>
  );
}