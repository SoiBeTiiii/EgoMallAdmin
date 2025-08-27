import { useEffect, useMemo } from "react";
import { useForm } from "@mantine/form";
import {
  MyCheckbox,
  MySelect,
  MyTextArea,
  MyTextInput,
} from "aq-fe-framework/components";
import { Button, Group, Paper, Title, Box } from "@mantine/core";
import baseAxios from "@/api/baseAxios";
import { useQuery } from "@tanstack/react-query";
import slugify from "slugify";
import ImageUploaderBox from "@/components/ImageUploaderBox/products/ImageUploaderBox";
import ProductVariantsForm from "@/components/ProductVariantsForm";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";

interface Images {
  url: string | File;
}

interface VariantOption {
  id: number;
  name: string;
  value: string;
}

interface Category {
  id: number;
  name: string;
  options: { id: number; name: string }[];
  children?: Category[];
}

interface Variant {
  id?: number;
  sku: string;
  price: number;
  sale_price: number;
  quantity: number;
  is_active: boolean;
  option_transform?: {
    name: string;
    value: string;
  }[];
  options: {
    id: number;
    name: string;
    value: string;
  }[];
  images: Images[];
}

type OptionSelected = {
  id: number;
  name: string;
  values: string[];
};

interface ProductUpdate {
  id?: number;
  name: string;
  slug: string;
  category: string;
  is_active: boolean;
  brand: string;
  type_skin: string;
  description: string;
  image: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  variants: Variant[];
  option_selecteds?: OptionSelected[];
}

const flattenCategories = (categories: any[], level = 0, seen = new Set<string>()): { value: string; label: string }[] => {
  let result: { value: string; label: string }[] = [];
  categories.forEach((cat) => {
    const val = cat.id.toString();
    if (!seen.has(val)) {
      seen.add(val);
      const indent = "— ".repeat(level);
      result.push({ value: val, label: `${indent}${cat.name}` });
    }
    if (cat.children?.length > 0) {
      result = result.concat(flattenCategories(cat.children, level + 1, seen));
    }
  });
  return result;
};


export default function F_kep33um7fa_Update({ values }: { values: ProductUpdate }) {
  const form = useForm<ProductUpdate>({
    initialValues: {
      ...values,
      category: values.category.toString() ?? "",
      brand: values.brand?.toString() ?? "",
      type_skin: values.type_skin ?? "",       // thêm cái này
      description: values.description ?? "",   // thêm cái này
      image: values.image ?? "",               // thêm cái này
      name: values.name ?? "",                 // thêm cái này
      slug: values.slug ?? "",                 // thêm cái này
      variants: values.variants?.map((variant) => {
      const transformedOptions: VariantOption[] =
        variant.option_transform?.map(({ name, value }) => {
          const optionDef = values.option_selecteds?.find((opt) => opt.name === name);
          return {
            id: optionDef?.id ?? 0,
            name,
            value,
          };
        }) ?? [];

      return {
        ...variant,
        sku: variant.sku?.toString() ?? "",
        images: variant.images ?? [],
        options: transformedOptions,
      };
    }) ?? [],
    },
    validate: {},
  });
const leafCategories = (categories: any[]): { value: string; label: string }[] => {
  const result: { value: string; label: string }[] = [];
  const seen = new Set<string>();

  const traverse = (cats: any[]) => {
    cats.forEach((cat) => {
      if (cat.children?.length > 0) {
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

  const { data: brandOptions, isLoading: isLoadingBrands } = useQuery({
    queryKey: ["F_kep33um7fa_Update_brands"],
    queryFn: async () => {
      const res = await baseAxios.get("/brands");
      return (res.data.data || []).map((item: any) => ({
        value: item.id.toString(),
        label: item.name,
      }));
    },
  });

  const { data: categoryOptionsRaw, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["F_kep33um7fa_Update_categories"],
    queryFn: async () => {
      const res = await baseAxios.get("/categories");
      return res.data.data;
    },
  });

  const categoryOptions = useMemo(() => {
  if (!categoryOptionsRaw) return [];
  return leafCategories(categoryOptionsRaw);
}, [categoryOptionsRaw]);


  const selectedCategory = useMemo(() => {
    const selectedCatId = parseInt(form.values.category);
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

  const selectedCategoryValue = useMemo(() => {
    return categoryOptions.find((cat) => cat.value === form.values.category)?.value ?? "";
  }, [categoryOptions, form.values.category]);

  useEffect(() => {
      const name = form.values.name.trim();
      const generatedSlug = name ? slugify(name, { lower: true, strict: true }) : "";
      if (form.values.slug !== generatedSlug) {
        form.setFieldValue("slug", generatedSlug);
      }
    }, [form,form.values.name])

  return (
    <MyActionIconUpdate
      modalSize={"50%"}
      form={form}
      onSubmit={async (values) => {
        const {brand,category,option_selecteds, created_at, updated_at, ...rest} = values
        const payload = {
          ...rest,
          brand_id: parseInt(values.brand),
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
        const updatedVariants = res.data?.data?.variants || [];
        const optionSelectedMatch = res.data?.data?.option_selecteds || [];
        const transformed = updatedVariants.map((variant: Variant) => ({
          ...variant,
          options: (variant.option_transform || []).map((opt: any) => {
            const match = optionSelectedMatch.find((o: any) => o.name === opt.name);
            return {
              id: match?.id || 0,
              name: opt.name,
              value: opt.value,
            };
          }),
          images: variant.images || [],
        }));

        form.setFieldValue("variants", transformed);

        return res
      }}
    >
      <MyTextInput label="Tên" required {...form.getInputProps("name")} />
      <MyTextInput label="Slug" required {...form.getInputProps("slug")} />

      {!isLoadingCategories && (
        <MySelect
          data={categoryOptions}
          label="Danh mục"
          required
          disabled
          value={selectedCategoryValue}
        />
      )}

      <MyCheckbox label="Trạng thái" {...form.getInputProps("is_active", { type: "checkbox" })} />

      <MySelect
        data={brandOptions || []}
        label="Thương hiệu"
        required
        disabled={isLoadingBrands}
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
          onRemove={() => {
            form.setFieldValue("image", "");
          }}
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
            id: v.id,
            options: Object.entries(v.options).map(([id, value]) => {
              const optionDef = selectedCategory?.options.find((opt) => opt.id.toString() === id.toString());
              return {
                id: Number(id),
                name: optionDef?.name || "",
                value,
              };
            }),
          }));
          form.setFieldValue("variants", transformed);
        }}
        initialMode="edit"
/>

    </MyActionIconUpdate>
  );
}
