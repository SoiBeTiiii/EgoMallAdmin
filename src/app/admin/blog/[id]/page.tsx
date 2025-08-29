'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import baseAxios from '@/api/baseAxios';
import {
  Card,
  Divider,
  Group,
  Stack,
  Text,
  Title,
  Image,
  Badge,
  Skeleton,
  Alert,
  Avatar,
  SimpleGrid,
  Button,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconAlertCircle,
  IconEye,
  IconCalendar,
  IconCategory,
  IconUser,
} from '@tabler/icons-react';
import dayjs from 'dayjs';

interface Category {
  id: number;
  name: string;
  slug: string;
  type: string;
}

interface CreatedBy {
  id: number;
  name: string;
  email: string;
  role_id: number;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  image_url?: string;
  category: { id: number; name: string; slug: string };
  brand: { id: number; name: string };
}

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image_url?: string;
  status: string;
  views: number;
  is_published?: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  category: Category;
  created_by: CreatedBy;
  products: Product[];
}

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery<Blog>({
    queryKey: ['blog_detail', id],
    queryFn: async () => {
      const res = await baseAxios.get(`/blogs/${id}`);
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <Card shadow="md" padding="xl" radius="lg" withBorder>
        <Skeleton height={40} width="60%" mb="lg" />
        <Skeleton height={300} mb="lg" />
        <Skeleton height={200} />
      </Card>
    );
  }

  if (isError || !blog) {
    return (
      <Card shadow="md" padding="xl" radius="lg" withBorder>
        <Alert
          icon={<IconAlertCircle size={20} />}
          title="Lỗi"
          color="red"
          radius="md"
        >
          {error instanceof Error ? error.message : 'Không tìm thấy bài viết.'}
        </Alert>
      </Card>
    );
  }

  return (
    <Card shadow="md" padding="xl" radius="lg" withBorder>
      {/* Header */}
      <Group justify="space-between" mb="xl">
        <Title order={2}>{blog.title}</Title>
        <Badge
          color={blog.status === 'published' ? 'green' : 'gray'}
          size="lg"
          variant="filled"
        >
          {blog.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
        </Badge>
      </Group>

      {/* Ảnh đại diện */}
      {blog.image_url && (
        <Image
          src={blog.image_url}
          alt={blog.title}
          radius="md"
          mb="lg"
          fallbackSrc="https://via.placeholder.com/600x400"
        />
      )}

      {/* Thông tin phụ */}
      <Group mb="lg">
        <Group gap={4}>
          <IconUser size={16} />
          <Text size="sm" c="dimmed">
            {blog.created_by.name}
          </Text>
        </Group>
        <Group gap={4}>
          <IconCalendar size={16} />
          <Text size="sm" c="dimmed">
            {dayjs(blog.published_at).format('DD/MM/YYYY HH:mm')}
          </Text>
        </Group>
        <Group gap={4}>
          <IconCategory size={16} />
          <Text size="sm" c="dimmed">
            {blog.category.name}
          </Text>
        </Group>
        <Group gap={4}>
          <IconEye size={16} />
          <Text size="sm" c="dimmed">
            {blog.views} lượt xem
          </Text>
        </Group>
      </Group>

      <Divider mb="lg" />

      {/* Nội dung */}
      <Stack mb="xl">
        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          style={{ lineHeight: 1.7 }}
        />
      </Stack>

      {/* Sản phẩm liên quan */}
      {blog.products?.length > 0 && (
        <>
          <Title order={4} mb="md">
            Sản phẩm liên quan
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
            {blog.products.map((p) => (
              <Card key={p.id} shadow="sm" padding="md" radius="md" withBorder>
                <Image
                  src={p.image_url || 'https://via.placeholder.com/200'}
                  alt={p.name}
                  height={140}
                  radius="md"
                  mb="sm"
                />
                <Text fw={600}>{p.name}</Text>
                <Text size="sm" c="dimmed">
                  {p.category.name} - {p.brand.name}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </>
      )}

      {/* Footer */}
      <Group justify="center" mt="xl">
        <Button
          variant="default"
          leftSection={<IconArrowLeft size={18} />}
          onClick={() => router.back()}
        >
          Quay lại
        </Button>
      </Group>
    </Card>
  );
}
