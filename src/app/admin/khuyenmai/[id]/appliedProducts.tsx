'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Text, Stack, Card, ScrollArea, SimpleGrid } from '@mantine/core';
import baseAxios from '@/api/baseAxios';

interface AppliedProduct {
    id?: number;
    type: 'all product' | 'variant';
    parent_id?: number;
    variant_id?: number;
    product_id?: number;
}

interface ProductInfo {
    product_id: number;
    name: string;
    type: 'all product' | 'variant';
    variants?: Array<{
        variant_id: number;
        sku: string;
        price: number;
        sale_price: number;
        quantity: number;
        is_active: boolean;
    }>;
}

export default function AppliedProductStack({
    appliedProducts,
}: {
    appliedProducts: AppliedProduct[];
}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [productInfos, setProductInfos] = useState<ProductInfo[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const results = await Promise.all(
                    appliedProducts.map(async (item) => {
                        if (item.type === 'all product' && item.product_id) {
                            const res = await baseAxios.get(`/product-by-id/${item.product_id}`);
                            const product = res.data.data?.[0];
                            const mappedVariants = product.variants?.map((v: any) => ({
                                variant_id: v.id,
                                sku: v.sku,
                                price: v.price,
                                sale_price: v.sale_price,
                                quantity: v.quantity,
                                is_active: v.is_active,
                            }));
                            return {
                                product_id: product.id,
                                name: product.name,
                                type: 'all product',
                                variants: mappedVariants,
                            };
                        }
                        if (item.type === 'variant' && item.parent_id && item.variant_id) {
                            const res = await baseAxios.get(`/product-by-id/${item.parent_id}`);
                            const product = res.data.data?.[0];
                            const v = product.variants.find((v: any) => v.id === item.variant_id);
                            if (!v) return null;
                            return {
                                product_id: product.id,
                                name: product.name,
                                type: 'variant',
                                variants: [
                                    {
                                        variant_id: v.id,
                                        sku: v.sku,
                                        price: v.price,
                                        sale_price: v.sale_price,
                                        quantity: v.quantity,
                                        is_active: v.is_active,
                                    },
                                ],
                            };
                        }
                        return null;
                    })
                );
                setProductInfos(results.filter(Boolean) as ProductInfo[]);
            } catch (err) {
                console.error(err);
                setError('Lỗi khi tải thông tin sản phẩm áp dụng');
            } finally {
                setLoading(false);
            }
        };
        if (appliedProducts?.length) {
            fetchProducts();
        } else {
            setLoading(false);
        }
    }, [appliedProducts]);

    if (loading) return <Text>Đang tải sản phẩm áp dụng...</Text>;
    if (error) return <Text color="red">{error}</Text>;
    if (!productInfos.length) return <Text>Không có sản phẩm áp dụng</Text>;

    return (
        <ScrollArea h={300} type="auto">
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                {productInfos.map((prod, index) => (
                    <Card
                        key={`${prod.type}-${prod.product_id ?? index}`}
                        withBorder
                        shadow="sm"
                        padding="sm"
                        bg="transparent"
                        mr="30px"
                    >
                        <Stack gap={4}>
                            <Text size="md" fw={200}>
                                {prod.type === 'all product' ? 'Sản phẩm áp dụng' : 'Biến thể áp dụng'}
                            </Text>
                            <Text size="sm" fw={600}>
                                <Link
                                    href={`http://localhost:3000/admin/kep33um7fa/${prod.product_id}`}
                                    style={{ textDecoration: 'none', color: '#228be6' }}
                                >
                                    {prod.name}
                                </Link>
                            </Text>
                            <Text size="sm">ID Sản phẩm: {prod.product_id ?? 'Không có'}</Text>
                            {prod.type === 'variant' && (
                                <Text size="sm">ID Biến thể: {prod.variants?.[0]?.variant_id ?? 'Không có'}</Text>
                            )}
                            <Text size="sm">SKU: {prod.variants?.[0]?.sku ?? 'Null'}</Text>
                            <Text size="sm">Giá: {prod.variants?.[0]?.price ?? 'Null'} VNĐ</Text>
                            <Text size="sm">Giá giảm: {prod.variants?.[0]?.sale_price ?? 'Null'} VNĐ</Text>
                            <Text size="sm">Số lượng: {prod.variants?.[0]?.quantity ?? 'Null'}</Text>
                            <Text size="sm">
                                Trạng thái: {prod.variants?.[0]?.is_active ? 'Kích hoạt' : 'Không kích hoạt'}
                            </Text>
                        </Stack>
                    </Card>
                ))}
            </SimpleGrid>

        </ScrollArea>
    );
}
