'use client';
import { useEffect, useState } from 'react';
import { Text, Stack, Card } from '@mantine/core';
import Link from 'next/link';
import baseAxios from '@/api/baseAxios';

interface Gift {
  parent_id: number;
  variant_id: number;
  product_id: number;
}

interface VariantInfo {
  product_id: number;
  product_name: string;
  variant_id: number;
  sku: string;
  price: number;
  sale_price: number;
  quantity: number;
  is_active: boolean;
}

export default function GiftProductCard({ gift }: { gift: Gift }) {
  const [loading, setLoading] = useState(true);
  const [variant, setVariant] = useState<VariantInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGiftVariant = async () => {
      try {
        let product: any = null;
        let foundVariant: any = null;

        if (gift.product_id) {
          const res = await baseAxios.get(`/product-by-id/${gift.product_id}`);
          product = res.data.data?.[0];
          foundVariant = product?.variants?.[0] || product;
        } else if (gift.parent_id && gift.variant_id) {
          const res = await baseAxios.get(`/product-by-id/${gift.parent_id}`);
          product = res.data.data?.[0];
          foundVariant = product?.variants?.find((v: any) => v.id === gift.variant_id);
        }

        if (!product || !foundVariant) {
          throw new Error("Không tìm thấy sản phẩm hoặc biến thể.");
        }

        setVariant({
          product_id: product.id,
          product_name: product.name,
          variant_id: foundVariant.id,
          sku: foundVariant.sku,
          price: foundVariant.price,
          sale_price: foundVariant.sale_price,
          quantity: foundVariant.quantity,
          is_active: foundVariant.is_active,
        });
      } catch (err) {
        console.error(err);
        setError("Lỗi khi tải thông tin quà tặng.");
      } finally {
        setLoading(false);
      }
    };

    fetchGiftVariant();
  }, [gift]);

  if (loading) return <Text>Đang tải thông tin quà tặng...</Text>;
  if (error || !variant) return <Text color="red">{error ?? "Không có quà tặng."}</Text>;

  return (
    <Card withBorder shadow="sm" padding="sm" bg="transparent" mt="sm">
      <Stack gap={4}>
        <Text size="md" fw={200}>🎁 Quà tặng</Text>
        <Text size="sm" fw={600}>
          <Link
            href={`http://localhost:3000/admin/kep33um7fa/${variant.product_id}`}
            style={{ textDecoration: 'none', color: '#228be6' }}
          >
            {variant.product_name}
          </Link>
        </Text>

        {gift.product_id && (
          <>
            <Text size="sm">ID Sản Phẩm: {variant.product_id}</Text>
            <Text size="sm">Tên sản phẩm: {variant.product_name}</Text>
            <Text size="sm">Giá: {variant.price} VNĐ</Text>
          </>
        )}

        {gift.parent_id && gift.variant_id && (
          <>
            <Text size="sm">ID Sản Phẩm: {gift.parent_id}</Text>
            <Text size="sm">ID Biến Thể: {variant.variant_id}</Text>
            <Text size="sm">Tên sản phẩm: {variant.product_name}</Text>
            <Text size="sm">SKU: {variant.sku}</Text>
            <Text size="sm">Giá: {variant.price} VNĐ</Text>
            <Text size="sm">Tồn kho: {variant.quantity}</Text>
          </>
        )}

        <Text size="sm">Trạng thái: {variant.is_active ? 'Kích hoạt' : 'Không kích hoạt'}</Text>
      </Stack>

    </Card>
  );
}
