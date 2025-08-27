"use client";
import baseAxios from "@/api/baseAxios";
import { BarChart } from "@mantine/charts";
import { Group, Paper, Text, useMantineColorScheme } from "@mantine/core";
import { useEffect, useState } from "react";

interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>{label}</Text>
      {payload.map((item: any) => (
        <Text key={item.name} c={item.color} fz="sm">
          Số lượng: {item.value}
        </Text>
      ))}
    </Paper>
  );
}

export default function BarChart_ProductStatus() {
  const [data, setData] = useState([]);
  const colorTheme = useMantineColorScheme();

  useEffect(() => {
    const fetchProductStatus = async () => {
      try {
        const res = await baseAxios.get("/dashboard/statistics");
        const rawData = res.data.data.total_product_status_statistics;

        const formattedData = rawData.map((item: any) => ({
          course_status: item.label,
          amount: item.total,
          color: item.color,
        }));

        setData(formattedData);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu trạng thái sản phẩm:", err);
      }
    };

    fetchProductStatus();
  }, []);

  return (
    <Group w="100%" align="start">
      <Text mb="md" fw={600}>Trạng thái sản phẩm trong kho</Text>
      <BarChart
        h={250}
        w="90%"
        data={data}
        dataKey="course_status"
        series={[{ name: "amount", color: "color", label: "Số lượng" }]}
        tooltipProps={{
          content: ({ label, payload }) => (
            <ChartTooltip label={label} payload={payload} />
          ),
        }}
        yAxisLabel="Số lượng"
        yAxisProps={{ width: 64 }}
        maxBarWidth={64}
        tickLine="y"
        barProps={{
          label: {
            position: "top",
            value: "amount",
            fill: colorTheme.colorScheme === "dark" ? "gray" : "black",
          },
        }}
      />
    </Group>
  );
}
