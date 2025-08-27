import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface ReviewUser {
    id: number;
    name: string;
    image?: string;
    role?: string; // chỉ có trong user của reply
}

export interface ReviewReply {
    id: number;
    user: ReviewUser;
    reply: string;
    date: string; // dạng "YYYY-MM-DD HH:mm:ss"
}

export interface F_gig6r8yyej_Read {
    id: number;
    user: ReviewUser;
    product: any | null; // Nếu cần rõ hơn thì có thể tạo thêm `Product` interface
    rating: number;
    comment: string;
    is_anonymous: boolean | 0 | 1;
    images: string[];
    status: string | null;
    reply?: ReviewReply | null;
    created_at: string;
    updated_at: string;
}

export default function F_gig6r8yyej_Read() {
    const AllQuery = useQuery<F_gig6r8yyej_Read[]>({
        queryKey: ["F_gig6r8yyej_Read"],
        queryFn: async () => [
            {
                id: 1,
                user: {
                    id: 101,
                    name: "Nguyễn Văn A",
                    image: "https://i.pravatar.cc/150?img=1",
                },
                product: null,
                rating: 5,
                comment: "Sản phẩm tuyệt vời! Rất hài lòng.",
                is_anonymous: false,
                images: [
                    "https://res.cloudinary.com/demo/image/upload/sample.jpg",
                    "https://res.cloudinary.com/demo/image/upload/sample2.jpg",
                ],
                status: "approved",
                reply: {
                    id: 201,
                    user: {
                        id: 2,
                        name: "Admin B",
                        role: "admin",
                    },
                    reply: "Cảm ơn bạn đã đánh giá ạ!",
                    date: "2025-07-10 14:22:00",
                },
                created_at: "2025-07-09 10:15:00",
                updated_at: "2025-07-10 12:00:00",
            },
            {
                id: 2,
                user: {
                    id: 102,
                    name: "Ẩn danh",
                    image: "",
                },
                product: null,
                rating: 2,
                comment: "Giao hàng chậm, đóng gói sơ sài.",
                is_anonymous: true,
                images: [],
                status: "pending",
                reply: null,
                created_at: "2025-07-12 08:30:00",
                updated_at: "2025-07-12 08:30:00",
            },
            {
                id: 3,
                user: {
                    id: 103,
                    name: "Trần Minh C",
                    image: "https://i.pravatar.cc/150?img=3",
                },
                product: null,
                rating: 3,
                comment: "Tạm ổn, chưa như kỳ vọng.",
                is_anonymous: false,
                images: [
                    "https://res.cloudinary.com/demo/image/upload/sample3.jpg"
                ],
                status: "approved",
                reply: {
                    id: 202,
                    user: {
                        id: 1,
                        name: "Nguyễn Admin",
                        role: "admin",
                    },
                    reply: "Cảm ơn bạn đã góp ý. Shop sẽ cải thiện!",
                    date: "2025-07-13 11:10:00",
                },
                created_at: "2025-07-13 09:00:00",
                updated_at: "2025-07-13 11:10:00",
            },
        ],
    });
    const exportConfig = {
        fields: [
            { header: "Người dùng", fieldName: "user.name" },
            { header: "Ảnh đại diện", fieldName: "user.image" },
            { header: "Ẩn danh", fieldName: "is_anonymous" },
            { header: "Số sao", fieldName: "rating" },
            { header: "Bình luận", fieldName: "comment" },
            { header: "Hình ảnh", fieldName: "images" },
            { header: "Trạng thái", fieldName: "status" },
            { header: "Phản hồi", fieldName: "reply.reply" },
            { header: "Người phản hồi", fieldName: "reply.user.name" },
            { header: "Ngày phản hồi", fieldName: "reply.date" },
            { header: "Ngày tạo", fieldName: "created_at" },
            { header: "Cập nhật lúc", fieldName: "updated_at" },
        ]
    };
    const columns = useMemo<MRT_ColumnDef<F_gig6r8yyej_Read>[]>(() => [
        {
            header: "Người dùng",
            accessorKey: "user.name",
        },
        {
            header: "Ảnh đại diện",
            accessorFn: (row) => row.user.image,
            Cell: ({ cell }) => {
                const image = cell.getValue<string>();
                return image ? (
                    <img src={image} alt="avatar" style={{ width: 40, height: 40, borderRadius: "50%" }} />
                ) : (
                    "—"
                );
            },
        },
        {
            header: "Ẩn danh",
            accessorKey: "is_anonymous",
            Cell: ({ cell }) => (cell.getValue() ? "Có" : "Không"),
        },
        {
            header: "Số sao",
            accessorKey: "rating",
        },
        {
            header: "Bình luận",
            accessorKey: "comment",
        },
        {
            header: "Hình ảnh",
            accessorFn: (row) => row.images,
            Cell: ({ cell }) => {
                const images = cell.getValue<string[]>();
                return images?.length ? (
                    <Group>
                        {images.slice(0, 3).map((img, idx) => (
                            <img key={idx} src={img} alt={`img-${idx}`} style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4 }} />
                        ))}
                    </Group>
                ) : (
                    "—"
                );
            },
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
        },
        {
            header: "Phản hồi",
            accessorKey: "reply.reply",
        },
        {
            header: "Người phản hồi",
            accessorKey: "reply.user.name",
        },
        {
            header: "Ngày phản hồi",
            accessorKey: "reply.date",
        },
        {
            header: "Ngày tạo",
            accessorKey: "created_at",
        },
        {
            header: "Cập nhật lúc",
            accessorKey: "updated_at",
        },
    ], []);

    if (AllQuery.isLoading) return "đang tải dữ liệu";
    if (AllQuery.isError) return "có lỗi xảy ra!";
    return (
        <MyDataTable
            enableRowSelection
            data={AllQuery.data!}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <AQButtonExportData
                                isAllData={true}
                                objectName="F_gig6r8yyej_Read"
                                data={AllQuery.data!}
                                exportConfig={exportConfig}
                            />
                        </Group>
                    </>
                );
            }}
            columns={columns}
        //     renderRowActions={({ row }) => (
        //         <MyCenterFull>
        //             <F_wqk1jyz44k_Update values={row.original} />
        //             <F_wqk1jyz44k_Delete id={row.id} />
        //         </MyCenterFull>
        //     )
        // }
        />
    );
}