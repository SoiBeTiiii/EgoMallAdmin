'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import baseAxios from '@/api/baseAxios';
import {
    Badge,
    Button,
    Card,
    Divider,
    Group,
    Paper,
    Stack,
    Text,
    Title,
    Image,
    Avatar,
    SimpleGrid,
    Skeleton,
    Alert,
    Select,
} from '@mantine/core';
import {
    IconArrowLeft,
    IconUser,
    IconPackage,
    IconClock,
    IconMessageCircle,
    IconAlertCircle,
} from '@tabler/icons-react';
import dayjs from 'dayjs';

// Define interfaces for type safety
interface User {
    id: number;
    name: string;
    phone?: string;
    email?: string;
    image?: string;
    is_active?: boolean;
    role?: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    image?: string;
    description?: string;
    price?: number;
}

interface Reply {
    id: number;
    staff: User;
    reply: string;
    date: string;
}

interface Review {
    id: number;
    user: User;
    product: Product;
    rating: number;
    comment: string;
    is_anonymous: number;
    images: string[];
    status: 'approved' | 'pending' | 'rejected';
    reply?: Reply;
    created_at: string;
    updated_at: string;
}

export default function ReviewDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const queryClient = useQueryClient();

    // Fetch review details
    const {
        data: review,
        isLoading: isReviewLoading,
        isError: isReviewError,
        error: reviewError,
    } = useQuery<Review>({
        queryKey: ['review_detail', id],
        queryFn: async () => {
            const res = await baseAxios.get(`/reviews/${id}`);
            return res.data.data;
        },
    });

    // Fetch user details
    const { data: user, isLoading: isUserLoading } = useQuery<User>({
        queryKey: ['user_detail', review?.user.id],
        enabled: !!review?.user.id,
        queryFn: async () => {
            const res = await baseAxios.get(`/user/${review!.user.id}`);
            return res.data.data;
        },
    });

    // Fetch product details
    const { data: product, isLoading: isProductLoading } = useQuery<Product>({
        queryKey: ['product_detail', review?.product.id],
        enabled: !!review?.product.id,
        queryFn: async () => {
            const res = await baseAxios.get(`/product-by-id/${review!.product.id}`);
            return res.data.data;
        },
    });

    // Mutation for updating review status
    const updateStatusMutation = useMutation({
        mutationFn: async ({ reviewId, status }: { reviewId: number; status: string }) => {
            await baseAxios.put(`/reviews/${reviewId}/status`, { status });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['review_detail', id] });
            queryClient.invalidateQueries({ queryKey: ['admin_reviews'] }); // Ensure the review list updates
            alert('Cập nhật trạng thái thành công!');
        },
        onError: () => {
            alert('Lỗi cập nhật trạng thái!');
        },
    });

    // Handle status change
    const handleStatusChange = (reviewId: number, status: string) => {
        updateStatusMutation.mutate({ reviewId, status });
    };

    // Handle loading state
    if (isReviewLoading) {
        return (
            <Card shadow="md" padding="xl" radius="lg" withBorder>
                <Skeleton height={30} width="50%" mb="xl" />
                <Skeleton height={100} mb="md" />
                <Skeleton height={200} mb="md" />
                <Skeleton height={80} />
            </Card>
        );
    }

    // Handle error state
    if (isReviewError) {
        return (
            <Card shadow="md" padding="xl" radius="lg" withBorder>
                <Alert
                    icon={<IconAlertCircle size={20} />}
                    title="Lỗi"
                    color="red"
                    radius="md"
                >
                    {reviewError?.message || 'Không tìm thấy đánh giá.'}
                </Alert>
            </Card>
        );
    }

    // Ensure review exists
    if (!review) {
        return (
            <Card shadow="md" padding="xl" radius="lg" withBorder>
                <Alert
                    icon={<IconAlertCircle size={20} />}
                    title="Lỗi"
                    color="red"
                    radius="md"
                >
                    Không tìm thấy dữ liệu đánh giá.
                </Alert>
            </Card>
        );
    }

    return (
        <Card shadow="md" padding="xl" radius="lg" withBorder>
            {/* Header */}
            <Group justify="space-between" align="center" mb="xl">
                <Group>
                    <IconMessageCircle size={28} />
                    <Title order={3}>Chi tiết đánh giá sản phẩm</Title>
                </Group>
                <Badge
                    size="lg"
                    color={
                        review.status === 'approved'
                            ? 'green'
                            : review.status === 'pending'
                            ? 'yellow'
                            : 'red'
                    }
                    variant="filled"
                >
                    {review.status === 'approved'
                        ? 'Đã duyệt'
                        : review.status === 'pending'
                        ? 'Chờ duyệt'
                        : 'Từ chối'}
                </Badge>
            </Group>

            <Divider mb="xl" />

            <Stack gap="lg">
                {/* Người đánh giá */}
                <Paper withBorder p="md" radius="md" shadow="xs">
                    <Group mb="sm">
                        <IconUser size={20} />
                        <Text fw={600}>Thông tin người đánh giá</Text>
                    </Group>
                    <Group align="center">
                        {isUserLoading ? (
                            <Skeleton width={60} height={60} radius="xl" />
                        ) : (
                            <Avatar src={user?.image || review.user.image} size="lg" radius="xl" />
                        )}
                        <Stack gap={4}>
                            <Text><strong>Tên:</strong> {user?.name || review.user.name}</Text>
                            <Text><strong>Ẩn danh:</strong> {review.is_anonymous ? 'Có' : 'Không'}</Text>
                            <Text><strong>User ID:</strong> {review.user.id}</Text>
                            {user?.email && <Text><strong>Email:</strong> {user.email}</Text>}
                            {user?.phone && <Text><strong>Số điện thoại:</strong> {user.phone}</Text>}
                        </Stack>
                    </Group>
                </Paper>

                {/* Sản phẩm & đánh giá */}
                <Paper withBorder p="md" radius="md" shadow="xs">
                    <Group mb="sm">
                        <IconPackage size={20} />
                        <Text fw={600}>Thông tin sản phẩm & đánh giá</Text>
                    </Group>
                    <Stack gap={6}>
                        <Text><strong>Sản phẩm:</strong> {product?.name || review.product.name}</Text>
                        {isProductLoading ? (
                            <Skeleton height={80} width={80} />
                        ) : (
                            <Group align="center">
                                <Text><strong>Ảnh:</strong></Text>
                                <Image
                                    src={product?.image || 'https://via.placeholder.com/80'}
                                    alt="Ảnh sản phẩm"
                                    width={80}
                                    radius="md"
                                    fallbackSrc="https://via.placeholder.com/80"
                                />
                            </Group>
                        )}
                        <Text><strong>Mô tả:</strong> {product?.description || 'Không có'}</Text>

                        <Divider />

                        <Text><strong>Đánh giá:</strong> {'⭐'.repeat(review.rating)}</Text>
                        <Text><strong>Bình luận:</strong> {review.comment}</Text>

                        {review.images?.length > 0 && (
                            <>
                                <Text><strong>Ảnh đánh giá:</strong></Text>
                                <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
                                    {review.images.map((img: string, idx: number) => (
                                        <Image
                                            key={idx}
                                            src={img}
                                            alt={`Ảnh ${idx + 1}`}
                                            radius="md"
                                            style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
                                        />
                                    ))}
                                </SimpleGrid>
                            </>
                        )}
                    </Stack>
                </Paper>

                {/* Phản hồi & thời gian */}
                <Paper withBorder p="md" radius="md" shadow="xs">
                    <Group mb="sm">
                        <IconClock size={20} />
                        <Text fw={600}>Phản hồi & thời gian</Text>
                    </Group>
                    <Stack gap={6}>
                        <Text><strong>Ngày tạo:</strong> {dayjs(review.created_at).format('DD/MM/YYYY HH:mm')}</Text>
                        <Text><strong>Ngày cập nhật:</strong> {dayjs(review.updated_at).format('DD/MM/YYYY HH:mm')}</Text>
                        <Group>
                            <Text><strong>Trạng thái:</strong></Text>
                            <Select
                                value={review.status}
                                onChange={(val) => val && handleStatusChange(review.id, val)}
                                data={[
                                    { value: 'approved', label: 'Đã duyệt' },
                                    { value: 'pending', label: 'Chờ duyệt' },
                                    { value: 'rejected', label: 'Từ chối' },
                                ]}
                                size="sm"
                                style={{ width: 150 }}
                            />
                        </Group>
                        {review.reply ? (
                            <>
                                <Text><strong>Phản hồi bởi:</strong> {review.reply.staff.name}</Text>
                                <Text><strong>Nội dung:</strong> {review.reply.reply}</Text>
                                <Text><strong>Thời gian phản hồi:</strong> {dayjs(review.reply.date).format('DD/MM/YYYY HH:mm')}</Text>
                            </>
                        ) : (
                            <Text c="dimmed" fs="italic">Chưa có phản hồi</Text>
                        )}
                    </Stack>
                </Paper>
            </Stack>

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