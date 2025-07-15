import { useMemo } from "react";
import { useForm } from "@mantine/form";
import {
  MyActionIconUpdate,
  MyCheckbox,
  MySelect,
  MyTextArea,
  MyTextInput,
} from "aq-fe-framework/components";
import { Button, Group, Paper, Title, Box } from "@mantine/core";
import baseAxios from "@/api/baseAxios";
import { useQuery } from "@tanstack/react-query";
import ImageUploaderBox from "@/components/ImageUploaderBox/products/ImageUploaderBox";

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
  options: VariantOption[];
  images: Images[];
}

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
}

const flattenCategories = (categories: any[], level = 0): { value: string; label: string }[] => {
  let result: { value: string; label: string }[] = [];
  categories.forEach((cat) => {
    const indent = "— ".repeat(level);
    result.push({ value: cat.id.toString(), label: `${indent}${cat.name}` });
    if (cat.children?.length > 0) {
      result = result.concat(flattenCategories(cat.children, level + 1));
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
      variants: values.variants?.map((variant) => ({
        ...variant,
        sku: variant.sku?.toString() ?? "",
        images: variant.images ?? [],
        options: variant.options ?? [],
      })) ?? [],
    },
    validate: {},
  });

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
    return flattenCategories(categoryOptionsRaw);
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

  return (
    <MyActionIconUpdate
      modalSize={"50%"}
      form={form}
      onSubmit={async (values) => {
        const payload = {
          ...values,
          brand_id: parseInt(values.brand),
          brand: undefined,
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
        return await baseAxios.put(`/products/${values.slug}`, payload);
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

      {form.values.variants.map((variant, index) => (
        <Paper key={index} withBorder p="md" radius="md" mb="md">
          <Group mb="sm">
            <Title order={5}>Biến thể #{index + 1}</Title>
            <Button
              color="red"
              variant="outline"
              size="xs"
              onClick={() => form.removeListItem("variants", index)}
            >
              Xoá
            </Button>
          </Group>

          <Group grow>
            <MyTextInput
              label="SKU"
              type="number"
              {...form.getInputProps(`variants.${index}.sku`)}
            />
            <MyTextInput
              label="Giá"
              type="number"
              {...form.getInputProps(`variants.${index}.price`)}
            />
            <MyTextInput
              label="Giá sale"
              type="number"
              {...form.getInputProps(`variants.${index}.sale_price`)}
            />
          </Group>

          <Group grow mt="sm">
            <MyTextInput
              label="Số lượng"
              type="number"
              {...form.getInputProps(`variants.${index}.quantity`)}
            />
            <MyCheckbox
              label="Hoạt động"
              {...form.getInputProps(`variants.${index}.is_active`, { type: "checkbox" })}
            />
          </Group>

          {variant.options?.map((opt, optIdx) => (
            <MyTextInput
              key={opt.id}
              label={opt.name}
              placeholder={`Nhập ${opt.name.toLowerCase()}`}
              value={opt.value}
              onChange={(event) => {
                const newVariants = [...form.values.variants];
                newVariants[index].options[optIdx].value = event.currentTarget.value;
                form.setFieldValue("variants", newVariants);
              }}
            />
          ))}

          <Title order={6} mt="sm" mb="xs">
            Ảnh biến thể
          </Title>
          <Group wrap="wrap" gap="md">
            {variant.images.map((img, imgIdx) => (
              <ImageUploaderBox
                key={imgIdx}
                img={img}
                imgIdx={imgIdx}
                label={`Ảnh biến thể #${imgIdx + 1}`}
                uploadToken={`${process.env.NEXT_PUBLIC_UPLOAD_TOKEN}`}
                onChange={(val) => {
                  const newVariants = [...form.values.variants];
                  newVariants[index].images[imgIdx] = { ...newVariants[index].images[imgIdx] ,url: val };
                  form.setFieldValue("variants", newVariants);
                }}
                onRemove={() => {
                  const newVariants = [...form.values.variants];
                  newVariants[index].images.splice(imgIdx, 1);
                  form.setFieldValue("variants", newVariants);
                }}
              />
            ))}
          </Group>

          <Button
          size="xs"
          mt="sm"
          onClick={() => {
            const newVariants = [...form.values.variants];
            newVariants[index].images.push({ url: "" });
            form.setFieldValue("variants", newVariants);
          }}
        >
          + Thêm ảnh
        </Button>
        </Paper>
      ))}

      <Button
        fullWidth
        variant="light"
        mt="sm"
        onClick={() => {
          if (!selectedCategory) return;

          // Mỗi option của danh mục sẽ tạo ra 1 biến thể riêng biệt
          const newVariants = selectedCategory.options.map((opt) => ({
            sku: "",
            price: 0,
            sale_price: 0,
            quantity: 0,
            is_active: true,
            images: [{ url: "" }],
            options: [
              {
                id: opt.id,
                name: opt.name,
                value: "",
              },
            ],
          }));

          // Thêm từng biến thể vào form
          newVariants.forEach((variant) => {
            form.insertListItem("variants", variant);
          });
        }}
      >
        + Thêm biến thể
      </Button>

    </MyActionIconUpdate>
  );
}
