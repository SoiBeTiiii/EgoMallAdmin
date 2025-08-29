"use client";

import React, { useEffect, useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Stack,
  Textarea,
  Select,
  MultiSelect,
  Loader,
  Text,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import baseAxios from "@/api/baseAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import slugify from "slugify";
import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import SingleImageUploader from "@/components/ImageUploaderBox/blogs/ImageUploaderBox";

interface Category {
  id: number;
  name: string;
  slug: string;
  type: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  image_url: string | null;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image_url: string;
  status: string;
  published_at: string | null;
  category_id?: number;
  products?: Product[];
}

interface BlogUpdateProps {
  data: Blog; // dữ liệu blog truyền từ ngoài
  onUpdated: () => void; // callback khi cập nhật xong
}

const Blog_Update: React.FC<BlogUpdateProps> = ({ data, onUpdated }) => {
  const form = useForm({
    initialValues: {
      title: data.title || "",
      slug: data.slug || "",
      content: data.content || "",
      excerpt: data.excerpt || "",
      coverFile: null as File | null,
      image_url: data.image_url || "",
      categoryId: data.category_id ? String(data.category_id) : null,
      status: data.status || "draft",
      publishedAt: data.published_at || "",
      productIds: data.products?.map((p) => String(p.id)) || [],
    },
  });

  const [imageFile, setImageFile] = useState<string | null>(data.image_url || null);

  // Auto-generate slug khi thay đổi title
  useEffect(() => {
    const name = form.values.title.trim();
    const generatedSlug = name
      ? slugify(name, { lower: true, strict: true })
      : "";
    if (form.values.slug !== generatedSlug) {
      form.setFieldValue("slug", generatedSlug);
    }
  }, [form.values.title]);

  // Fetch categories
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await baseAxios.get("/categories");
      return res.data.data.filter((t: Category) => t.type === "blog") || [];
    },
  });

  // Fetch products
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await baseAxios.get("/products", {
        params: { per_page: 100 },
      });
      return res.data.data || [];
    },
  });

  // Update blog mutation
  const updateBlogMutation = useMutation({
    mutationFn: async () => {
      const fd = new FormData();
      fd.append("title", form.values.title.trim());
      fd.append(
        "slug",
        form.values.slug.trim() || slugify(form.values.title.trim())
      );
      fd.append("content", form.values.content);
      fd.append("excerpt", form.values.excerpt || "");
      if (form.values.coverFile) {
        fd.append("image_url", form.values.coverFile);
      }
      if (form.values.categoryId) {
        fd.append("category_id", form.values.categoryId);
      }
      fd.append("status", form.values.status);
      if (form.values.publishedAt) {
        fd.append("published_at", form.values.publishedAt);
      }
      form.values.productIds.forEach((id) =>
        fd.append("product_ids[]", id)
      );

      return baseAxios.post(`/blogs/${data.id}?_method=PUT`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      onUpdated(); // gọi callback refetch
    },
  });

  const handleSave = async () => {
    const validation = form.validate();
    if (validation.hasErrors) return;

    await updateBlogMutation.mutateAsync();
    alert("Cập nhật bài viết thành công");
  };

  const disc = useDisclosure(false);

  return (
    <MyButtonModal title="Cập nhật bài viết" label="Cập nhật" disclosure={disc} modalSize={"90%"}>
      <Stack gap="md">
        <MyTextInput label="Tiêu đề" required {...form.getInputProps("title")} />

        <MyTextInput
          label="Slug"
          placeholder="Tự động tạo nếu để trống"
          {...form.getInputProps("slug")}
        />

        <Textarea label="Mô tả ngắn" {...form.getInputProps("excerpt")} />

        
              <Box my="md">
                <SingleImageUploader
                  label="Ảnh đại diện"
                  uploadToken={process.env.NEXT_PUBLIC_UPLOAD_TOKEN!}
                  onChange={(val) => {
                    form.setFieldValue("image_url", val);
                  }}
                />
        
                {form.values.image_url && (
                  <Box mt="sm">
                    <Image
                      src={form.values.image_url}
                      alt="Preview"
                      width={200}
                      height={200}
                    />
                  </Box>
                )}
              </Box>
        

        {categoriesQuery.isLoading ? (
          <Loader size="sm" />
        ) : (
          <Select
            label="Danh mục"
            data={
              categoriesQuery.data?.map((c: Category) => ({
                value: String(c.id),
                label: c.name,
              })) || []
            }
            {...form.getInputProps("categoryId")}
            searchable
          />
        )}

        {productsQuery.isLoading ? (
          <Loader size="sm" />
        ) : (
          <MultiSelect
            label="Sản phẩm liên kết"
            data={
              productsQuery.data?.map((p: Product) => ({
                value: String(p.id),
                label: p.name,
              })) || []
            }
            {...form.getInputProps("productIds")}
            searchable
          />
        )}

        <Select
          label="Trạng thái"
          data={[
            { value: "draft", label: "Nháp" },
            { value: "published", label: "Xuất bản" },
            { value: "scheduled", label: "Hẹn giờ" },
            { value: "archived", label: "Lưu trữ" },
          ]}
          {...form.getInputProps("status")}
        />

        <TextInput
          type="datetime-local"
          label="Ngày xuất bản"
          {...form.getInputProps("publishedAt")}
        />

        <MyTextEditor label="Nội dung" {...form.getInputProps("content")} />

        <Group justify="flex-end">
          <Button
            onClick={handleSave}
            loading={updateBlogMutation.isPending}
          >
            Cập nhật bài viết
          </Button>
        </Group>
      </Stack>
    </MyButtonModal>
  );
};

export default Blog_Update;
