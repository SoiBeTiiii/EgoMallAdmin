'use client';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import baseAxios from '@/api/baseAxios';
import F_wqk1jyz44k_Update from '@/modules-features/admin/coupon/F_wqk1jyz44k_Update';
import F_yx9uggkp3c_Delete from '@/modules-features/admin/coupon/F_wqk1jyz44k_Delete';
import {
    Badge,
    Button,
    Card,
    Divider,
    Grid,
    Group,
    Paper,
    Stack,
    Text,
    Title,
    Tooltip,
} from '@mantine/core';
import {
    IconDiscount2,
    IconClock,
    IconInfoCircle,
    IconUsersGroup,
    IconArrowLeft,
} from '@tabler/icons-react';
import { I_wqk1jyz44k_Read } from '@/modules-features/admin/coupon/F_wqk1jyz44k_Read';

export default function CouponDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    const { data, isLoading, isError } = useQuery<I_wqk1jyz44k_Read>({
        queryKey: ['coupon', id],
        queryFn: async () => {
            const res = await baseAxios.get(`/coupons/${id}`);
            return res.data.data;
        },
    });

    if (isLoading) return <Text>Đang tải dữ liệu...</Text>;
    if (isError || !data) return <Text>Không tìm thấy mã khuyến mãi.</Text>;

    return (
        <>
            <Card shadow="md" padding="xl" radius="lg" withBorder>
                <Group justify="apart" align="center" mb="md">
                    <Group align="center">
                        <IconDiscount2 size={28} />
                        <Title order={3}>Chi tiết mã khuyến mãi</Title>
                    </Group>
                    <Badge
                        size="lg"
                        color={data.status.toLocaleString() === 'true' ? 'green' : 'gray'}
                        variant="filled"
                    >
                        {data.status.toLocaleString() === 'true' ? 'Kích hoạt' : 'Tắt'}
                    </Badge>
                </Group>

                <Divider my="sm" />

                <Grid gutter="md">
                    {/* Thông tin chính */}
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Paper withBorder shadow="xs" p="md" radius="md" style={{ transition: 'all 0.3s ease' }}>
                            <Group mb="xs">
                                <IconInfoCircle size={20} />
                                <Text fw={600}>Thông tin cơ bản</Text>
                            </Group>
                            <Stack gap={4}>
                                <Text><strong>Mã:</strong> {data.code}</Text>
                                <Text><strong>Mô tả:</strong></Text>
                                <Text
                                    style={{
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        padding: '8px',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {data.description || 'Không có mô tả'}
                                </Text>
                                <Text><strong>Loại:</strong> {data.discount_type === 'percent' ? 'Phần trăm (%)' : 'Số tiền (VNĐ)'}</Text>
                                <Grid>
                                    <Grid.Col span={{ base: 12, md: 6 }}>
                                        <Text><strong>Giá trị giảm:</strong> {data.discount_value}</Text>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, md: 6 }}>
                                        <Text><strong>Giảm tối đa:</strong> {data.max_discount ?? 'Không giới hạn'}</Text>
                                    </Grid.Col>
                                </Grid>
                            </Stack>
                        </Paper>
                    </Grid.Col>

                    {/* Hạn mức & người dùng */}
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Paper withBorder shadow="xs" p="md" radius="md">
                            <Group mb="xs">
                                <IconUsersGroup size={20} />
                                <Text fw={600}>Giới hạn sử dụng</Text>
                            </Group>
                            <Stack gap={4}>
                                <Text><strong>Đơn tối thiểu:</strong> {data.min_order_value}</Text>
                                <Text><strong>Tổng lượt dùng:</strong> {data.usage_limit}</Text>
                                <Text><strong>Lượt dùng mỗi người:</strong> {data.discount_limit}</Text>
                            </Stack>
                        </Paper>
                    </Grid.Col>

                    {/* Ngày giờ */}
                    <Grid.Col span={12}>
                        <Paper withBorder shadow="xs" p="md" radius="md">
                            <Group mb="xs">
                                <IconClock size={20} />
                                <Text fw={600}>Thời gian</Text>
                            </Group>
                            <Grid>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                    <Text><strong>Ngày bắt đầu:</strong> {new Date(data.start_date).toLocaleDateString('vi-VN')}</Text>
                                    <Text><strong>Ngày kết thúc:</strong> {new Date(data.end_date).toLocaleDateString('vi-VN')}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                    <Text><strong>Ngày tạo:</strong> {data.created_at ? new Date(data.created_at).toLocaleString('vi-VN') : '---'}</Text>
                                    <Text><strong>Ngày cập nhật:</strong> {data.updated_at ? new Date(data.updated_at).toLocaleString('vi-VN') : '---'}</Text>
                                </Grid.Col>
                            </Grid>
                        </Paper>
                    </Grid.Col>
                </Grid>

                {/* Nút chức năng */}
                <Group mt="xl" justify="center" gap="sm">
                    <Button
                        variant="default"
                        leftSection={<IconArrowLeft size={18} />}
                        onClick={() => router.back()}
                    >
                        Quay lại
                    </Button>

                    <Tooltip label="Chỉnh Sửa" color="black">
                        <F_wqk1jyz44k_Update data={data} />
                    </Tooltip>

                    <Tooltip label="Xóa" color="black">
                        <F_yx9uggkp3c_Delete
                            id={Number(id)}
                            onDeleted={() => router.push("/admin/coupon")}
                        />
                    </Tooltip>
                </Group>
            </Card>
        </>
    );
}
