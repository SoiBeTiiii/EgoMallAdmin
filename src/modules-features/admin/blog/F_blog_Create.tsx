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
import Image from "next/image";
import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor";
import slugify from "slugify";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import SingleImageUploader from "@/components/ImageUploaderBox/blogs/ImageUploaderBox";
// ↑ Đổi import cho đúng file uploader bạn gửi ở trên

const Blog_Create: React.FC = () => {
  const form = useForm({
    initialValues: {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      image_url: "", // ✅ sửa tên cho khớp với backend
      categoryId: null as string | null,
      status: "draft",
      publishedAt: "",
      productIds: [] as string[],
    },

    validate: {
      title: (value) =>
        !value.trim()
          ? "Tiêu đề là bắt buộc"
          : value.length > 255
          ? "Tiêu đề không được vượt quá 255 ký tự"
          : null,

      slug: (value) =>
        value && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
          ? "Slug không hợp lệ (chỉ chứa chữ thường, số và dấu -)"
          : null,

      content: (value) =>
        !value.trim() ? "Nội dung là bắt buộc" : null,

      categoryId: (value) =>
        !value ? "Danh mục là bắt buộc" : null,

      publishedAt: (value) => {
        if (!value) return null;
        return isNaN(Date.parse(value)) ? "Ngày xuất bản không hợp lệ" : null;
      },
    },
  });

  useEffect(() => {
    const name = form.values.title.trim();
    const generatedSlug = name ? slugify(name, { lower: true, strict: true }) : "";
    if (form.values.slug !== generatedSlug) {
      form.setFieldValue("slug", generatedSlug);
    }
  }, [form, form.values.title]);

  // Fetch categories
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await baseAxios.get("/categories");
      return res.data.data.filter((t: any) => t.type === "blog") || [];
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

  // Create blog mutation
  const createBlogMutation = useMutation({
    mutationFn: async () => {
      const fd = new FormData();
      fd.append("title", form.values.title.trim());
      fd.append(
        "slug",
        form.values.slug.trim() || slugify(form.values.title.trim())
      );
      fd.append("content", form.values.content);
      fd.append("excerpt", form.values.excerpt || "");
      if (form.values.image_url)
        fd.append("image_url", form.values.image_url); // ✅ dùng url
      if (form.values.categoryId)
        fd.append("category_id", form.values.categoryId);
      fd.append("status", form.values.status);
      if (form.values.publishedAt)
        fd.append("published_at", form.values.publishedAt);
      form.values.productIds.forEach((id) =>
        fd.append("product_ids[]", id)
      );

      return baseAxios.post("/blogs/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  });

  const handleSave = async () => {
    const validation = form.validate();
    if (validation.hasErrors) return;

    await createBlogMutation.mutateAsync();
    alert("Tạo bài viết thành công");
    form.reset();
  };

  return (
    <Stack gap="md">
      <MyTextInput
        label="Tiêu đề"
        required
        {...form.getInputProps("title")}
        onBlur={() =>
          form.setFieldValue("slug", slugify(form.values.title))
        }
      />

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
      ) : categoriesQuery.isError ? (
        <Text c="red">Lỗi tải danh mục</Text>
      ) : (
        <Select
          label="Danh mục"
          data={
            categoriesQuery.data?.map((c: any) => ({
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
      ) : productsQuery.isError ? (
        <Text c="red">Lỗi tải sản phẩm</Text>
      ) : (
        <MultiSelect
          label="Sản phẩm liên kết"
          data={
            productsQuery.data?.map((p: any) => ({
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
          loading={createBlogMutation.isPending}
        >
          Lưu bài viết
        </Button>
      </Group>
    </Stack>
  );
};

export default Blog_Create;
