"use client";

import { useEffect, useState } from "react";
import { LineChart } from "@mantine/charts";
import { Group, Paper, Text } from "@mantine/core";
import baseAxios from "@/api/baseAxios";

interface PromotionRevenueItem {
  month: string;
  total_revenue: number;
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
        {isNaN(Date.parse(label))
          ? label
          : new Date(label.replace(/(\d{2})\/(\d{2})/, "20$2-$1")).toLocaleDateString("vi-VN", {
              month: "long",
              year: "numeric",
            })}
      </Text>
      {payload.map((item: any) => (
        <Text key={item.name} fz="sm">
          Doanh thu: {formatCurrency(item.value)}
        </Text>
      ))}
    </Paper>
  );
}

const formatCurrency = (value: number): string => {
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

const formatCurrency2 = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)} tỷ`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)} tr`;
  }
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

export default function LineChart_TotalRevenueByDiscountIn3Months() {
  const [data, setData] = useState<{ month: string; revenue: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await baseAxios.get("/dashboard/statistics");
        const rawData: PromotionRevenueItem[] = res.data.data.promotion_revenue_last_3_months;

        const formattedData = rawData.map((item) => ({
          month: item.month,
          revenue: item.total_revenue,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu doanh thu khuyến mãi:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Group>
      <Text mb={"50"}>Doanh thu từ đơn hàng có áp dụng khuyến mãi (3 tháng qua)</Text>
      <LineChart
        w={"100%"}
        h={200}
        data={data}
        dataKey="month"
        series={[{ name: "revenue", color: "indigo.6" }]}
        tooltipProps={{
          content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
        }}
        curveType="linear"
        yAxisLabel="Tổng doanh thu"
        tickLine="y"
        yAxisProps={{
          width: 64,
          tickFormatter: (value: number) => formatCurrency2(value),
        }}
      />
    </Group>
  );
}
