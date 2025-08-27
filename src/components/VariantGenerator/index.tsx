"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Group,
  TextInput,
  Title,
  Loader,
  Switch,
  NumberInput,
  Modal,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { randomId } from "@mantine/hooks";
import baseAxios from "@/api/baseAxios";
import CreatableMultiSelect from "../CreatableMultiSelect";
import ImageUploaderBox from "../ImageUploaderBox/products/ImageUploaderBox";

type VariantOption = {
  id: number;
  name: string;
};

type VariantValue = {
  id: string | number;
  value: string;
};

interface Variant {
  sku: string;
  price: number;
  sale_price: number;
  quantity: number;
  is_active: boolean;
  options: Record<string, string>;
  images: { url: string | File }[];
}

type Props = {
  options: VariantOption[];
  onGenerate: (variants: Variant[]) => void;
  defaultVariants?: Variant[];
};

export default function VariantGenerator({ options, onGenerate, defaultVariants }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [optionValues, setOptionValues] = useState<Record<number, VariantValue[]>>({});
  const [selectedValues, setSelectedValues] = useState<Record<number, string[]>>({});
  const [loadingOptions, setLoadingOptions] = useState<number[]>([]);
  const [creatingValue, setCreatingValue] = useState<number | null>(null);
  const [valueModalOpen, setValueModalOpen] = useState(false);
  const [activeOptionId, setActiveOptionId] = useState<number | null>(null);
  const [newValueName, setNewValueName] = useState("");
  const [variants, setVariants] = useState<Variant[]>([]);
  const [hasInitializedVariants, setHasInitializedVariants] = useState<boolean>(false);

  const fetchOptionValues = useCallback(async (optionId: number) => {
    setLoadingOptions((prev) => [...prev, optionId]);
    try {
      const res = await baseAxios.get(`/variant-options/${optionId}`);
      const values = res.data.data?.values || [];
      setOptionValues((prev) => ({ ...prev, [optionId]: values }));
    } catch (err) {
      console.error("Error fetching option values:", err);
    } finally {
      setLoadingOptions((prev) => prev.filter((id) => id !== optionId));
    }
  }, []);

  useEffect(() => {
    if (!defaultVariants || defaultVariants.length === 0) return;

    const optionIds = new Set<number>();
    for (const variant of defaultVariants) {
      for (const optionIdStr of Object.keys(variant.options)) {
        const optionId = Number(optionIdStr);
        optionIds.add(optionId);
      }
    }

    // Gọi fetch cho từng optionId nếu chưa có trong optionValues
    optionIds.forEach((optionId) => {
      if (!optionValues[optionId]) {
        fetchOptionValues(optionId); // 
      }
    });
  }, [defaultVariants, fetchOptionValues]); // 



  useEffect(() => {
    if (
      hasInitializedVariants ||
      !defaultVariants ||
      defaultVariants.length === 0
    ) {
      return;
    }

    const allOptionIds = new Set<number>();
    for (const variant of defaultVariants) {
      for (const optionIdStr of Object.keys(variant.options)) {
        allOptionIds.add(Number(optionIdStr));
      }
    }

    const missing = Array.from(allOptionIds).some(
      (id) => !optionValues[id]
    );
    if (missing) return;

    const initSelectedOptions = new Set<number>();
    const initSelectedValues: Record<number, string[]> = {};
    const initOptionValues: Record<number, VariantValue[]> = {};

    for (const variant of defaultVariants) {
      for (const [optionIdStr, rawValue] of Object.entries(variant.options)) {
        const optionId = Number(optionIdStr);
        initSelectedOptions.add(optionId);

        const values = optionValues[optionId] || [];

        const match = values.find(
          (v) => v.value === rawValue || v.id === rawValue
        );

        if (match) {
          initSelectedValues[optionId] = initSelectedValues[optionId] || [];
          if (!initSelectedValues[optionId].includes(match.id.toString())) {
            initSelectedValues[optionId].push(match.id.toString());
          }

          initOptionValues[optionId] = values;
        }
      }
    }

    setSelectedOptions(Array.from(initSelectedOptions));
    setSelectedValues(initSelectedValues);
    setVariants(defaultVariants);
    setHasInitializedVariants(true); // ✅ để tránh chạy lại
  }, [defaultVariants, optionValues, hasInitializedVariants]);


  


  const handleCreateValue = async (optionId: number, name: string): Promise<string> => {
    const trimmed = name.trim();
    if (!trimmed) return "";

    try {
      setCreatingValue(optionId);
      const res = await baseAxios.post(`/variant-options/${optionId}/values`, { value: trimmed });
      const newVal = res.data?.data;
      if (newVal) {
        setOptionValues((prev) => ({
        ...prev,
        [optionId]: [...(prev[optionId] || []), { id: newVal.id, value: newVal.name }],
      }));
        return String(newVal.id);
      }
    } catch (err) {
      console.error("Error creating new value:", err);
    } finally {
      setCreatingValue(null);
    }

    return String(randomId());
  };

  const handleSelectOption = (optionId: number) => {
    if (!selectedOptions.includes(optionId)) {
      setSelectedOptions((prev) => [...prev, optionId]);
      fetchOptionValues(optionId);
    }
  };

  const handleRemoveOption = (optionId: number) => {
    setSelectedOptions((prev) => prev.filter((id) => id !== optionId));
    setOptionValues((prev) => {
      const updated = { ...prev };
      delete updated[optionId];
      return updated;
    });
    setSelectedValues((prev) => {
      const updated = { ...prev };
      delete updated[optionId];
      return updated;
    });
  };

  const generateVariants = () => {
    const entries = selectedOptions
      .map((id) => {
        const valueIds = selectedValues[id] || [];
        const values = (optionValues[id] || []).filter((v) =>
          valueIds.includes(String(v.id))
        );
        return { optionId: id, values };
      })
      .filter((e) => e.values.length > 0);

    const results: Variant[] = [];

    const backtrack = (
      index: number,
      currentOptions: Record<string, string>
    ) => {
      if (index === entries.length) {
        results.push({
          sku: `${Math.floor(100000 + Math.random() * 900000)}`,
          price: 0,
          sale_price: 0,
          quantity: 0,
          is_active: true,
          options: currentOptions,
          images: [],
        });
        return;
      }

      const { optionId, values } = entries[index];
      for (const val of values) {
        backtrack(index + 1, {
          ...currentOptions,
          [optionId]: val.value,
        });
      }
    };

    backtrack(0, {});
    setVariants(results);
    onGenerate(results);
  };

  const updateVariant = (index: number, field: keyof Variant, value: any) => {
    setVariants((prev) => {
      const updated = prev.map((v, i) => (i === index ? { ...v, [field]: value } : v));
      onGenerate(updated); // Cập nhật lại vào form
      return updated;
    });
};

  const resetVariant = (idx: number) => {
    setVariants((prev) => {
      const updated = prev.map((v, i) =>
        i === idx
          ? {
              ...v,
              sku: `${Math.floor(100000 + Math.random() * 900000)}`,
              price: 0,
              sale_price: 0,
              quantity: 0,
              is_active: true,
              image: [],
            }
          : v
      );
      onGenerate(updated); // Cập nhật lại vào form
      return updated;
    });
  };

  return (
    <Box mt="lg">
      <Title order={4} mb="sm">
        1. Chọn thuộc tính và giá trị
      </Title>

      {options.map((opt) => {
        const isSelected = selectedOptions.includes(opt.id);
        const rawValues = optionValues[opt.id];
        const values = Array.isArray(rawValues) ? rawValues : [];

        return (
          <Box key={opt.id} mt="md" p="sm" style={{ border: "1px solid #eee", borderRadius: 8 }}>
            <Group justify="space-between">
              <strong>{opt.name}</strong>
              {!isSelected ? (
                <Button size="xs" onClick={() => handleSelectOption(opt.id)}>
                  + Chọn
                </Button>
              ) : (
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  onClick={() => handleRemoveOption(opt.id)}
                  leftSection={<IconX size={14} />}
                >
                  Bỏ chọn
                </Button>
              )}
            </Group>

            {isSelected && (
              <Box mt="xs">
                {loadingOptions.includes(opt.id) ? (
                  <Loader size="xs" />
                ) : (
                  <>
                    <CreatableMultiSelect
                      data={values.map((v) => ({ id: Number(v.id), value: v.value }))}
                      value={selectedValues[opt.id] || []}
                      onChange={(val) => setSelectedValues((prev) => ({ ...prev, [opt.id]: val }))}
                      onCreate={(query) => handleCreateValue(opt.id, query)}
                      disabled={creatingValue === opt.id}
                    />

                    <Button
                      size="xs"
                      mt="xs"
                      variant="subtle"
                      onClick={() => {
                        setActiveOptionId(opt.id);
                        setValueModalOpen(true);
                      }}
                    >
                      + Thêm giá trị
                    </Button>
                  </>
                )}
              </Box>

            )}
          </Box>
        );
      })}

      {variants.length === 0 ? (
          <Button mt="lg" fullWidth onClick={generateVariants} disabled={selectedOptions.length === 0}>
            Tạo tổ hợp biến thể
          </Button>
        ) : (
          <Button
            mt="lg"
            fullWidth
            color="red"
            variant="light"
            onClick={() => {
              setVariants([]);
              onGenerate([]); // nếu muốn reset bên ngoài
            }}
          >
            Xóa tổ hợp biến thể
          </Button>
        )}

    
      <Modal
        opened={valueModalOpen}
        onClose={() => {
          setValueModalOpen(false);
          setNewValueName("");
          setActiveOptionId(null);
        }}
        title="Thêm giá trị mới"
        centered
      >
        <TextInput
          label="Tên giá trị"
          placeholder="Nhập giá trị mới"
          value={newValueName}
          onChange={(e) => setNewValueName(e.target.value)}
        />

        <Group mt="md" justify="flex-end">
          <Button
            variant="default"
            onClick={() => {
              setValueModalOpen(false);
              setNewValueName("");
              setActiveOptionId(null);
            }}
          >
            Huỷ
          </Button>

          <Button
            onClick={async () => {
              if (!newValueName.trim() || activeOptionId === null) return;

              const createdValueName = await handleCreateValue(activeOptionId, newValueName);

              if (createdValueName) {
                setSelectedValues((prev) => ({
                  ...prev,
                  [activeOptionId]: [...(prev[activeOptionId] || []), createdValueName],
                }));
              }

              setValueModalOpen(false);
              setNewValueName("");
              setActiveOptionId(null);
            }}
          >
            Thêm
          </Button>
        </Group>
      </Modal>
    </Box>
  );
}
