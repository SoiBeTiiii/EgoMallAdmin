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
  TextInput,
  Tooltip,
  ActionIcon,
  PasswordInput,
} from "@mantine/core";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  AtSign,
  Key,
  Mail,
  Server,
  Shield,
  Hash,
  Link,
  Edit3,
  Check,
  X,
  Phone,
  MapPin,
  HardDrive,
  Globe,
} from "lucide-react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandTiktok,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";

// Custom Zalo Icon
const ZaloIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 48 48"
  >
    <path
      fill="#0068FF"
      d="M24 4C12.95 4 4 12.95 4 24c0 4.25 1.22 8.22 3.33 11.55L6 44l8.78-1.55C17.06 44.77 20.37 46 24 46c11.05 0 20-8.95 20-20S35.05 4 24 4z"
    />
    <text
      x="50%"
      y="58%"
      textAnchor="middle"
      fill="white"
      fontSize="12"
      fontFamily="Arial"
      fontWeight="bold"
    >
      Zalo
    </text>
  </svg>
);

interface SystemSetting {
  setting_key: string;
  setting_value: string;
  setting_type: "string" | "email" | "number" | "password";
  setting_group: string;
  setting_label: string;
  description?: string | null;
  updated_at: string;
}

interface SystemSettingsResponse {
  success: boolean;
  message: string;
  data: Record<string, SystemSetting>;
  code: number;
}

const fetchSystemSettings = async (): Promise<SystemSetting[]> => {
  const res = await baseAxios.get<SystemSettingsResponse>("/system-settings");
  return Object.values(res.data.data);
};

export default function SystemSettings_Read() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["system-settings"],
    queryFn: fetchSystemSettings,
  });

  const mutation = useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      return baseAxios.put("/system-settings", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["system-settings"] });
    },
  });

  // group by setting_group
  const grouped = useMemo(() => {
    if (!data) return {};
    return data.reduce<Record<string, SystemSetting[]>>((acc, item) => {
      if (!acc[item.setting_group]) acc[item.setting_group] = [];
      acc[item.setting_group].push(item);
      return acc;
    }, {});
  }, [data]);

  if (isLoading) return <Loader />;
  if (isError) return <Text c="red">Lỗi khi tải system settings!</Text>;

  // mapping icon theo key
  const getIcon = (key: string) => {
    const lower = key.toLowerCase();

    if (lower.includes("website") || lower.includes("domain"))
      return <Globe size={18} />;

    if (lower.includes("email")) return <Mail size={18} />;
    if (lower.includes("password")) return <Key size={18} />;
    if (lower.includes("host")) return <Server size={18} />;
    if (lower.includes("port")) return <Hash size={18} />;
    if (lower.includes("driver")) return <HardDrive size={18} />;
    if (lower.includes("phone") || lower.includes("hotline"))
      return <Phone size={18} />;
    if (lower.includes("address") || lower.includes("location"))
      return <MapPin size={18} />;

    // Social
    if (lower.includes("facebook")) return <IconBrandFacebook size={18} color="#1877F2" />;
    if (lower.includes("instagram")) return <IconBrandInstagram size={18} color="#E4405F" />;
    if (lower.includes("youtube")) return <IconBrandYoutube size={18} color="red" />;
    if (lower.includes("tiktok")) return <IconBrandTiktok size={18} />;
    if (lower.includes("linkedin")) return <IconBrandLinkedin size={18} color="#0A66C2" />;
    if (lower.includes("github")) return <IconBrandGithub size={18} />;
    if (lower.includes("zalo")) return <ZaloIcon size={18} />;

    if (lower.includes("encryption")) return <Shield size={18} />;
    if (lower.includes("url") || lower.includes("link")) return <Link size={18} />;

    return <AtSign size={18} />;
  };

  return (
    <Stack gap="xl">
      {Object.entries(grouped).map(([group, settings]) => (
        <Card key={group} shadow="sm" radius="lg" withBorder>
          <Title order={4} mb="md" tt="capitalize">
            {group} settings
          </Title>
          <Grid>
            {settings.map((item) => (
              <Grid.Col
                span={{ base: 12, sm: 6, md: 4 }}
                key={item.setting_key}
              >
                <SettingCard
                  item={item}
                  getIcon={getIcon}
                  onUpdate={(newValue) =>
                    mutation.mutate({ [item.setting_key]: newValue })
                  }
                />
              </Grid.Col>
            ))}
          </Grid>
        </Card>
      ))}
    </Stack>
  );
}

function SettingCard({
  item,
  getIcon,
  onUpdate,
}: {
  item: SystemSetting;
  getIcon: (key: string) => React.ReactNode;
  onUpdate: (newValue: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(item.setting_value);

  const isPassword = item.setting_type === "password";

  return (
    <Card padding="md" radius="md" shadow="xs" withBorder style={{ height: "100%" }}>
      <Group justify="space-between" mb="xs">
        <Group gap="xs">
          {getIcon(item.setting_key)}
          <Text fw={500}>{item.setting_label}</Text>
        </Group>
        <Badge color="blue" variant="light" size="sm">
          {item.setting_type}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed" mb="xs" lineClamp={2}>
        {item.description ?? "No description"}
      </Text>

      {!editing ? (
        <Group gap="xs" align="flex-start">
          <Tooltip label={item.setting_value} multiline maw={300}>
            <Text
              style={{
                flex: 1,
                wordBreak: "break-word",
                maxHeight: "3em",
                overflow: "hidden",
              }}
            >
              {isPassword ? "********" : item.setting_value || "—"}
            </Text>
          </Tooltip>
          <ActionIcon variant="subtle" onClick={() => setEditing(true)}>
            <Edit3 size={16} />
          </ActionIcon>
        </Group>
      ) : (
        <Group gap="xs">
          {isPassword ? (
            <PasswordInput
              value={value}
              onChange={(e) => setValue(e.currentTarget.value.replace(/\s/g, ""))}
              placeholder="Nhập mật khẩu..."
              style={{ flex: 1 }}
            />
          ) : (
            <TextInput
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
              placeholder="Nhập giá trị..."
              style={{ flex: 1 }}
            />
          )}
          <ActionIcon
            color="green"
            onClick={() => {
              onUpdate(value);
              setEditing(false);
            }}
          >
            <Check size={16} />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => {
              setValue(item.setting_value);
              setEditing(false);
            }}
          >
            <X size={16} />
          </ActionIcon>
        </Group>
      )}

      <Text size="xs" c="dimmed" mt="sm">
        Cập nhật: {dayjs(item.updated_at).format("YYYY-MM-DD HH:mm")}
      </Text>
    </Card>
  );
}
