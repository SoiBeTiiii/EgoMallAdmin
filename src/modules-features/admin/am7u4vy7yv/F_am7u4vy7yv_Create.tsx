'use client';
import { Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import baseAxios from "@/api/baseAxios";
import { MySelect, MyTextInput } from "aq-fe-framework/components";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import ImageUploaderBox from "@/components/ImageUploaderBox/categories/ImageUploaderBox";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import OptionsForm from "@/components/Options/page";
import slugify from "slugify";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";

export interface I_am7u4vy7yv_Create {
  id: number;
  name: string;
  slug: string;
  parent_id?: string;
  description?: string;
  thumbnail?: string;
  is_active: boolean;
  is_featured: boolean;
  type?: string;
  options?: number[];
  created_at: string;
  Create_at: string;
}

const flattenCategories = (
  categories: any[],
  level = 0
): { value: string; label: string }[] => {
  let result: { value: string; label: string }[] = [];

  categories.forEach((cat) => {
    const indent = "— ".repeat(level);
    result.push({
      value: cat.id.toString(),
      label: `${indent}${cat.name}`,
    });

    if (cat.children && cat.children.length > 0) {
      result = result.concat(flattenCategories(cat.children, level + 1));
    }
  });

  return result;
};

export default function F_am7u4vy7yv_Create() {
  const disc = useDisclosure(false);

  const form = useForm<I_am7u4vy7yv_Create>({
    initialValues: {
      id: 0,
      name: "",
      slug: "",
      is_active: false,
      is_featured: false,
      created_at: "",
      Create_at: "",
      options: [],
    },
    validate: {
      name: (value) =>
        value.trim().length > 0 ? null : "không được để trống",
      slug: (value) =>
        value.trim().length > 0 ? null : "không được để trống",
    },
  });

  // auto generate slug từ name
  useEffect(() => {
    const name = form.values.name.trim();
    const generatedSlug = name
      ? slugify(name, { lower: true, strict: true })
      : "";
    if (form.values.slug !== generatedSlug) {
      form.setFieldValue("slug", generatedSlug);
    }
  }, [form.values.name]);

  // Fetch danh mục
  const { data: categoryOptionsRaw, isLoading: isLoadingCategories } = useQuery(
    {
      queryKey: ["F_am7u4vy7yv_Create_categories"],
      queryFn: async () => {
        const res = await baseAxios.get("/categories");
        return res.data.data;
      },
    }
  );

  const categoryOptions = useMemo(() => {
    if (!categoryOptionsRaw) return [];
    const flat = flattenCategories(categoryOptionsRaw);
    // ✅ Loại bỏ value trùng nhau
    return Array.from(new Map(flat.map(opt => [opt.value, opt])).values());
  }, [categoryOptionsRaw]);

  const [imageFile, setImageFile] = useState<string | null>(null);

  return (
    <MyButtonCreate
      label="thêm"
      modalSize={"70%"}
      disclosure={disc}
      title="Thêm danh mục"
      form={form}
      onSubmit={async (values) => {
        const payload = {
          ...values,
          thumbnail: imageFile,
          is_active: values.is_active ? 1 : 0,
          is_featured: values.is_featured ? 1 : 0,
          parent_id: values.parent_id ? Number(values.parent_id) : null,
          variant_options: (values.options ?? []).map((id: number) => ({ id })), // ✅ chuẩn field
        };

        return await baseAxios.post("/categories/create", payload);
      }}
    >
      <MyTextInput required label="Tên" {...form.getInputProps("name")} />
      <MyTextInput required label="Slug" {...form.getInputProps("slug")} />
      
      <MySelect
        data={categoryOptions || []}
        label="Danh mục"
        required
        disabled={isLoadingCategories}
        {...form.getInputProps("parent_id")}
      />

      <MyTextArea label="Mô tả" {...form.getInputProps("description")} />

      <Box>
        <ImageUploaderBox
          img={{ url: imageFile ?? "" }}
          label="Ảnh đại diện"
          width={200}
          height={200}
          previewShape="square"
          uploadToken={`${process.env.NEXT_PUBLIC_UPLOAD_TOKEN}`}
          showRemoveButton={!!imageFile}
          onChange={(val) => {
            if (typeof val === "string") {
              setImageFile(val);
              form.setFieldValue("thumbnail", val);
            }
          }}
          onRemove={() => {
            setImageFile(null);
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
          onChange={(options) => {
            form.setFieldValue("options", options);
          }}
        />
      )}
    </MyButtonCreate>
  );
}
