import { useQuery } from "@tanstack/react-query";
import { Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyTextInput } from "aq-fe-framework/components";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import baseAxios from "@/api/baseAxios";
import ImageUploaderBox from "@/components/ImageUploaderBox/users/ImageUploaderBox";
import { useState } from "react";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
export interface I_569re3pt0f_Create {
  name: string;
  email: string;
  phone: string;
  image: string;
  role_name: string;
  is_active: boolean;
  email_verified_at: string;
}
export default function F_569re3pt0f_Create() {
  const disc = useDisclosure(false)

  const form = useForm<I_569re3pt0f_Create>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      image: "",
      role_name: "",
      is_active: false,
      email_verified_at: "",
    },
  });

  // ✅ query role assignable
  const { data: roleOptions } = useQuery({
    queryKey: ["roles/assignable"],
    queryFn: async () => {
      const res = await baseAxios.get("roles-management/roles/assignable");
      return res.data.data.map((role: any) => ({
        value: role.name,        // hoặc role.id tùy backend yêu cầu
        label: role.display_name // hiện tiếng Việt đẹp hơn
      }));
    },
  });

  const [imageFile, setImageFile] = useState<string | null>(null);

  return (
    <MyButtonCreate
      label="Thêm"
      modalSize={"50%"}
      form={form}
      disclosure={disc}
      title="Chi tiết mục tiêu môn học"
      onSubmit={async () => {
        return await baseAxios.post("/users", form.values);
      }}
    >
      <MyTextInput label="Họ và tên" {...form.getInputProps("name")} />
      <MyTextInput label="Email" {...form.getInputProps("email")} />
      <MyTextInput label="Số điện thoại" {...form.getInputProps("phone")} />
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

      {/* ✅ thay bằng data từ API */}
      <MySelect
        label="Phân quyền"
        data={roleOptions || []}
        required
        {...form.getInputProps("role_name")}
      />

      <MyCheckbox label="Trạng thái" {...form.getInputProps("is_active", { type: "checkbox" })} />
      <MyTextInput label="Ngày xác nhận" {...form.getInputProps("email_verified_at")} />
    </MyButtonCreate>
  );
}
