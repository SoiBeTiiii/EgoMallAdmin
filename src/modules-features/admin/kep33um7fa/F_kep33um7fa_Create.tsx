// File: CreateProductForm.tsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import slugify from "slugify";
import baseAxios from "@/api/baseAxios";
import { MyTextInput } from "aq-fe-framework/components";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import ImageUploaderBox from "@/components/ImageUploaderBox/products/ImageUploaderBox";
import ProductVariantsForm from "@/components/ProductVariantsForm";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";

interface Category {
  id: number;
  name: string;
  options: { id: number; name: string }[];
  children?: Category[];
}

interface Variant {
  sku: string;
  price: number;
  sale_price: number;
  quantity: number;
  is_active: boolean;
  options: Record<string, string>;
  images: { url: string | File }[];
}

// ✅ chỉ lấy những danh mục leaf (children = [])
const leafCategories = (categories: Category[]): { value: string; label: string }[] => {
  const result: { value: string; label: string }[] = [];
  const seen = new Set<string>();

  const traverse = (cats: Category[]) => {
    cats.forEach((cat) => {
      if (cat.children && cat.children.length > 0) {
        traverse(cat.children);
      } else {
        const val = cat.id.toString();
        if (!seen.has(val)) {
          seen.add(val);
          result.push({ value: val, label: cat.name });
        }
      }
    });
  };

  traverse(categories);
  return result;
};

const findCategoryById = (categories: Category[], id: string): Category | undefined => {
  for (const category of categories) {
    if (category.id.toString() === id) {
      return category;
    }
    if (category.children) {
      const found = findCategoryById(category.children, id);
      if (found) return found;
    }
  }
  return undefined;
};

export default function CreateProductForm() {
  const disc = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: "",
      slug: "",
      category_id: "",
      is_active: false,
      brand_id: "",
      type_skin: "",
      description: "",
      image: "",
      variants: [] as Variant[],
    },
    validate: {
    name: (value) => (value.trim().length === 0 ? "Tên sản phẩm không được để trống" : null),
    slug: (value) => (value.trim().length === 0 ? "Slug không được để trống" : null),
    category_id: (value) => (!value ? "Vui lòng chọn danh mục" : null),
    brand_id: (value) => (!value ? "Vui lòng chọn thương hiệu" : null),
    type_skin: (value) => (value.trim().length === 0 ? "Vui lòng nhập loại da" : null),
    description: (value) => (value.trim().length < 10 ? "Mô tả ít nhất 10 ký tự" : null),
    image: (value) => (!value ? "Vui lòng chọn ảnh đại diện" : null),
    variants: (value) => (value.length === 0 ? "Cần có ít nhất 1 biến thể" : null),
  },
});

  // ✅ tự động tạo slug từ name
  useEffect(() => {
    const name = form.values.name.trim();
    const generatedSlug = name ? slugify(name, { lower: true, strict: true }) : "";
    if (form.values.slug !== generatedSlug) {
      form.setFieldValue("slug", generatedSlug);
    }
  }, [form, form.values.name]);

  const [imageFile, setImageFile] = useState<string | null>(null);

  const { data: categoryData } = useQuery({
    queryKey: ["categories/create"],
    queryFn: async () => (await baseAxios.get("/categories?type=product")).data.data,
  });

  const { data: brandOptions } = useQuery({
    queryKey: ["brands/create"],
    queryFn: async () => {
      const res = await baseAxios.get("/brands");
      return res.data.data.map((item: any) => ({ value: item.id.toString(), label: item.name }));
    },
  });

  // ✅ chỉ lấy leaf categories (children = [])
  const flattenedCategories = useMemo(() => {
    return leafCategories(categoryData || []);
  }, [categoryData]);

  const selectedCategory = categoryData
    ? findCategoryById(categoryData, form.values.category_id)
    : undefined;

  const handleVariantsChange = useCallback(
    (variants: Variant[]) => {
      form.setFieldValue("variants", variants);
    },
    [form]
  );

  return (
    <MyButtonCreate
      label="Thêm sản phẩm"
      modalSize="80%"
      disclosure={disc}
      form={form}
      onSubmit={async (values) => {
        const payload = {
          ...values,
          category_id: parseInt(values.category_id),
          brand_id: parseInt(values.brand_id),
        };
        return await baseAxios.post("/products/create", payload);
      }}
    >
      <MyTextInput label="Tên sản phẩm" required {...form.getInputProps("name")} />
      <MyTextInput label="Slug" required {...form.getInputProps("slug")} />

      <MySelect
        label="Danh mục"
        data={flattenedCategories}
        required
        {...form.getInputProps("category_id")}
      />

      <MySelect
        label="Thương hiệu"
        data={brandOptions || []}
        required
        {...form.getInputProps("brand_id")}
      />

      <MyCheckbox label="Hoạt động" {...form.getInputProps("is_active", { type: "checkbox" })} />

      <MyTextInput label="Loại da" {...form.getInputProps("type_skin")} />
      <MyTextArea label="Mô tả" {...form.getInputProps("description")} />

      <Box my="md">
        <ImageUploaderBox
          img={{ url: imageFile ?? "" }}
          label="Ảnh đại diện"
          width={200}
          height={200}
          previewShape="square"
          uploadToken={process.env.NEXT_PUBLIC_UPLOAD_TOKEN!}
          showRemoveButton={!!imageFile}
          onChange={(val) => {
            if (typeof val === "string") {
              setImageFile(val);
              form.setFieldValue("image", val);
            }
          }}
          onRemove={() => {
            setImageFile(null);
            form.setFieldValue("image", "");
          }}
        />
      </Box>

      {!selectedCategory ? (
        <Box mt="md" c="dimmed">
          Vui lòng chọn danh mục trước để cấu hình biến thể.
        </Box>
      ) : (
        <ProductVariantsForm
          options={selectedCategory.options}
          enableEdit
          initialMode="generate"
          onChange={(variants) => {
            handleVariantsChange(variants);
          }}
        />
      )}
    </MyButtonCreate>
  );
}
