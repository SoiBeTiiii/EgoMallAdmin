"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import baseAxios from "@/api/baseAxios";
import {
    Card,
    Group,
    Text,
    Loader,
    Title,
    Badge,
    Grid,
    Stack,
    List,
    Divider,
    Button,
    Modal,
    TextInput,
    MultiSelect,
    Tooltip,
    ScrollArea,
} from "@mantine/core";
import { ShieldCheck, Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface Role {
    id: number;
    name: string;
    display_name: string;
    perms: number[];
}

interface Permission {
    id: number;
    name: string;
    display_name: string;
}

interface RolesResponse {
    success: boolean;
    message: string;
    data: Role[];
    code: number;
}

interface PermissionsResponse {
    success: boolean;
    message: string;
    data: Permission[];
    code: number;
}

const fetchRoles = async (): Promise<Role[]> => {
    const res = await baseAxios.get<RolesResponse>(
        "/roles-management/roles/assignable"
    );
    return res.data.data;
};

const fetchPermissions = async (): Promise<Permission[]> => {
    const res = await baseAxios.get<PermissionsResponse>(
        "/roles-management/permissions"
    );
    return res.data.data;
};

export default function RoleManagement_Read() {
    const queryClient = useQueryClient();
    const {
        data: roles,
        isLoading: loadingRoles,
        isError: errorRoles,
    } = useQuery({ queryKey: ["roles"], queryFn: fetchRoles });

    const {
        data: permissions,
        isLoading: loadingPerms,
        isError: errorPerms,
    } = useQuery({ queryKey: ["permissions"], queryFn: fetchPermissions });

    // State cho Modal
    const [openedRoleModal, setOpenedRoleModal] = useState(false);
    const [openedPermModal, setOpenedPermModal] = useState(false);

    // State cho Role form
    const [roleIdEditing, setRoleIdEditing] = useState<number | null>(null);
    const [roleName, setRoleName] = useState("");
    const [roleDisplayName, setRoleDisplayName] = useState("");
    const [selectedPerms, setSelectedPerms] = useState<string[]>([]);

    // State cho Permission form (trong Modal Permission riêng)
    const [permIdEditing, setPermIdEditing] = useState<number | null>(null);
    const [permName, setPermName] = useState("");
    const [permDisplayName, setPermDisplayName] = useState("");

    // State cho Permission inline (trong Modal Role)
    const [newPerms, setNewPerms] = useState<
        { name: string; display_name: string }[]
    >([]);

    // API tạo Permission
    const createPermission = async (payload: {
        name: string;
        display_name: string;
    }) => {
        const res = await baseAxios.post("/roles-management/permissions", payload);
        return res.data.data as Permission;
    };

    // CREATE/UPDATE ROLE
    const createRole = useMutation({
        mutationFn: async () => {
            const createdPerms: Permission[] = [];
            for (const perm of newPerms) {
                if (perm.name && perm.display_name) {
                    const created = await createPermission(perm);
                    createdPerms.push(created);
                }
            }

            const allPermIds = [
                ...selectedPerms.map((id) => Number(id)),
                ...createdPerms.map((p) => p.id),
            ];

            if (roleIdEditing) {
                await baseAxios.put(`/roles-management/roles/${roleIdEditing}/permissions`, {
                    role: { name: roleName, display_name: roleDisplayName },
                    permissions: allPermIds,
                });
            } else {
                await baseAxios.post("/roles-management/roles", {
                    role: { name: roleName, display_name: roleDisplayName },
                    permissions: allPermIds,
                });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] });
            queryClient.invalidateQueries({ queryKey: ["permissions"] });
            setOpenedRoleModal(false);
            setRoleIdEditing(null);
            setRoleName("");
            setRoleDisplayName("");
            setSelectedPerms([]);
            setNewPerms([]);
        },
    });

    // DELETE ROLE
    const deleteRole = useMutation({
        mutationFn: (id: number) =>
            baseAxios.delete(`/roles-management/roles/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] });
        },
    });

    // CREATE/UPDATE PERMISSION
    const savePermission = useMutation({
        mutationFn: async () => {
            if (permIdEditing) {
                await baseAxios.put(`/roles-management/permissions/${permIdEditing}`, {
                    name: permName,
                    display_name: permDisplayName,
                });
            } else {
                await createPermission({
                    name: permName,
                    display_name: permDisplayName,
                });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["permissions"] });
            setOpenedPermModal(false);
            setPermIdEditing(null);
            setPermName("");
            setPermDisplayName("");
        },
    });

    // DELETE PERMISSION
    const deletePermission = useMutation({
        mutationFn: (id: number) =>
            baseAxios.delete(`/roles-management/permissions/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["permissions"] });
        },
    });

    if (loadingRoles || loadingPerms) return <Loader />;
    if (errorRoles || errorPerms)
        return <Text c="red">Lỗi khi tải dữ liệu!</Text>;

    return (
        <Stack gap="xl">
            {/* ROLES */}
            <Card shadow="sm" radius="lg" withBorder>
                <Group justify="space-between" mb="md">
                    <Title order={3}>Danh sách vai trò</Title>
                    <Button
                        leftSection={<Plus size={16} />}
                        onClick={() => {
                            setOpenedRoleModal(true);
                            setRoleIdEditing(null);
                        }}
                    >
                        Thêm vai trò
                    </Button>
                </Group>
                <Grid>
                    {roles?.map((role) => (
                        <Grid.Col span={{ base: 12, sm: 6, md: 6 }} key={role.id}>
                            <Card
                                padding="md"
                                radius="md"
                                shadow="xs"
                                withBorder
                                style={{ height: 230, display: "flex", flexDirection: "column" }}
                            >
                                <Group justify="space-between" mb="xs" align="flex-start">
                                    <Group>
                                        <Text fw={500}>{role.display_name}</Text>
                                        <Badge color="blue" variant="light" size="sm">
                                            {role.name}
                                        </Badge>
                                    </Group>
                                    <Group gap="xs">
                                        <Tooltip label="Chỉnh sửa vai trò">
                                            <Button
                                                size="xs"
                                                variant="subtle"
                                                onClick={() => {
                                                    setRoleIdEditing(role.id);
                                                    setRoleName(role.name);
                                                    setRoleDisplayName(role.display_name);
                                                    setSelectedPerms(
                                                        role.perms.map((id) => id.toString())
                                                    );
                                                    setOpenedRoleModal(true);
                                                }}
                                            >
                                                <Pencil size={14} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip label="Xóa vai trò">
                                            <Button
                                                size="xs"
                                                variant="subtle"
                                                color="red"
                                                onClick={() => deleteRole.mutate(role.id)}
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </Tooltip>
                                    </Group>
                                </Group>
                                <Text size="sm" c="dimmed" mb="xs">
                                    Quyền hạn:
                                </Text>
                                <ScrollArea h={100} scrollbarSize={6}>
                                    <List spacing="xs" icon={<ShieldCheck size={14} />}>
                                        {role.perms.map((permId) => {
                                            const perm = permissions?.find((p) => p.id === permId);
                                            return (
                                                <List.Item key={permId}>
                                                    {perm
                                                        ? `${perm.display_name} (${perm.name})`
                                                        : `Permission #${permId}`}
                                                </List.Item>
                                            );
                                        })}
                                    </List>
                                </ScrollArea>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            </Card>

            <Divider my="md" />

            {/* PERMISSIONS */}
            <Card shadow="sm" radius="lg" withBorder>
                <Group justify="space-between" mb="md">
                    <Title order={3}>Danh sách quyền hạn</Title>
                    <Button
                        leftSection={<Plus size={16} />}
                        onClick={() => {
                            setOpenedPermModal(true);
                            setPermIdEditing(null);
                        }}
                    >
                        Thêm quyền hạn
                    </Button>
                </Group>
                <Grid>
                    {permissions?.map((perm) => (
                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={perm.id}>
                            <Card padding="md" radius="md" shadow="xs" withBorder>
                                <Group justify="space-between" align="flex-start">
                                    <Group>
                                        <ShieldCheck size={18} />
                                        <Text fw={500}>{perm.display_name}</Text>
                                    </Group>
                                    <Group gap="xs">
                                        <Tooltip label="Chỉnh sửa quyền hạn">
                                            <Button
                                                size="xs"
                                                variant="subtle"
                                                onClick={() => {
                                                    setPermIdEditing(perm.id);
                                                    setPermName(perm.name);
                                                    setPermDisplayName(perm.display_name);
                                                    setOpenedPermModal(true);
                                                }}
                                            >
                                                <Pencil size={14} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip label="Xóa quyền hạn">
                                            <Button
                                                size="xs"
                                                variant="subtle"
                                                color="red"
                                                onClick={() => deletePermission.mutate(perm.id)}
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </Tooltip>
                                    </Group>
                                </Group>
                                <Text size="sm" c="dimmed">
                                    {perm.name}
                                </Text>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            </Card>

            {/* MODAL ROLE */}
            <Modal
                opened={openedRoleModal}
                onClose={() => setOpenedRoleModal(false)}
                title={roleIdEditing ? "Cập nhật vai trò" : "Thêm vai trò"}
                centered
            >
                <Stack>
                    <TextInput
                        label="Tên role"
                        placeholder="admin"
                        value={roleName}
                        onChange={(e) => setRoleName(e.currentTarget.value)}
                    />
                    <TextInput
                        label="Tên hiển thị"
                        placeholder="Quản trị viên"
                        value={roleDisplayName}
                        onChange={(e) => setRoleDisplayName(e.currentTarget.value)}
                    />
                    <MultiSelect
                        label="Chọn quyền hạn"
                        placeholder="Chọn nhiều quyền hạn"
                        data={
                            permissions?.map((p) => ({
                                value: p.id.toString(),
                                label: p.display_name,
                            })) || []
                        }
                        value={selectedPerms}
                        onChange={setSelectedPerms}
                        searchable
                        clearable
                    />

                    {/* Form tạo permission inline */}
                    <Stack gap="sm">
                        {newPerms.map((perm, idx) => (
                            <Group key={idx} grow>
                                <TextInput
                                    placeholder="Tên quyền (vd: manage_users)"
                                    value={perm.name}
                                    onChange={(e) => {
                                        const copy = [...newPerms];
                                        copy[idx].name = e.currentTarget.value;
                                        setNewPerms(copy);
                                    }}
                                />
                                <TextInput
                                    placeholder="Tên hiển thị (vd: Quản lý người dùng)"
                                    value={perm.display_name}
                                    onChange={(e) => {
                                        const copy = [...newPerms];
                                        copy[idx].display_name = e.currentTarget.value;
                                        setNewPerms(copy);
                                    }}
                                />
                            </Group>
                        ))}

                        <Button
                            variant="light"
                            leftSection={<Plus size={16} />}
                            onClick={() =>
                                setNewPerms((prev) => [
                                    ...prev,
                                    { name: "", display_name: "" },
                                ])
                            }
                        >
                            Thêm quyền hạn mới
                        </Button>
                    </Stack>

                    <Button onClick={() => createRole.mutate()} loading={createRole.isPending}>
                        {roleIdEditing ? "Cập nhật" : "Tạo"} vai trò
                    </Button>
                </Stack>
            </Modal>

            {/* MODAL PERMISSION */}
            <Modal
                opened={openedPermModal}
                onClose={() => setOpenedPermModal(false)}
                title={permIdEditing ? "Cập nhật quyền hạn" : "Thêm quyền hạn"}
                centered
            >
                <Stack>
                    <TextInput
                        label="Tên quyền"
                        placeholder="manage_users"
                        value={permName}
                        onChange={(e) => setPermName(e.currentTarget.value)}
                    />
                    <TextInput
                        label="Tên hiển thị"
                        placeholder="Quản lý người dùng"
                        value={permDisplayName}
                        onChange={(e) => setPermDisplayName(e.currentTarget.value)}
                    />
                    <Button
                        onClick={() => savePermission.mutate()}
                        loading={savePermission.isPending}
                    >
                        {permIdEditing ? "Cập nhật" : "Tạo"} quyền hạn
                    </Button>
                </Stack>
            </Modal>
        </Stack>
    );
}
