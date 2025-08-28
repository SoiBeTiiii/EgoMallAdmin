'use client'

import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm } from "@mantine/form"
import baseAxios from "@/api/baseAxios"
import MyCheckbox from "@/components/Checkbox/MyCheckbox"
import { useEffect } from "react"
import MySelect from "@/components/Combobox/Select/MySelect"
import { useQuery } from "@tanstack/react-query"

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  image: string;
  role_name: string;           // 🔄 đổi từ role_name sang role_id
  is_active: boolean;
  email_verified_at: string;
  password?: string;
  role: {
    id: number;
    name: string;
    display_name: string;
  };
}

export default function F_569re3pt0f_Update({ values }: { values: IUser }) {
  const form = useForm<IUser>({
    initialValues: {
      ...values,
      is_active: Boolean(values.is_active),
    }
  })

  const { data: roleOptions } = useQuery({
    queryKey: ["roles/assignable"],
    queryFn: async () => {
      const res = await baseAxios.get("roles-management/roles/assignable");
      return res.data.data.map((role: any) => ({
        value: String(role.id),    // 🔄 value = role.id,            // 🔄 value = id
        label: role.display_name,  // hiện tiếng Việt
      }));
    },
  });

  useEffect(() => {
    console.log("Cập nhật form với values:", values)
    form.setValues({
      ...values,
      phone: values.phone ?? "",             // null -> ""
      email: values.email ?? "",
      name: values.name ?? "",
      role_name: values.role.name ?? "",   // ✅ lấy tên hiển thị
      email_verified_at: values.email_verified_at ?? "",
      is_active: Boolean(values.is_active),
    });

  }, [values])

  return (
    <MyActionIconUpdate
      form={form}
      onSubmit={async (values) => {
        console.log("Giá trị submit:", values)
        await baseAxios.post(`/users/${values.id}`, values)
      }}
    >
      <MyFlexColumn>
        <MyTextInput label="Họ và tên" {...form.getInputProps("name")} />
        <MyTextInput label="Email" {...form.getInputProps("email")} />
        <MyTextInput label="Số điện thoại" type="tel" {...form.getInputProps("phone")} />
        {/* 🔄 dùng role_id thay cho role_name */}
        <MySelect
          label="Phân quyền"
          {...form.getInputProps("role_name")}
          data={roleOptions || []}
        />
        <MyCheckbox
          label="Trạng thái"
          {...form.getInputProps("is_active", { type: "checkbox" })}
        />
        <MyTextInput label="Ngày xác nhận" {...form.getInputProps("email_verified_at")} />
      </MyFlexColumn>
    </MyActionIconUpdate>
  )
}
