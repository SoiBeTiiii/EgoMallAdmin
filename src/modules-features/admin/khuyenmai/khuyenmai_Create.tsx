'use client';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import {
  Modal, Group, Stack, Divider, Checkbox, Button, Collapse, Box,
  ScrollArea,
  Select
} from '@mantine/core';
import { toast } from 'react-toastify';
import baseAxios from '@/api/baseAxios';
import MySelect from '@/components/Combobox/Select/MySelect';
import { MyTextInput } from 'aq-fe-framework/components';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export interface PromotionCreateFormValues {
  name: string;
  promotion_type: 'buy_get' | 'percentage';
  start_date: string;
  end_date: string;
  status: boolean;
  buy_quantity?: number;
  get_quantity?: number;
  gift_product_id?: number;
  gift_product_variant_id?: string;
  discount_type?: 'percentage' | 'amount';
  discount_value: number | '';
  applicable_products: { product_id?: number; variant_id?: number }[];
}

interface VariantOption {
  value: string;
  label: string;
  sale_price: number | null;
  product_id: number;
  product_name: string;
  price: number;
}

export default function PromotionCreate({ onSuccess }: { onSuccess?: () => void }) {
  const [opened, setOpened] = useState(false);
  const [variants, setVariants] = useState<VariantOption[]>([]);
  const [expandedProductIds, setExpandedProductIds] = useState<number[]>([]);

  const form = useForm<PromotionCreateFormValues>({
    initialValues: {
      name: '',
      promotion_type: 'percentage',
      start_date: '',
      end_date: '',
      status: true,
      buy_quantity: undefined,
      get_quantity: undefined,
      gift_product_variant_id: undefined,
      discount_type: 'percentage',
      discount_value: '',
      applicable_products: [],
    },
    validate: {
      name: v => v.trim() ? null : 'Tên chương trình không được để trống',
      start_date: (v, vals) => {
        if (!v) return 'Chọn ngày bắt đầu';
        return new Date(v).getTime() > Date.now() ? null : 'Ngày bắt đầu phải sau ngày hiện tại';
      },
      end_date: (v, vals) => {
        if (!v) return 'Chọn ngày kết thúc';
        return new Date(v) > new Date(vals.start_date) ? null : 'Phải sau ngày bắt đầu';
      },
      buy_quantity: (v, vals) =>
        vals.promotion_type === 'buy_get' ? (v && v > 0 ? null : 'Số lượng mua > 0') : null,
      get_quantity: (v, vals) =>
        vals.promotion_type === 'buy_get' ? (v && v > 0 ? null : 'Số lượng tặng > 0') : null,
      gift_product_variant_id: (_, vals) =>
        vals.promotion_type === 'buy_get'
          ? (vals.gift_product_variant_id || vals.gift_product_id
            ? null
            : 'Chọn quà tặng (biến thể hoặc đại diện sản phẩm)')
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
      .catch(err => {
        console.error('Lỗi khi lấy sản phẩm:', err);
        toast.error('Lỗi khi tải danh sách sản phẩm');
      });
  }, []);

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

  const handleSubmit = async (vals: PromotionCreateFormValues) => {
    const result = form.validate();
    if (result.hasErrors) {
      toast.error('Có lỗi trong biểu mẫu');
      return;
    }

    const applicable_products = vals.applicable_products;

    const payload: any = {
      name: vals.name,
      promotion_type: vals.promotion_type,
      start_date: vals.start_date,
      end_date: vals.end_date,
      status: vals.status,
      applicable_products,
    };

    if (vals.promotion_type === 'buy_get') {
      payload.buy_quantity = Number(vals.buy_quantity);
      payload.get_quantity = Number(vals.get_quantity);

      if (vals.gift_product_variant_id) {
        payload.gift_product_variant_id = Number(vals.gift_product_variant_id);
      } else if (vals.gift_product_id) {
        payload.gift_product_id = Number(vals.gift_product_id);
      }
    }


    try {
      await baseAxios.post('/promotions/create', payload);
      toast.success('Tạo khuyến mãi thành công');
      setOpened(false);
      form.reset();
      onSuccess?.();
    } catch (err: any) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message || 'Tạo khuyến mãi thất bại';
      const errors = err?.response?.data?.errors;
      toast.error(`(${status}) ${message}`);
      if (errors) {
        Object.entries(errors).forEach(([key, messages]) => {
          toast.error(`${key}: ${(messages as string[]).join(', ')}`);
        });
      }
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

  const toggleProductExpand = (productId: number) => {
    setExpandedProductIds(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAllVariants = (productId: number, isChecked: boolean) => {
    let selected = [...form.values.applicable_products];

    if (isChecked) {
      selected.push({ product_id: productId });
      selected = selected.filter(p => p.variant_id === undefined || !groupedByProduct[productId].some(v => v.value === String(p.variant_id)));
    } else {
      selected = selected.filter(p => p.product_id !== productId);
    }

    form.setFieldValue('applicable_products', selected);
  };

  const isProductChecked = (productId: number) => {
    return form.values.applicable_products.some(p => p.product_id === productId);
  };

  return (
    <>
      <Button onClick={() => setOpened(true)}>Tạo khuyến mãi mới</Button>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Tạo khuyến mãi" size="lg">
        <Stack gap="md">
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
                <MyTextInput
                  type="number"
                  label="Số lượng mua"
                  value={form.values.buy_quantity ?? ''}
                  onChange={(e) => {
                    const val = e.currentTarget.value;
                    form.setFieldValue('buy_quantity', val === '' ? undefined : Number(val));
                  }}
                  error={form.errors.buy_quantity}
                />

                <MyTextInput
                  type="number"
                  label="Số lượng nhận"
                  value={form.values.get_quantity ?? ''}
                  onChange={(e) => {
                    const val = e.currentTarget.value;
                    form.setFieldValue('get_quantity', val === '' ? undefined : Number(val));
                  }}
                  error={form.errors.get_quantity}
                />
              </Group>

              <Select
                label="Biến thể quà tặng"
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
                    form.setFieldValue('gift_product_variant_id', undefined); // ⛔ clear variant_id
                  } else if (val.startsWith('variant-')) {
                    const id = Number(val.replace('variant-', ''));
                    form.setFieldValue('gift_product_variant_id', id.toString());
                    form.setFieldValue('gift_product_id', undefined); // ⛔ clear product_id
                  }
                }}

              />


            </>
          )}

          {form.values.promotion_type === 'percentage' && (
            <>
              <MySelect
                label="Loại giảm giá"
                data={[
                  { label: '%', value: 'percentage' },
                  { label: 'VNĐ', value: 'amount' },
                ]}
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
          <ScrollArea h={300} offsetScrollbars>
            <Stack gap="sm">
              {Object.entries(groupedByProduct).map(([productIdStr, variantsList]) => {
                const productId = Number(productIdStr);
                const firstVariant = variantsList[0];
                const expanded = expandedProductIds.includes(productId);
                return (
                  <Box key={productId} bg="#1a1b1e" p="sm" style={{ borderRadius: 8 }}>
                    <Group justify="space-between" >
                      <Checkbox
                        label={
                          <b>
                            {firstVariant.product_name.length > 55
                              ? `${firstVariant.product_name.slice(0, 60)}...`
                              : firstVariant.product_name}
                          </b>
                        }
                        checked={isProductChecked(productId)}
                        onChange={(e) => handleSelectAllVariants(productId, e.currentTarget.checked)}
                      />
                      <Button
                        size="8px"
                        mr={0}
                        ml={-20}
                        variant="subtle"
                        onClick={() => toggleProductExpand(productId)}
                      >
                        {expanded ? <IconChevronUp size={10} /> : <IconChevronDown size={10} />}
                      </Button>
                    </Group>
                    <Collapse in={expanded}>
                      <Stack mt="xs" gap={4} pl="md" style={{ borderLeft: '1px solid #ccc' }}>
                        {variantsList.map(v => (
                          <Checkbox
                            key={v.value}
                            label={v.label}
                            fs="sm"
                            checked={form.values.applicable_products.some(p => p.variant_id === Number(v.value))}
                            onChange={() => {
                              const selected = [...form.values.applicable_products];
                              const existingIndex = selected.findIndex(p => p.variant_id === Number(v.value));

                              if (existingIndex >= 0) {
                                selected.splice(existingIndex, 1);
                              } else {
                                const withoutParent = selected.filter(p => p.product_id !== v.product_id);
                                form.setFieldValue('applicable_products', [...withoutParent, { variant_id: Number(v.value) }]);
                                return;
                              }

                              form.setFieldValue('applicable_products', selected);
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

          <Group justify="flex-end" pt="md">
            <Checkbox label="Kích hoạt" {...form.getInputProps('status', { type: 'checkbox' })} />
            <Button variant="default" onClick={() => setOpened(false)}>Hủy</Button>
            <Button onClick={() => handleSubmit(form.values)}>Tạo mới</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}




