"use client";

import { useEffect, useState } from "react";
import { Tabs, Box } from "@mantine/core";
import VariantGenerator from "../VariantGenerator";
import VariantEditor from "../VariantEditor";

type Variant = {
  id?: number;
  sku: string;
  price: number;
  sale_price: number;
  quantity: number;
  is_active: boolean;
  options: Record<string, string>; // {optionId: value}
  images: { url: string | File }[];
};

type Props = {
  defaultVariants?: Variant[];
  onChange: (variants: Variant[]) => void;
  options: { id: number; name: string }[];
  initialMode?: "edit" | "generate";
  enableEdit?: boolean; // 👈 thêm prop
};

export default function ProductVariantsForm({
  defaultVariants = [],
  onChange,
  options,
  initialMode,
  enableEdit = true, // 👈 mặc định cho phép edit
}: Props) {
  const [variants, setVariants] = useState<Variant[]>(defaultVariants);
  const [mode, setMode] = useState<"edit" | "generate">(
    initialMode ?? (defaultVariants.length > 0 ? "edit" : "generate")
  );

  useEffect(() => {
    onChange(variants);
  }, [variants]);

  return (
    <Box mt="lg">
      <Tabs value={mode} onChange={(val) => setMode(val as "edit" | "generate")}>
        <Tabs.List>
          <Tabs.Tab value="generate">Tạo biến thể</Tabs.Tab>
          {enableEdit && (
            <Tabs.Tab disabled={variants.length === 0} value="edit">
              Chỉnh sửa biến thể
            </Tabs.Tab>
          )}
        </Tabs.List>

        <Tabs.Panel value="generate" pt="md">
          <VariantGenerator
            options={options}
            onGenerate={(generated) => {
              setVariants(generated);
              if (enableEdit) {
                setMode(generated.length > 0 ? "edit" : "generate");
              }
            }}
            defaultVariants={defaultVariants}
          />
        </Tabs.Panel>

        {enableEdit && (
          <Tabs.Panel value="edit" pt="md">
            <VariantEditor variants={variants} onChange={setVariants} />
          </Tabs.Panel>
        )}
      </Tabs>
    </Box>
  );
}
