"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import baseAxios from "@/api/baseAxios";
import { useEffect, useState } from "react";
import { useQueries } from '@tanstack/react-query';
import AppliedProductStack from "./appliedProducts";

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
} from "@mantine/core";
import {
    IconDiscount2,
    IconClock,
    IconInfoCircle,
    IconUsersGroup,
    IconArrowLeft,
} from "@tabler/icons-react";
import Khuyenmai_Delete from "@/modules-features/admin/khuyenmai/khuyenmai_Delete";
import GiftProductCard from "./giftProduct";
import Khuyenmai_Update from "@/modules-features/admin/khuyenmai/khuyenmai_Update";

export default function PromotionDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    const { data, isLoading, isError, refetch } = useQuery<any>({
        queryKey: ["promotion", id],
        queryFn: async () => {
            const res = await baseAxios.get(`/promotion/${id}`);
            const promotionData = res.data.data;
            return promotionData;
        },
    });



    if (isLoading) return <Text>Đang tải dữ liệu...</Text>;
    if (isError || !data) return <Text>Không tìm thấy khuyến mãi.</Text>;

    return (
        <>
            <Card shadow="md" padding="xl" radius="lg" withBorder>
                <Group justify="apart" align="center" mb="md">
                    <Group align="center">
                        <IconDiscount2 size={28} />
                        <Title order={3}>Chi tiết chương trình khuyến mãi</Title>
                    </Group>
                    <Badge
                        size="lg"
                        color={data.status === "active" ? "green" : "gray"}
                        variant="filled"
                    >
                        {data.status === "active" ? "Kích hoạt" : "Tắt"}
                    </Badge>
                </Group>

                <Divider my="sm" />

                <Grid gutter="md">
                    {/* Thông tin chính */}
                    <Grid.Col span={{ base: 12, md: 0 }}>
                        <Paper withBorder shadow="xs" p="md" radius="md">
                            <Group mb="xs">
                                <IconInfoCircle size={20} />
                                <Text fw={600}>Thông tin cơ bản</Text>
                            </Group>
                            <Stack gap={4}>
                                <Text>
                                    <strong>Tên chương trình:</strong> {data.name}
                                </Text>
                                <Text>
                                    <strong>Loại chương trình:</strong> {data.promotion_type === "buy_get" ? "Mua tặng" : "Giảm giá"}
                                </Text>

                                {data.promotion_type === "buy_get" ? (
                                    <>
                                        <Text>
                                            <strong>Số lượng mua:</strong> {data.buy_quantity}
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <strong>Số lượng nhận:</strong> {data.get_quantity}
                                        </Text>

                                        {data.gift ? (
                                            <GiftProductCard gift={data.gift} />
                                        ) : (
                                            <Text><strong>Quà tặng:</strong> Không có</Text>
                                        )}

                                    </>
                                ) : (
                                    <>
                                        <Text>
                                            <strong>Loại giảm giá:</strong> {data.discount_type === "percentage" ? "Phần trăm (%)" : "Số tiền"}
                                        </Text>
                                        <Text>
                                            <strong>Giá trị giảm:</strong> {data.discount_value}
                                        </Text>
                                    </>
                                )}
                            </Stack>
                        </Paper>
                    </Grid.Col>

                    {/* Sản phẩm áp dụng */}
                    <Grid.Col span={12}>
                        <Paper withBorder shadow="xs" p="md" radius="md">
                            <Group mb="xs">
                                <IconUsersGroup size={20} />
                                <Text fw={600}>Sản phẩm - Biến thể áp dụng</Text>
                            </Group>
                            <AppliedProductStack appliedProducts={data.applied_products} />
                        </Paper>
                    </Grid.Col>

                    {/* Thời gian */}
                    <Grid.Col span={{ base: 12, md: 0 }}>
                        <Paper withBorder shadow="xs" p="md" radius="md">
                            <Group mb="xs">
                                <IconClock size={20} />
                                <Text fw={600}>Thời gian</Text>
                            </Group>
                            <Stack gap={4}>
                                <Text>
                                    <strong>Ngày bắt đầu:</strong> {new Date(data.start_date).toLocaleDateString("vi-VN")}
                                </Text>
                                <Text>
                                    <strong>Ngày kết thúc:</strong> {new Date(data.end_date).toLocaleDateString("vi-VN")}
                                </Text>
                                <Text>
                                    <strong>Ngày tạo:</strong> {new Date(data.created_at).toLocaleString("vi-VN")}
                                </Text>
                                <Text>
                                    <strong>Ngày cập nhật:</strong> {new Date(data.updated_at).toLocaleString("vi-VN")}
                                </Text>
                            </Stack>
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

                    <Khuyenmai_Update
                        data={data}
                        onUpdated={refetch}

                    />

                    <Khuyenmai_Delete id={Number(id)} />
                </Group>
            </Card>
        </>
    );
}
