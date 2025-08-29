'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ActionIcon,
    Avatar,
    Button,
    Group,
    Select,
    Tooltip,
    Text,
} from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import {
    AQButtonExportData,
    MyCenterFull,
    MyDataTable,
} from 'aq-fe-framework/components';
import { IconEye } from '@tabler/icons-react';
import baseAxios from '@/api/baseAxios';
import MySelect from '@/components/Combobox/Select/MySelect';
import Blog_Update from './F_blog_Update';
// import Blog_Update from './blog_Update';
// import Blog_Delete from './blog_Delete';

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
    image_url: string | null;
    category: {
        id: number;
        name: string;
        slug: string;
    };
    brand: {
        id: number;
        name: string;
    };
}

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image_url: string;
    status: 'published' | 'draft';
    views: number;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    category: Category;
    created_by: CreatedBy;
    products: Product[];
}

export default function Blog_Read() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [filters, setFilters] = useState({
        status: '',
        category_id: '',
    });

    // Fetch blog posts
    const { data, isLoading, isError, refetch } = useQuery<Blog[]>({
        queryKey: ['admin_blogs', filters],
        queryFn: async () => {
            const res = await baseAxios.get('/blogs', { params: filters });
            return res.data.data;
        },
    });

    // Mutation for updating blog status
    const updateStatusMutation = useMutation({
        mutationFn: async ({ blogId, status }: { blogId: number; status: string }) => {
            await baseAxios.post(`/blogs/${blogId}`, { status });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_blogs'] });
            alert('Cập nhật trạng thái bài viết thành công!');
        },
        onError: () => {
            alert('Lỗi cập nhật trạng thái bài viết!');
        },
    });

    // Handle status change
    const handleStatusChange = (blogId: number, status: string) => {
        updateStatusMutation.mutate({ blogId, status });
    };

    // Export configuration
    const exportConfig = {
        fields: [
            { header: 'Tiêu đề', fieldName: 'title' },
            { header: 'Danh mục', fieldName: 'category.name' },
            { header: 'Lượt xem', fieldName: 'views' },
            { header: 'Trạng thái', fieldName: 'status' },
        ],
    };

    // Table columns
    const columns = useMemo<MRT_ColumnDef<Blog>[]>(() => [
        {
            header: 'Tiêu đề',
            accessorKey: 'title',
            Cell: ({ row }) => (
                <Group
                    gap="sm"
                    align="center"
                    wrap="nowrap"
                    style={{ cursor: 'pointer' }}
                    onClick={() => router.push(`/admin/blog/${row.original.id}`)}
                >
                    <Avatar
                        src={row.original.image_url}
                        radius="md"
                        size={40}
                        style={{
                            border: '1px solid #e0e0e0',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            objectFit: 'cover',
                            flexShrink: 0,
                        }}
                    />
                    <Text
                        size="sm"
                        fw={500}
                        style={{
                            maxWidth: '300px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            transition: 'color 0.2s ease',
                            flexGrow: 1,
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#228be6')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
                    >
                        {row.original.title}
                    </Text>
                </Group>
            ),
        },
        {
            header: 'Danh mục',
            accessorKey: 'category.name',
        },
        {
            header: 'Lượt xem',
            accessorKey: 'views',
        },
        {
            header: 'Trạng thái',
            accessorKey: 'status',
            Cell: ({ row }) => (
                <MySelect
                    value={row.original.status}
                    onChange={(val) => val && handleStatusChange(row.original.id, val)}
                    data={[
                        { value: 'published', label: 'Đã xuất bản' },
                        { value: 'draft', label: 'Bản nháp' },
                    ]}
                    size="xs"
                />
            ),
        },
    ], [handleStatusChange]);

    // Loading and error states
    if (isLoading) return 'Đang tải danh sách bài viết...';
    if (isError) return 'Lỗi khi tải danh sách bài viết';

    return (
        <>
            <Group mb="md">
                <Select
                    placeholder="Lọc theo trạng thái hoặc danh mục"
                    data={[
                        { value: '', label: 'Tất cả' },
                        { value: 'status:published', label: 'Trạng thái: Đã xuất bản' },
                        { value: 'status:draft', label: 'Trạng thái: Bản nháp' },
                        { value: 'category_id:4', label: 'Danh mục: Tin Tức' },
                        { value: 'category_id:5', label: 'Danh mục: Góc Review' },
                        { value: 'category_id:6', label: 'Danh mục: Cách chăm sóc da' },
                        { value: 'category_id:7', label: 'Danh mục: Xu hướng trang điểm' },
                    ]}
                    value={
                        filters.status
                            ? `status:${filters.status}`
                            : filters.category_id
                                ? `category_id:${filters.category_id}`
                                : ''
                    }
                    onChange={(val) => {
                        if (!val) {
                            setFilters({ status: '', category_id: '' });
                            return;
                        }

                        const [key, value] = val.split(':');
                        setFilters({
                            status: key === 'status' ? value : '',
                            category_id: key === 'category_id' ? value : '',
                        });
                    }}
                />
            </Group>

            <MyDataTable
                enableRowSelection
                data={data || []}
                columns={columns}
                state={{ rowSelection }}
                onRowSelectionChange={setRowSelection}
                getRowId={(row) => row.id.toString()}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <Button onClick={() => router.push('/admin/blog/create')}>Tạo bài viết</Button>
                        <AQButtonExportData
                            objectName="Danh sách bài viết"
                            data={data || []}
                            exportConfig={exportConfig}
                        />
                    </Group>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <Tooltip label="Xem chi tiết">
                            <ActionIcon onClick={() => router.push(`/admin/blog/${row.original.id}`)}>
                                <IconEye size={18} />
                            </ActionIcon>
                        </Tooltip>
                        <Blog_Update data={row.original} onUpdated={refetch} />
                        {/* <Blog_Update data={row.original} onUpdated={refetch} />
                        <Blog_Delete id={row.original.id} onDeleted={refetch} /> */}
                    </MyCenterFull>
                )}
            />
        </>
    );
}