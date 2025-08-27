"use client";

import { Box, Button, Flex, NumberInput, TextInput, Group, Switch } from "@mantine/core";
import ImageUploaderBox from "../ImageUploaderBox/products/ImageUploaderBox";

type Variant = {
  sku: string;
  price: number;
  sale_price: number;
  quantity: number;
  is_active: boolean;
  options: Record<string, string>; // {optionId: value}
  images: { url: string | File }[];
};

type Props = {
  variants: Variant[];
  onChange: (variants: Variant[]) => void;
};

export default function VariantEditor({ variants, onChange }: Props) {
  const updateVariant = (index: number, field: keyof Variant, value: any) => {
    const updated = variants.map((v, i) => (i === index ? { ...v, [field]: value } : v));
    onChange(updated);
  };

  const resetVariant = (index: number) => {
    const updated = variants.map((v, i) =>
      i === index
        ? { ...v, sku: `${Math.floor(100000 + Math.random() * 900000)}`, price: 0, sale_price: 0, quantity: 0, is_active: true }
        : v
    );
    onChange(updated);
  };

  return (
    <Box>
      {variants.map((variant, idx) => (
        <Box key={idx} mt="md" p="md" style={{ border: "1px solid #ccc", borderRadius: 10 }}>
          <Group mb="xs" gap="xs">
            {Object.entries(variant.options).map(([optionId, value]) => (
              <Box key={optionId} px={10} py={4} style={{ border: "1px solid #ccc", borderRadius: 5, fontSize: 13 }}>
                {value}
              </Box>
            ))}
            <Button
              size="xs"
              variant="light"
              onClick={() => resetVariant(idx)}
              style={{ marginLeft: "auto" }}
            >
              Reset
            </Button>
          </Group>

          <Flex gap="md" wrap="wrap">
            <TextInput
              label="SKU"
              value={variant.sku}
              onChange={(e) => updateVariant(idx, "sku", e.target.value)}
            />
            <NumberInput
              label="Giá gốc"
              value={variant.price}
              onChange={(val) => updateVariant(idx, "price", Number(val))}
            />
            <NumberInput
              label="Giá KM"
              value={variant.sale_price}
              onChange={(val) => updateVariant(idx, "sale_price", Number(val))}
            />
            <NumberInput
              label="Số lượng"
              value={variant.quantity}
              onChange={(val) => updateVariant(idx, "quantity", Number(val))}
            />
            <Switch
              label="Kích hoạt"
              checked={variant.is_active}
              onChange={(e) => updateVariant(idx, "is_active", e.currentTarget.checked)}
            />
          </Flex>

          <Box mt="md" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <ImageUploaderBox
              img={variant.images[0] ?? { url: "" }}
              label="Thêm ảnh"
              onChange={(image) => updateVariant(idx, "images", [{ url: image }])}
              width={200}
              height={200}
              previewShape="square"
              uploadToken={process.env.NEXT_PUBLIC_UPLOAD_TOKEN || ""}
              showRemoveButton={!!variant.images.length}
              onRemove={() => updateVariant(idx, "images", [])}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
