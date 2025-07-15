import baseAxios from "@/api/baseAxios";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MyButtonCreate, MyTextInput } from "aq-fe-framework/components";
import { Group, Paper, Title, Button, Flex, Box } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { notifications } from "@mantine/notifications";
import ImageUploaderBox from "@/components/ImageUploaderBox/products/ImageUploaderBox";

interface Category {
  id: number;
  name: string;
  options: { id: number; name: string }[];
  children?: Category[];
}

// Type ảnh
interface Image {
  url: string | File;
}

// Type biến thể
interface Variant {
  sku: number;
  price: number;
  sale_price: number;
  quantity: number;
  is_active: boolean;
  options: Record<string, string>;
  images: Image[];
}

// Type form
interface ProductCreate {
  id?: number;
  name: string;
  slug: string;
  category_id: string; // string để dùng cho Select
  is_active: boolean;
  brand_id: string;
  type_skin: string;
  description: string;
  image: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  variants: Variant[];
}

const flattenCategories = (categories: Category[], level = 0): { value: string; label: string }[] => {
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


export default function F_kep33um7fa_Create() {
  const disc = useDisclosure(false);
  const form = useForm<ProductCreate>({
    mode: "controlled",
    initialValues: {
      // id: 0,
      name: "",
      slug: "",
      category_id: "",
      is_active: false,
      brand_id: "",
      type_skin: "",
      description: "",
      image: "",
      deleted_at: "",
      created_at: "",
      updated_at: "",
      variants: [],
    },
  });

  // Fetch danh mục
  const { data: categoryOptionsRaw, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["F_kep33um7fa_Create_categories"],
    queryFn: async () => {
      const res = await baseAxios.get("/categories");
      return res.data.data;
    },
  });

  const categoryOptions = useMemo(() => {
    if (!categoryOptionsRaw) return [];
      return flattenCategories(categoryOptionsRaw);
  }, [categoryOptionsRaw]);

  // Fetch thương hiệu
  const { data: brandOptions, isLoading: isLoadingBrands } = useQuery({
    queryKey: ["F_kep33um7fa_Create_brands"],
    queryFn: async () => {
      const res = await baseAxios.get("/brands");
      return (res.data.data || []).map((item: any) => ({
        value: item.id.toString(),
        label: item.name,
      }));
    },
  });

  const [imageFile, setImageFile] = useState<string | null>(null);


  return (
    <MyButtonCreate
      label="Thêm"
      modalSize={"50%"}
      disclosure={disc}
      form={form}
      onSubmit={async (values) => {
        const payload = {
          ...values,
          category_id: parseInt(values.category_id),
          brand_id: parseInt(values.brand_id),
          variants: values.variants.map((v) => ({
            ...v,
            quantity: v.quantity || 0,
            options: v.options || {},
          })),
        };
        console.log("Payload gửi đi", payload);
        return await baseAxios.post("/products/create", payload);
      }}
    >
      <MyTextInput label="Tên" required {...form.getInputProps("name")} />
      <MyTextInput label="Slug" required {...form.getInputProps("slug")} />

      <MySelect
        data={categoryOptions || []}
        label="Danh mục"
        required
        disabled={isLoadingCategories}
        {...form.getInputProps("category_id")}
      />

      <MyCheckbox
        label="Trạng thái"
        {...form.getInputProps("is_active", { type: "checkbox" })}
      />

      <MySelect
        data={brandOptions || []}
        label="Thương hiệu"
        required
        disabled={isLoadingBrands}
        {...form.getInputProps("brand_id")}
      />

      <MyTextInput label="Loại da" {...form.getInputProps("type_skin")} />
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
              form.setFieldValue("image", val);
            }
          }}
          onRemove={() => {
            setImageFile(null);
            form.setFieldValue("image", "");
          }}
        />
      </Box>



      <Title order={4} mt="md">
        Danh sách biến thể
      </Title>

      {form.values.variants.map((_, index) => {
        const selectedCatId = parseInt(form.values.category_id);
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

        const selectedCategory = findCategoryById(categoryOptionsRaw || [], selectedCatId);

        return (
          <Paper key={index} withBorder p="md" radius="md" mb="md">
            <Group justify="space-between" mb="sm">
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

            <MyTextInput
              label="Số lượng"
              type="number"
              {...form.getInputProps(`variants.${index}.quantity`)}
            />
            <Box pb={6} mt="md">
              <MyCheckbox
                label="Hoạt động"
                {...form.getInputProps(`variants.${index}.is_active`, {
                  type: "checkbox",
                })}
              />
            </Box>


            {/* {Object.entries(
            typeof form.values.variants[index].options === "string"
              ? JSON.parse(form.values.variants[index].options)
              : form.values.variants[index].options || {}
          ).map(([optId, value]) => {
            const label =
              selectedCategory?.options.find((opt) => opt.id.toString() === optId)?.name || `Option ${optId}`;
            return (
              <MyTextInput
                key={optId}
                label={label}
                value={value as string}
                onChange={(event) => {
                  const newVariants = [...form.values.variants];
                  const currentOptions =
                    typeof newVariants[index].options === "string"
                      ? JSON.parse(newVariants[index].options)
                      : newVariants[index].options;

                  newVariants[index].options = {
                    ...currentOptions,
                    [optId]: event.currentTarget.value,
                  };
                  form.setFieldValue("variants", newVariants);
                }}
              />
            );
          })} */}

          {/* Render đúng 1 option duy nhất trong biến thể */}
            {(() => {
              const variantOptions = form.values.variants[index].options || {};
              const onlyOptionId = Object.keys(variantOptions)[0]; // mỗi biến thể có 1 option duy nhất
              const value = variantOptions[onlyOptionId];

              // Tìm category hiện tại
              const selectedCatId = parseInt(form.values.category_id);
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
              const selectedCategory = findCategoryById(categoryOptionsRaw || [], selectedCatId);

              if (!selectedCategory) return null;

              const label =
                selectedCategory.options.find((opt) => opt.id.toString() === onlyOptionId)?.name ||
                `Option ${onlyOptionId}`;

              return (
                <MyTextInput
                  key={onlyOptionId}
                  label={label}
                  value={value}
                  onChange={(event) => {
                    const newVariants = [...form.values.variants];
                    newVariants[index].options = {
                      [onlyOptionId]: event.currentTarget.value,
                    };
                    form.setFieldValue("variants", newVariants);
                  }}
                />
              );
            })()}



            <Title order={6} mt="sm" mb="xs">Ảnh biến thể</Title>
            <Group wrap="wrap" gap="md">
              {form.values.variants[index].images.map((img, imgIdx) => (
                <ImageUploaderBox
                  key={imgIdx}
                  img={img}
                  imgIdx={imgIdx}
                  label={"ảnh biến thể #" + (imgIdx + 1)}
                  uploadToken={`${process.env.NEXT_PUBLIC_UPLOAD_TOKEN}`}
                  onChange={(val) => {
                    const newVariants = [...form.values.variants];
                    newVariants[index].images[imgIdx] = { url: val };
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
              variant="light"
              size="xs"
              mt="xs"
              onClick={() => {
                const newVariants = [...form.values.variants];
                newVariants[index].images.push({ url: "" });
                form.setFieldValue("variants", newVariants);
              }}
            >
              + Thêm ảnh
            </Button>


          </Paper>
        );
      })}


      <Button
        fullWidth
        variant="light"
        mt="sm"
        onClick={() => {
        const selectedCatId = parseInt(form.values.category_id);

        if (!selectedCatId || isNaN(selectedCatId)) {
            notifications.show({
              title: 'Lỗi',
              message: 'Vui lòng chọn danh mục trước khi thêm biến thể.',
              color: 'red',
            });
            return;
        }
        const findCategoryById = (categories: Category[], id: number): Category | undefined => {
          for (const cat of categories) {
            if (cat.id === id) return cat;
            if (cat.children && cat.children.length > 0) {
              const found = findCategoryById(cat.children, id);
              if (found) return found;
            }
          }
          return undefined;
        };

        const selectedCategory = findCategoryById(categoryOptionsRaw || [], selectedCatId);

        selectedCategory?.options.forEach((opt) => {
          form.insertListItem("variants", {
            sku: "",
            price: 0,
            sale_price: 0,
            quantity: 0,
            is_active: true,
            options: { [opt.id]: "" }, // Mỗi biến thể chỉ có 1 option
            images: [],
          });
        });
      }}
      >
        + Thêm biến thể
      </Button>
    </MyButtonCreate>
  );
}
