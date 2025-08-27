'use client';

import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import {
  Modal, Group, Stack, Divider, Checkbox, Button, Collapse, Box, ScrollArea, Select,
  Tooltip,
  ActionIcon,
} from '@mantine/core';
import { toast } from 'react-toastify';
import baseAxios from '@/api/baseAxios';
import MySelect from '@/components/Combobox/Select/MySelect';
import { MyTextInput } from 'aq-fe-framework/components';
import { IconChevronDown, IconChevronUp, IconEdit } from '@tabler/icons-react';
import { Promotion } from './khuyenmai_Read';

interface VariantOption {
  value: string;
  label: string;
  sale_price: number | null;
  product_id: number;
  product_name: string;
  price: number;
}

interface Props {
  data: Promotion;
  onUpdated?: () => void;
}

// 👉 Hàm lọc trùng đại diện và variant cùng product
function sanitizeApplicableProducts(applicable: any[]) {
  const hasAllProduct = new Set<number>();
  applicable.forEach(p => {
    if (p.type === 'all product') hasAllProduct.add(p.product_id);
  });

  return applicable.filter(p => {
    if (p.type === 'variant' && hasAllProduct.has(p.parent_id)) return false;
    return true;
  });
}

export default function PromotionUpdate({ data, onUpdated }: Props) {
  const [opened, setOpened] = useState(false);
  const [variants, setVariants] = useState<VariantOption[]>([]);
  const [expandedProductIds, setExpandedProductIds] = useState<number[]>([]);

  const form = useForm({
    initialValues: {
      name: data.name,
      promotion_type: data.promotion_type,
      start_date: data.start_date.split('T')[0],
      end_date: data.end_date.split('T')[0],
      status: Boolean(data.status),
      buy_quantity: data.buy_quantity ?? '',
      get_quantity: data.get_quantity ?? '',
      gift_product_variant_id: data.gift?.variant_id?.toString() ?? '',
      gift_product_id: data.gift?.product_id ?? '',
      discount_type: data.discount_type ?? 'percentage',
      discount_value: data.discount_value ?? '',
      applicable_products: data.applied_products ?? [],
    },
    validate: {
      name: v => v.trim() ? null : 'Tên chương trình không được để trống',
      start_date: v => v ? null : 'Chọn ngày bắt đầu',
      end_date: (v, vals) => new Date(v) > new Date(vals.start_date) ? null : 'Phải sau ngày bắt đầu',
      buy_quantity: (v, vals) => vals.promotion_type === 'buy_get' ? (v && Number(v) > 0 ? null : 'Số lượng mua > 0') : null,
      get_quantity: (v, vals) => vals.promotion_type === 'buy_get' ? (v && Number(v) > 0 ? null : 'Số lượng tặng > 0') : null,
      gift_product_variant_id: (_, vals) =>
        vals.promotion_type === 'buy_get'
          ? (vals.gift_product_variant_id || vals.gift_product_id ? null : 'Chọn quà tặng')
          : null,
      discount_value: (v, vals) =>
        vals.promotion_type === 'percentage'
          ? (v !== '' && !isNaN(Number(v)) && Number(v) >= 0 ? null : 'Giá trị giảm >= 0')
          : null,
    },
  });

  useEffect(() => {
    baseAxios.get('/products')
      .then(res => {
        const data = res.data.data.flatMap((product: any) =>
          product.variants.map((variant: any) => ({
            value: variant.id.toString(),
            label: `${product.id} - [${product.name}] ${variant.price} VNĐ`,
            sale_price: variant.sale_price,
            product_id: product.id,
            product_name: product.name,
            price: variant.price,
          }))
        );
        setVariants(data);
      })
      .catch(() => toast.error('Lỗi khi tải sản phẩm'));
  }, []);

  // 👉 Tự động lọc sạch product bị trùng khi chọn
  useEffect(() => {
    const cleaned = sanitizeApplicableProducts(form.values.applicable_products);
    if (cleaned.length !== form.values.applicable_products.length) {
      form.setFieldValue('applicable_products', cleaned);
    }
  }, [form.values.applicable_products]);

  const giftOptions = Object.entries(
    variants.reduce<Record<number, VariantOption[]>>((acc, curr) => {
      acc[curr.product_id] = acc[curr.product_id] || [];
      acc[curr.product_id].push(curr);
      return acc;
    }, {})
  ).map(([productIdStr, variantList]) => {
    const productId = Number(productIdStr);
    return {
      group: `gift_product_id: ${productId}`,
      items: [
        {
          value: `product-${productId}`,
          label: `[Đại diện] ${variantList[0].product_name}`,
        },
        ...variantList.map((v) => ({
          value: `variant-${v.value}`,
          label: v.label,
        })),
      ],
    };
  });

  const handleSubmit = async () => {
    const result = form.validate();
    if (result.hasErrors) {
      toast.error('Vui lòng kiểm tra lại các trường bị lỗi');
      return;
    }

    const payload: any = {
      name: form.values.name,
      promotion_type: form.values.promotion_type,
      start_date: form.values.start_date,
      end_date: form.values.end_date,
      status: form.values.status,
      applicable_products: sanitizeApplicableProducts(form.values.applicable_products).map(p => {
        if (p.type === 'all product') {
          return {
            product_id: p.product_id,
            variant_id: '',
            type: 'all product',
            parent_id: '',
          };
        } else {
          return {
            variant_id: p.variant_id,
            type: 'variant',
            parent_id: p.parent_id,
          };
        }
      }),
    };

    if (form.values.promotion_type === 'buy_get') {
      payload.buy_quantity = Number(form.values.buy_quantity);
      payload.get_quantity = Number(form.values.get_quantity);
      if (form.values.gift_product_variant_id) {
        payload.gift_product_variant_id = Number(form.values.gift_product_variant_id);
      } else if (form.values.gift_product_id) {
        payload.gift_product_id = Number(form.values.gift_product_id);
      }
    } else {
      payload.discount_type = form.values.discount_type;
      payload.discount_value = Number(form.values.discount_value);
    }

    try {
      await baseAxios.put(`/promotions/${data.id}`, payload);
      toast.success('Cập nhật khuyến mãi thành công');
      setOpened(false);
      onUpdated?.();
    } catch (err) {
      toast.error('Cập nhật thất bại');
    }
  };

  const filteredVariants = form.values.promotion_type === 'percentage'
    ? variants.filter(v => v.sale_price === null)
    : variants;

  const groupedByProduct = filteredVariants.reduce<Record<number, VariantOption[]>>((acc, curr) => {
    acc[curr.product_id] = acc[curr.product_id] || [];
    acc[curr.product_id].push(curr);
    return acc;
  }, {});

  const handleSelectAllVariants = (productId: number, isChecked: boolean) => {
    let selected = [...form.values.applicable_products];

    selected = selected.filter(p =>
      !(p.product_id === productId || p.parent_id === productId)
    );

    if (isChecked) {
      selected.push({
        product_id: productId,
        variant_id: 0,
        type: 'all product',
        parent_id: 0,
      });
    }

    form.setFieldValue('applicable_products', selected);
  };

  const toggleProductExpand = (productId: number) => {
    setExpandedProductIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isProductChecked = (productId: number) => {
    return form.values.applicable_products.some(
      p =>
        p.product_id === productId &&
        (p.variant_id === 0 || p.type === 'all product')
    );
  };

  return (
    <>
      {/* <Button onClick={() => setOpened(true)}>Sửa</Button> */}
          
      <Tooltip label="Chỉnh sửa">
        <ActionIcon onClick={() => setOpened(true)}>
          <IconEdit size={18} />
        </ActionIcon>
      </Tooltip>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Cập nhật khuyến mãi" size="lg">
        <Stack>
          <MyTextInput label="Tên chương trình" {...form.getInputProps('name')} />

          <MySelect
            label="Loại khuyến mãi"
            data={[
              { label: 'Giảm giá', value: 'percentage' },
              { label: 'Mua tặng', value: 'buy_get' },
            ]}
            {...form.getInputProps('promotion_type')}
          />

          <Group grow>
            <MyTextInput type="date" label="Ngày bắt đầu" {...form.getInputProps('start_date')} />
            <MyTextInput type="date" label="Ngày kết thúc" {...form.getInputProps('end_date')} />
          </Group>

          {form.values.promotion_type === 'buy_get' && (
            <>
              <Group grow>
                <MyTextInput type="number" label="Số lượng mua" {...form.getInputProps('buy_quantity')} />
                <MyTextInput type="number" label="Số lượng nhận" {...form.getInputProps('get_quantity')} />
              </Group>

              <Select
                label="Quà tặng (biến thể hoặc đại diện)"
                data={giftOptions}
                value={
                  form.values.gift_product_variant_id
                    ? `variant-${form.values.gift_product_variant_id}`
                    : form.values.gift_product_id
                      ? `product-${form.values.gift_product_id}`
                      : undefined
                }
                onChange={(val) => {
                  if (!val) return;

                  if (val.startsWith('product-')) {
                    const id = Number(val.replace('product-', ''));
                    form.setFieldValue('gift_product_id', id);
                    form.setFieldValue('gift_product_variant_id', '');
                  } else if (val.startsWith('variant-')) {
                    const id = Number(val.replace('variant-', ''));
                    form.setFieldValue('gift_product_variant_id', id.toString());
                    form.setFieldValue('gift_product_id', '');
                  }
                }}
              />
            </>
          )}

          {form.values.promotion_type === 'percentage' && (
            <>
              <MySelect
                label="Loại giảm giá"
                data={[{ label: '%', value: 'percentage' }, { label: 'VNĐ', value: 'amount' }]}
                {...form.getInputProps('discount_type')}
              />
              <MyTextInput
                type="number"
                label="Giá trị giảm"
                {...form.getInputProps('discount_value')}
              />
            </>
          )}

          <Divider label="Sản phẩm áp dụng" labelPosition="center" />

          <ScrollArea h={300}>
            <Stack>
              {Object.entries(groupedByProduct).map(([productIdStr, variantsList]) => {
                const productId = Number(productIdStr);
                const expanded = expandedProductIds.includes(productId);
                const firstVariant = variantsList[0];
                return (
                  <Box key={productId}>
                    <Group justify="space-between">
                      <Checkbox
                        label={<b>{firstVariant.product_name}</b>}
                        checked={isProductChecked(productId)}
                        onChange={(e) => handleSelectAllVariants(productId, e.currentTarget.checked)}
                      />
                      <Button
                        variant="subtle"
                        size="xs"
                        onClick={() => toggleProductExpand(productId)}
                      >
                        {expanded ? <IconChevronUp size={10} /> : <IconChevronDown size={10} />}
                      </Button>
                    </Group>
                    <Collapse in={expanded}>
                      <Stack mt="xs" pl="md">
                        {variantsList.map(v => (
                          <Checkbox
                            key={v.value}
                            label={v.label}
                            checked={form.values.applicable_products.some(
                              p => p.variant_id === Number(v.value) && p.product_id === v.product_id
                            )}
                            onChange={() => {
                              const selected = [...form.values.applicable_products];
                              const isChecked = selected.some(
                                p => p.variant_id === Number(v.value) && p.product_id === v.product_id
                              );

                              if (isChecked) {
                                form.setFieldValue(
                                  'applicable_products',
                                  selected.filter(p => !(p.variant_id === Number(v.value) && p.product_id === v.product_id))
                                );
                              } else {
                                const filtered = selected.filter(
                                  p => !(p.product_id === v.product_id && p.type === 'all product')
                                );

                                filtered.push({
                                  product_id: v.product_id,
                                  variant_id: Number(v.value),
                                  type: 'variant',
                                  parent_id: v.product_id,
                                });

                                form.setFieldValue('applicable_products', filtered);
                              }
                            }}
                          />
                        ))}
                      </Stack>
                    </Collapse>
                  </Box>
                );
              })}
            </Stack>
          </ScrollArea>

          <Group justify="flex-end">
            <Checkbox label="Kích hoạt" {...form.getInputProps('status', { type: 'checkbox' })} />
            <Button onClick={handleSubmit}>Lưu</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
