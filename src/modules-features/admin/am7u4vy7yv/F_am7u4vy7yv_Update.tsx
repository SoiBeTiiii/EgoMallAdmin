'use client';

import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import ImageUploaderBox from "@/components/ImageUploaderBox/brands/ImageUploaderBox";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import OptionsForm from "@/components/Options/page";
import { Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MySelect, MyTextArea } from "aq-fe-framework/components";
import { useMemo } from "react";

export interface I_am7u4vy7yv_Update {
  id: number;
  name: string;
  slug: string;
  parent_id?: number; 
  description?: string;
  thumbnail?: string;
  is_active: boolean;
  is_featured: boolean;
  type?: string;
  created_at: string;
  options?: Array<number | { id: number; name: string }>;
}

const flattenCategories = (
  categories: any[],
  level = 0
): { value: string; label: string }[] => {
  let result: { value: string; label: string }[] = [];
  categories.forEach((cat) => {
    const indent = "— ".repeat(level);
    result.push({ value: String(cat.id), label: `${indent}${cat.name}` });
    if (cat.children?.length > 0) {
      result = result.concat(flattenCategories(cat.children, level + 1));
    }
  });
  return result;
};

export default function F_am7u4vy7yv_Update({ values }: { values: I_am7u4vy7yv_Update }) {
  // Map options từ API (object[] | number[]) -> number[]
  const initialOptionIds = useMemo<number[]>(() => {
    const arr = Array.isArray(values.options) ? values.options : [];
    return arr.map((o: any) => (typeof o === "number" ? o : o?.id)).filter(Boolean);
  }, [values.options]);

  useDisclosure(false);

  const form = useForm<
    Required<Omit<I_am7u4vy7yv_Update, "options" | "parent_id">> & {
      options: number[];
      parent_id?: string;
    }
  >({
    initialValues: {
      id: values.id,
      name: values.name || "",
      slug: values.slug || "",
      description: values.description ?? "",
      parent_id: values.parent_id != null ? String(values.parent_id) : "", // ✅ ép string
      thumbnail: values.thumbnail ?? "",
      is_active: !!values.is_active,
      is_featured: !!values.is_featured,
      type: values.type ?? "",
      created_at: values.created_at || "",
      options: initialOptionIds,
    },
    validate: {
      
      name: (value) => {
        if (!value.trim()) return "Tên danh mục là trường bắt buộc";
        if (value.length > 255) return "Tên danh mục không được vượt quá 255 ký tự.";
        return null;
      },
      slug: (value) => {
        if (!value.trim()) return "Slug danh mục là trường bắt buộc";
        if (value.length > 255) return "Slug không được vượt quá 255 ký tự.";
        return null; // check unique slug để backend xử lý
      },
      parent_id: (value) => {
        if (value && isNaN(Number(value))) return "Danh mục cha không hợp lệ";
        return null;
      },
      description: (value) => {
        if (value && typeof value !== "string") return "Mô tả danh mục phải là chuỗi";
        return null;
      },
      thumbnail: (value) => {
        if (!value) return null;
        try {
          new URL(value); // check url hợp lệ
        } catch {
          return "Hình của danh mục phải là url hợp lệ";
        }
        const regex = /\.(jpg|jpeg|png|gif|webp)$/i;
        if (!regex.test(value)) return "Hình danh mục phải có dạng jpeg, png, jpg, gif hoặc webp.";
        return null;
      },
      is_featured: (value) => {
        if (typeof value !== "boolean") return "Trường nổi bật phải là boolean";
        return null;
      },
      type: (value) => {
        if (!value) return null;
        if (!["product", "blog"].includes(value)) return "Loại danh mục không hợp lệ";
        return null;
      },
      options: (value, values) => {
        if (values.type === "product") {
          if (!Array.isArray(value)) return "Danh sách options phải là mảng";
          if (value.length === 0) return "Danh sách options phải có ít nhất 1 option";
          for (let i of value) {
            if (typeof i !== "number") return "Các options phải là số";
          }
        } else if (value && value.length > 0) {
          return "Trường options chỉ được sử dụng khi loại danh mục là sản phẩm";
        }
        return null;
      },
    },
  });


  // Danh mục
  const { data: categoryOptionsRaw } = useQuery({
    queryKey: ["F_am7u4vy7yv_Update_categories"],
    queryFn: async () => {
      const res = await baseAxios.get("/categories");
      return res.data.data;
    },
  });

  const categoryOptions = useMemo(() => {
    if (!categoryOptionsRaw) return [];
    const flat = flattenCategories(categoryOptionsRaw);
    // ✅ loại bỏ trùng value
    return Array.from(new Map(flat.map((opt) => [opt.value, opt])).values());
  }, [categoryOptionsRaw]);

  return (
    <MyActionIconUpdate
      form={form}
      onSubmit={async (vals) => {
        const payload = {
          ...vals,
          is_active: vals.is_active ? 1 : 0,
          is_featured: vals.is_featured ? 1 : 0,
          parent_id: vals.parent_id ? Number(vals.parent_id) : null, // ✅ convert lại số
          thumbnail: vals.thumbnail ?? "",
          type: vals.type ?? "",
          variant_options: (vals.options ?? []).map((id: number) => ({ id })),
        };

        await baseAxios.put(`/categories/${vals.id}`, payload);
      }}
    >
      <MyTextInput label="Tên" {...form.getInputProps("name")} />
      <MyTextInput label="Slug" {...form.getInputProps("slug")} />

      <MySelect
        data={categoryOptions || []}
        label="Danh mục"
        required
        {...form.getInputProps("parent_id")}
      />

      <MyTextArea label="Mô tả" {...form.getInputProps("description")} />

      <Box>
        <ImageUploaderBox
          img={{ url: form.values.thumbnail ?? "" }}
          label="Ảnh đại diện"
          width={200}
          height={200}
          previewShape="square"
          uploadToken={`${process.env.NEXT_PUBLIC_UPLOAD_TOKEN}`}
          showRemoveButton={!!form.values.thumbnail}
          onChange={(val) => {
            if (typeof val === "string") {
              form.setFieldValue("thumbnail", val);
            }
          }}
          onRemove={() => {
            form.setFieldValue("thumbnail", "");
          }}
        />
      </Box>

      <MyCheckbox
        label="Hiển thị"
        {...form.getInputProps("is_active", { type: "checkbox" })}
      />
      <MyCheckbox
        label="Danh mục nổi bật"
        {...form.getInputProps("is_featured", { type: "checkbox" })}
      />

      <MySelect
        label="Thuộc tính"
        required
        data={[
          { value: "product", label: "Sản phẩm" },
          { value: "blog", label: "Blogs" },
        ]}
        value={form.values.type}
        onChange={(val) => form.setFieldValue("type", val || "")}
      />

      <label htmlFor="options">Vui lòng chọn type để hiển thị options</label>

      {form.values.type === "product" && (
        <OptionsForm
          defaultOptions={form.values.options || []}
          onChange={(newOptions) => {
            form.setFieldValue("options", newOptions); // ✅ sửa đúng field
          }}
        />
      )}
    </MyActionIconUpdate>
  );
}
