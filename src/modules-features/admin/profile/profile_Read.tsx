"use client";
import { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  FileButton,
  Group,
  Loader,
  Modal,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"; // 👈 dùng axios trực tiếp
import { IconUser, IconPencil, IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

type Profile = {
  name: string;
  email: string;
  phone: string;
  image: string | File | null;
  role: string;
  permissions?: string[];
};

const API2 = process.env.NEXT_PUBLIC_API_2; // 👈 lấy từ .env

export default function ProfilePage() {
  const qc = useQueryClient();
  const [pwdOpened, setPwdOpened] = useState(false);

  // ===== READ PROFILE =====
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<Profile> => {
      const tokenData = localStorage.getItem("S0Auth");
      const token = tokenData ? JSON.parse(tokenData)?.state?.state?.token : null;

      const res = await axios.get(`${API2}user`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        withCredentials: true,
      });
      return res.data.data;
    },
  });

  // ===== FORM PROFILE =====
  const form = useForm<{
    name: string;
    email: string;
    phone: string;
    image: string | File | null;
    role: string;
  }>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      image: "",
      role: "",
    },
    validate: {
      name: (v) => (!v ? "Tên không được bỏ trống" : null),
    },
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        name: data.name ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        image: data.image ?? "",
        role: data.role ?? "",
      });
    }
  }, [data]);

  const isSuperAdmin =
    String(form.values.role).toLowerCase().replace(/_/g, "-") === "super-admin";

  // ===== UPDATE PROFILE =====
  const updateProfile = useMutation({
    mutationFn: async (
      partial: Partial<Profile> & { image?: string | File | null }
    ) => {
      const fd = new FormData();
      if (partial.name !== undefined) fd.append("name", partial.name);
      if (partial.phone !== undefined) fd.append("phone", partial.phone);
      if (partial.image && typeof partial.image !== "string")
        fd.append("image", partial.image);

      const tokenData = localStorage.getItem("S0Auth");
      const token = tokenData ? JSON.parse(tokenData)?.state?.state?.token : null;

      const res = await axios.post(`${API2}user`, fd, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      notifications.show({
        color: "green",
        title: "Thành công",
        message: "Đã lưu thay đổi.",
      });
      qc.invalidateQueries({ queryKey: ["profile"] });
      setEditField(null);
    },
    onError: (err: any) => {
      notifications.show({
        color: "red",
        title: "Lỗi",
        message: err?.response?.data?.message || "Cập nhật thất bại",
      });
    },
  });

  // ===== EDIT STATE =====
  const [editField, setEditField] = useState<"name" | "phone" | null>(null);

  // ===== CHANGE PASSWORD =====
  const pwdForm = useForm({
    initialValues: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    validate: {
      new_password_confirmation: (v, values) =>
        v !== values.new_password ? "Mật khẩu xác nhận không khớp" : null,
    },
  });

  const changePassword = useMutation({
    mutationFn: async (vals: typeof pwdForm.values) => {
      const tokenData = localStorage.getItem("S0Auth");
      const token = tokenData ? JSON.parse(tokenData)?.state?.state?.token : null;

      const res = await axios.post(`${API2}change-password`, vals, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      notifications.show({
        color: "green",
        title: "Thành công",
        message: "Đổi mật khẩu thành công!",
      });
      setPwdOpened(false);
      pwdForm.reset();
    },
    onError: (err: any) => {
      notifications.show({
        color: "red",
        title: "Lỗi",
        message: err?.response?.data?.message || "Đổi mật khẩu thất bại",
      });
    },
  });

  if (isLoading) return <Loader />;

  const perms = (data?.permissions ?? []) as string[];
  const notSuper = !isSuperAdmin;

  // ===== UI (giữ nguyên như code bạn) =====
  return (
        <>
            <Card shadow="md" p="xl" radius="lg" withBorder>
                <Group justify="space-between" mb="lg">
                    <Title order={2} c="teal">
                        Hồ sơ cá nhân
                    </Title>
                    <Button color="red" onClick={() => setPwdOpened(true)}>
                        Đổi mật khẩu
                    </Button>
                </Group>

                <Group align="flex-start" grow>
                    {/* Cột trái: Avatar */}
                    <Stack align="center" maw={260} miw={220}>
                        <Avatar
                            src={
                                form.values.image instanceof File
                                    ? URL.createObjectURL(form.values.image)
                                    : (form.values.image as string)
                            }
                            size={128}
                            radius="50%"
                            color="teal"
                        >
                            <IconUser size={64} />
                        </Avatar>

                        {/* {notSuper && ( */}
                            <FileButton
                                onChange={(file: File | null) =>
                                    file && updateProfile.mutate({ image: file })
                                }
                                accept="image/png,image/jpeg,image/webp"
                            >
                                {(props) => (
                                    <Button
                                        {...props}
                                        variant="light"
                                        loading={updateProfile.isPending}
                                    >
                                        Đổi ảnh
                                    </Button>
                                )}
                            </FileButton>
                        {/* )} */}

                        <Stack gap={2} ta="center">
                            <Text fw={600} size="lg">
                                {form.values.name}
                            </Text>
                            <Text size="sm" c="dimmed">
                                {form.values.role}
                            </Text>
                            <Text size="sm" c="dimmed">
                                {form.values.email}
                            </Text>
                        </Stack>
                    </Stack>

                    <Divider orientation="vertical" />

                    {/* Cột phải */}
                    <Stack flex={1} gap="lg">
                        {/* Họ và tên */}
                        <Stack gap={4}>
                            <Text fw={500}>Họ và tên</Text>
                            {editField === "name" ? (
                                <Group gap="xs">
                                    <TextInput {...form.getInputProps("name")} autoFocus />
                                    <Button
                                        color="green"
                                        size="xs"
                                        onClick={() =>
                                            updateProfile.mutate({ name: form.values.name })
                                        }
                                    >
                                        <IconCheck size={16} />
                                    </Button>
                                    <Button
                                        color="red"
                                        size="xs"
                                        onClick={() => setEditField(null)}
                                    >
                                        <IconX size={16} />
                                    </Button>
                                </Group>
                            ) : (
                                <Group>
                                    <Text>{form.values.name}</Text>
                                    {isSuperAdmin && (
                                        <Button
                                            variant="subtle"
                                            size="xs"
                                            onClick={() => setEditField("name")}
                                        >
                                            <IconPencil size={16} />
                                        </Button>
                                    )}
                                </Group>
                            )}
                        </Stack>

                        {/* Phone */}
                        <Stack gap={4}>
                            <Text fw={500}>Số điện thoại</Text>
                            {editField === "phone" ? (
                                <Group gap="xs">
                                    <TextInput {...form.getInputProps("phone")} autoFocus />
                                    <Button
                                        color="green"
                                        size="xs"
                                        onClick={() =>
                                            updateProfile.mutate({ phone: form.values.phone })
                                        }
                                    >
                                        <IconCheck size={16} />
                                    </Button>
                                    <Button
                                        color="red"
                                        size="xs"
                                        onClick={() => setEditField(null)}
                                    >
                                        <IconX size={16} />
                                    </Button>
                                </Group>
                            ) : (
                                <Group>
                                    <Text>{form.values.phone || "—"}</Text>
                                    {isSuperAdmin && (
                                        <Button
                                            variant="subtle"
                                            size="xs"
                                            onClick={() => setEditField("phone")}
                                        >
                                            <IconPencil size={16} />
                                        </Button>
                                    )}
                                </Group>
                            )}
                        </Stack>

                        {/* Email */}
                        <Stack gap={4}>
                            <Text fw={500}>Email</Text>
                            <Text>{form.values.email}</Text>
                        </Stack>

                        {/* Role */}
                        <Stack gap={4}>
                            <Text fw={500}>Vai trò</Text>
                            <Text>{form.values.role}</Text>
                        </Stack>

                        {/* Permissions cho admin/staff */}
                        {notSuper && (
                            <Stack gap="xs">
                                <Text fw={500}>Quyền</Text>
                                <Group gap="xs" wrap="wrap">
                                    {perms.length ? (
                                        perms.map((p) => (
                                            <Badge key={p} variant="light">
                                                {p}
                                            </Badge>
                                        ))
                                    ) : (
                                        <Text c="dimmed" size="sm">
                                            Không có quyền riêng
                                        </Text>
                                    )}
                                </Group>
                            </Stack>
                        )}
                    </Stack>
                </Group>
            </Card>

            {/* Modal đổi mật khẩu */}
            <Modal
                opened={pwdOpened}
                onClose={() => setPwdOpened(false)}
                title="Đổi mật khẩu"
            >
                <form onSubmit={pwdForm.onSubmit((v) => changePassword.mutate(v))}>
                    <Stack>
                        <PasswordInput
                            label="Mật khẩu cũ"
                            {...pwdForm.getInputProps("old_password")}
                        />
                        <PasswordInput
                            label="Mật khẩu mới"
                            {...pwdForm.getInputProps("new_password")}
                        />
                        <PasswordInput
                            label="Xác nhận mật khẩu mới"
                            {...pwdForm.getInputProps("new_password_confirmation")}
                        />
                        <Group justify="flex-end" mt="md">
                            <Button type="submit" loading={changePassword.isPending}>
                                Lưu thay đổi
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Modal>
        </>
    );
}
