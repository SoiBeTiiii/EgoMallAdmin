'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import baseAxios from '@/api/baseAxios';
import { MyCenterFull } from 'aq-fe-framework/components';
import VariantOption_Update from '@/modules-features/admin/variant/variant_Update';
import VariantOption_Delete from '@/modules-features/admin/variant/variant_Delete';
import { VariantOption } from '@/modules-features/admin/variant/variant_Read';

import {
  Card, Title, Text, Group, Tooltip, Button, Grid, Paper,
  Stack, Divider, Badge, SimpleGrid
} from '@mantine/core';

import {
  IconArrowLeft, IconCalendarTime, IconInfoCircle,
  IconListDetails
} from '@tabler/icons-react';

export default function VariantDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [openedUpdate, setOpenedUpdate] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery<VariantOption>({
    queryKey: ['VariantDetail', id],
    queryFn: async () => {
      const res = await baseAxios.get(`/variant-options/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <MyCenterFull>Đang tải chi tiết...</MyCenterFull>;
  if (isError || !data) return <MyCenterFull>Lỗi tải chi tiết!</MyCenterFull>;

  // fallback values để tránh null
  const name = data.name ?? "";
  const values = data.values ?? [];
  const createdAt = data.created_at ? new Date(data.created_at).toLocaleString('vi-VN') : "—";
  const updatedAt = data.updated_at ? new Date(data.updated_at).toLocaleString('vi-VN') : "—";

  return (
    <>
      <Card shadow="md" padding="xl" radius="lg" withBorder>
        <Group justify="apart" align="center" mb="md">
          <Group align="center">
            <IconListDetails size={28} />
            <Title order={3}>Chi tiết biến thể</Title>
          </Group>
          <Badge size="lg" color="blue" variant="filled">ID: {data.id ?? "—"}</Badge>
        </Group>

        <Divider my="sm" />

        <Grid gutter="md">
          <Grid.Col span={12}>
            <Paper withBorder shadow="xs" p="md" radius="md">
              <Group mb="xs">
                <IconInfoCircle size={20} />
                <Text fw={600}>Thông tin cơ bản</Text>
              </Group>
              <Stack gap={4}>
                <Text><strong>Tên biến thể:</strong> {name}</Text>
                <Text><strong>Số lượng giá trị:</strong> {values.length}</Text>
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={12}>
            <Paper withBorder shadow="xs" p="md" radius="md">
              <Group mb="xs">
                <IconListDetails size={20} />
                <Text fw={600}>Danh sách giá trị</Text>
              </Group>
              {values.length > 0 ? (
                <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing={4} verticalSpacing={4}>
                  {values.map((v) => (
                    <Text key={v.id}>– {v.value ?? ""}</Text>
                  ))}
                </SimpleGrid>
              ) : (
                <Text>Không có giá trị nào</Text>
              )}
            </Paper>
          </Grid.Col>

          <Grid.Col span={12}>
            <Paper withBorder shadow="xs" p="md" radius="md">
              <Group mb="xs">
                <IconCalendarTime size={20} />
                <Text fw={600}>Thông tin thời gian</Text>
              </Group>
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Text><strong>Ngày tạo:</strong> {createdAt}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Text><strong>Ngày cập nhật:</strong> {updatedAt}</Text>
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>
        </Grid>

        <Group mt="xl" justify="center" gap="sm">
          {/* Nút quay lại */}
          <Button
            variant="default"
            leftSection={<IconArrowLeft size={18} />}
            onClick={() => router.back()}
          >
            Quay lại
          </Button>

          {/* Nút chỉnh sửa */}
          <Tooltip label="Chỉnh Sửa" color="black">
            <VariantOption_Update
              data={data}
              onSuccess={() => {
                setOpenedUpdate(false);
                refetch();
              }}
            />
          </Tooltip>

          {/* Nút xóa */}
          <Tooltip label="Xóa" color="black">
            <VariantOption_Delete
              id={Number(id)}
              onDeleted={() => {
                router.push("/admin/variant");
              }}
            />
          </Tooltip>
        </Group>
      </Card>
    </>
  );
}
