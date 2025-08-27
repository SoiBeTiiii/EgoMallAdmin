'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  Select,
  Textarea,
  Tooltip,
} from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import {
  MyCenterFull,
  MyDataTable,
} from 'aq-fe-framework/components';
import { IconEye, IconMessage, IconEdit } from '@tabler/icons-react';
import baseAxios from '@/api/baseAxios';
import dayjs from 'dayjs';
import AQButtonExportData from '@/components/Buttons/ButtonCRUD/AQButtonExportData';

interface Review {
  id: number;
  rating: number;
  comment: string;
  status: 'approved' | 'pending' | 'rejected';
  created_at: string;
  updated_at: string;
  reply: null | {
    id: number;
    user: {
      id: number;
      name: string;
    };
    reply: string;
    date: string;
  };
  is_anonymous: number;
  images: string[];
  user: {
    id: number;
    name: string;
    image: string;
  };
  product: {
    id: number;
    name: string;
    slug: string;
  };
}

export default function Review_Read() {
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [editingReplyId, setEditingReplyId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [filters, setFilters] = useState({
    product_id: '',
    status: '',
    has_reply: '',
  });

  const { data, isLoading, isError, refetch } = useQuery<Review[]>({
    queryKey: ['admin_reviews', filters],
    queryFn: async () => {
      const res = await baseAxios.get('/reviews', { params: filters });
      return res.data.data;
    },
  });

  const exportConfig = {
    fields: [
      { header: 'Người đánh giá', fieldName: 'user.name' },
      { header: 'Sản phẩm', fieldName: 'product.name' },
      { header: 'Rating', fieldName: 'rating' },
      { header: 'Comment', fieldName: 'comment' },
      { header: 'Trạng thái', fieldName: 'status' },
      { header: 'Ngày tạo', fieldName: 'created_at' },
    ],
  };

  const handleReply = async () => {
    await baseAxios.post('/reviews/reply', {
      review_id: editingReplyId,
      reply: replyContent,
    });
    setReplyContent('');
    setEditingReplyId(null);
    refetch();
    alert('Phản hồi đánh giá thành công!');
  };

  const handleUpdateReply = async (reviewId: number) => {
    try {
      await baseAxios.put(`/reviews/${reviewId}/reply`, {
        reply: replyContent,
      });
      setReplyContent('');
      setEditingReplyId(null);
      refetch();
      alert('Cập nhật phản hồi đánh giá thành công!');
    } catch (err) {
      alert('Lỗi phản hồi đánh giá!');
    }
  };

  const handleStatusChange = async (reviewId: number, status: string) => {
    try {
      await baseAxios.put(`/reviews/${reviewId}/status`, { status });
      refetch();
    } catch (err) {
      alert('Lỗi cập nhật trạng thái!');
    }
  };

  const columns = useMemo<MRT_ColumnDef<Review>[]>(() => [
    {
      header: 'Người dùng',
      accessorKey: 'user.name',
      Cell: ({ row }) => (
        <Group>
          <Avatar src={row.original.user.image} radius="xl" size="sm" />
          {row.original.user.name}
        </Group>
      ),
    },
    {
      header: 'Sản phẩm',
      accessorKey: 'product.name',
    },
    {
      header: 'Rating',
      accessorKey: 'rating',
      Cell: ({ cell }) => `⭐ ${cell.getValue<number>()}`,
    },
    {
      header: 'Bình luận',
      accessorKey: 'comment',
      Cell: ({ row }) => {
        const review = row.original;
        return (
          <>
            <p>{review.comment}</p>

            <Group gap="xs" mt={4}>
              <Tooltip label={review.reply ? 'Chỉnh sửa phản hồi' : 'Phản hồi'}>
                <ActionIcon
                  variant="light"
                  onClick={() => {
                    setEditingReplyId(editingReplyId === review.id ? null : review.id);
                    setReplyContent(review.reply?.reply || '');
                  }}
                >
                  {review.reply ? <IconEdit size={16} /> : <IconMessage size={16} />}
                </ActionIcon>
              </Tooltip>

              {review.reply && (
                <span style={{ fontStyle: 'italic' }}>
                  Phản hồi: {review.reply.reply}
                </span>
              )}
            </Group>

            {editingReplyId === review.id && (
              <Group mt="xs" display="grid" align="flex-end" w="100%" >
                <Textarea
                  placeholder="Nhập phản hồi..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.currentTarget.value)}
                  minRows={2}
                  autosize
                  style={{ flex: 1 }}
                />
                {/* <Button onClick={() => review.id ? handleUpdateReply(review.id) : handleReply}>Gửi</Button> */}
                <Button
                  mb="10px"
                  onClick={() => {
                    if (review.reply !== null) {
                      handleUpdateReply(review.id);
                    } else {
                      handleReply();
                    }
                  }}
                >
                  {review.reply ? 'Cập nhật phản hồi' : 'Phản hồi'}
                </Button>
              </Group>
            )}
          </>
        );
      },
    },
    {
      header: 'Trạng thái',
      accessorKey: 'status',
      Cell: ({ row }) => (
        <Select
          value={row.original.status}
          onChange={(val) => val && handleStatusChange(row.original.id, val)}
          data={[
            { value: 'approved', label: 'Đã duyệt' },
            { value: 'pending', label: 'Chờ duyệt' },
            { value: 'rejected', label: 'Từ chối' },
          ]}
          size="xs"
        />
      ),
    },
    {
      header: 'Ngày tạo',
      accessorKey: 'created_at',
      Cell: ({ cell }) => dayjs(cell.getValue<string>()).format('DD/MM/YYYY HH:mm'),
    },
  ], [editingReplyId, replyContent]);

  if (isLoading) return 'Đang tải đánh giá...';
  if (isError) return 'Lỗi khi tải danh sách đánh giá';

  return (
    <>
      <Group mb="md">
        <Select
          placeholder="Lọc theo trạng thái"
          data={[
            { value: '', label: 'Tất cả' },
            { value: 'status:approved', label: 'Trạng thái: Đã duyệt' },
            { value: 'status:pending', label: 'Trạng thái: Chờ duyệt' },
            { value: 'status:rejected', label: 'Trạng thái: Từ chối' },
            { value: 'has_reply:true', label: 'Phản hồi: Đã phản hồi' },
            { value: 'has_reply:false', label: 'Phản hồi: Chưa phản hồi' },
          ]}
          value={
            filters.status
              ? `status:${filters.status}`
              : filters.has_reply
                ? `has_reply:${filters.has_reply}`
                : ''
          }
          onChange={(val) => {
            if (!val) {
              setFilters({ status: '', has_reply: '', product_id: '' });
              return;
            }

            const [key, value] = val.split(':');
            setFilters({
              status: key === 'status' ? value : '',
              has_reply: key === 'has_reply' ? value : '',
              product_id: '',
            });
          }}
        />
        {/* <Button onClick={() => refetch()}>Lọc</Button> */}
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
            <AQButtonExportData
              isAllData
              objectName="Danh sách đánh giá"
              data={data || []}
              exportConfig={exportConfig}
            />
          </Group>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <Tooltip label="Xem chi tiết">
              <ActionIcon onClick={() => router.push(`/admin/review/${row.original.id}`)}>
                <IconEye size={18} />
              </ActionIcon>
            </Tooltip>
          </MyCenterFull>
        )}
      />
    </>
  );
}
