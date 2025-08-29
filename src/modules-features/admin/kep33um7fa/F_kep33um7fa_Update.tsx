import { useEffect, useMemo } from "react";
import { useForm } from "@mantine/form";
import {
  MyCheckbox,
  MySelect,
  MyTextArea,
  MyTextInput,
} from "aq-fe-framework/components";
import { Box, Title } from "@mantine/core";
import baseAxios from "@/api/baseAxios";
import { useQuery } from "@tanstack/react-query";
import slugify from "slugify";
import ImageUploaderBox from "@/components/ImageUploaderBox/products/ImageUploaderBox";
import ProductVariantsForm from "@/components/ProductVariantsForm";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";

interface Images {
  url: string | File;
}
interface Variant {
  id?: number;
  sku: string;
  price: number;
  sale_price: number;
  quantity: number;
  is_active: boolean;
  option_transform?: { name: string; value: string }[];
  options: { id: number; name: string; value: string }[];
  images: Images[];
}
interface Category {
  id: number;
  name: string;
  options: { id: number; name: string }[];
  children?: Category[];
}
type OptionSelected = { id: number; name: string; values: string[] };
interface ProductUpdate {
  id?: number;
  name: string;
  slug: string;
  category: string | number;
  is_active: boolean;
  brand: string | number;
  type_skin: string;
  description: string;
  image: string;
  variants: Variant[];
  option_selecteds?: OptionSelected[];
}

const leafCategories = (categories: any[]): { value: string; label: string }[] => {
  const result: { value: string; label: string }[] = [];
  const seen = new Set<string>();

  const traverse = (cats: any[]) => {
    cats.forEach((cat) => {
      if (cat.children?.length > 0) {
        traverse(cat.children);
      } else {
        const val = String(cat.id ?? "");
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

export default function F_kep33um7fa_Update({ values }: { values: ProductUpdate }) {
  const form = useForm<ProductUpdate>({
    initialValues: {
      ...values,
      category: String(values.category ?? ""),
      brand: String(values.brand ?? ""),
      type_skin: values.type_skin ?? "",
      description: values.description ?? "",
      image: values.image ?? "",
      name: values.name ?? "",
      slug: values.slug ?? "",
      variants:
        values.variants?.map((variant) => ({
          ...variant,
          sku: String(variant.sku ?? ""),
          images: variant.images ?? [],
          options:
            variant.option_transform?.map(({ name, value }) => {
              const optionDef = values.option_selecteds?.find((opt) => opt.name === name);
              return {
                id: optionDef?.id ?? 0,
                name,
                value,
              };
            }) ?? [],
        })) ?? [],
    },
  });

  // Fetch brand + category
  const { data: brandOptions } = useQuery({
    queryKey: ["F_kep33um7fa_Update_brands"],
    queryFn: async () => {
      const res = await baseAxios.get("/brands");
      return (res.data.data || []).map((item: any) => ({
        value: String(item.id),
        label: item.name,
      }));
    },
  });

  const { data: categoryOptionsRaw } = useQuery({
    queryKey: ["F_kep33um7fa_Update_categories"],
    queryFn: async () => {
      const res = await baseAxios.get("/categories");
      return res.data.data;
    },
  });

  const categoryOptions = useMemo(
    () => (categoryOptionsRaw ? leafCategories(categoryOptionsRaw) : []),
    [categoryOptionsRaw]
  );

  // tìm category theo id
  const selectedCategory = useMemo(() => {
    const selectedCatId = Number(form.values.category);
    const findCategoryById = (categories: Category[], id: number): Category | undefined => {
      for (const cat of categories) {
        if (cat.id === id) return cat;
        if (cat.children?.length) {
          const found = findCategoryById(cat.children, id);
          if (found) return found;
        }
      }
      return undefined;
    };
    return findCategoryById(categoryOptionsRaw || [], selectedCatId);
  }, [categoryOptionsRaw, form.values.category]);

  const selectedCategoryValue = useMemo(
    () =>
      categoryOptions.find((cat) => cat.value === String(form.values.category))
        ?.value ?? "",
    [categoryOptions, form.values.category]
  );

  // auto slug
  useEffect(() => {
    const name = form.values.name?.trim() ?? "";
    const generatedSlug = name ? slugify(name, { lower: true, strict: true }) : "";
    if (form.values.slug !== generatedSlug) {
      form.setFieldValue("slug", generatedSlug);
    }
  }, [form.values.name]);

  return (
    <MyActionIconUpdate
      modalSize="50%"
      form={form}
      onSubmit={async (values) => {
        const { brand, category, option_selecteds, ...rest } = values;
        const payload = {
          ...rest,
          brand_id: Number(brand),
          category_id: Number(category),
          variants: values.variants.map((v) => ({
            id: v.id,
            sku: v.sku,
            price: v.price,
            sale_price: v.sale_price,
            quantity: v.quantity,
            is_active: v.is_active,
            images: v.images,
            options: Object.fromEntries(v.options.map((opt) => [opt.id, opt.value])),
          })),
        };
        const res = await baseAxios.put(`/products/${values.id}`, payload);
        return res;
      }}
    >
      <MyTextInput label="Tên" required {...form.getInputProps("name")} />
      <MyTextInput label="Slug" required {...form.getInputProps("slug")} />

      <MySelect
        data={categoryOptions}
        label="Danh mục"
        required
        value={selectedCategoryValue}
        disabled
      />

      <MyCheckbox label="Trạng thái" {...form.getInputProps("is_active", { type: "checkbox" })} />

      <MySelect
        data={brandOptions || []}
        label="Thương hiệu"
        required
        {...form.getInputProps("brand")}
      />

      <MyTextInput label="Loại da" {...form.getInputProps("type_skin")} />
      <MyTextArea label="Mô tả" {...form.getInputProps("description")} />

      <Box>
        <ImageUploaderBox
          img={{ url: form.values.image ?? "" }}
          label="Ảnh đại diện"
          width={200}
          height={200}
          previewShape="square"
          uploadToken={`${process.env.NEXT_PUBLIC_UPLOAD_TOKEN}`}
          showRemoveButton={!!form.values.image}
          onChange={(val) => {
            if (typeof val === "string") {
              form.setFieldValue("image", val);
            }
          }}
          onRemove={() => form.setFieldValue("image", "")}
        />
      </Box>

      <Title order={4} mt="md">
        Danh sách biến thể
      </Title>

      <ProductVariantsForm
        defaultVariants={form.values.variants.map((v) => ({
          ...v,
          options: Object.fromEntries(v.options.map((opt) => [opt.id, opt.value])),
        }))}
        options={selectedCategory?.options || []}
        onChange={(newVariants) => {
          const transformed = newVariants.map((v) => ({
            ...v,
            options: Object.entries(v.options).map(([id, value]) => {
              const optionDef = selectedCategory?.options.find(
                (opt) => String(opt.id) === String(id)
              );
              return { id: Number(id), name: optionDef?.name || "", value };
            }),
          }));
          form.setFieldValue("variants", transformed);
        }}
        initialMode="edit"
      />
    </MyActionIconUpdate>
  );
}
