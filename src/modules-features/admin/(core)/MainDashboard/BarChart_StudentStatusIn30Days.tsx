"use client";

import { useEffect, useState } from "react";
import { BarChart } from "@mantine/charts";
import { Group, Paper, Text, useMantineColorScheme } from "@mantine/core";
import baseAxios from "@/api/baseAxios";

interface OrderStatusStat {
  status: string;
  label: string;
  total: number;
  color: string;
}

interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>
        {label}
      </Text>
      {payload.map((item: any) => (
        <Text key={item.name} c={item.color} fz="sm">
          Số lượng: {item.value}
        </Text>
      ))}
    </Paper>
  );
}

export default function BarChart_StudentStatusIn30Days() {
  const colorTheme = useMantineColorScheme();
  const [data, setData] = useState<
    { student_status: string; amount: number; color: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await baseAxios.get("/dashboard/statistics");
        const rawData: OrderStatusStat[] = res.data.data.order_status_statistics;

        const formattedData = rawData.map((item) => ({
          student_status: item.label,
          amount: item.total,
          color: item.color,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu trạng thái đơn hàng:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Group>
      <Text mb={"50"}>Biểu đồ trạng thái đơn hàng trong 30 ngày qua</Text>
      <BarChart
        h={200}
        w={"90%"}
        data={data}
        dataKey="student_status"
        series={[{ name: "amount", color: "color", label: "Số lượng" }]}
        tooltipProps={{
          content: ({ label, payload }) => (
            <ChartTooltip label={label} payload={payload} />
          ),
        }}
        yAxisLabel="Tổng số đơn hàng"
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
