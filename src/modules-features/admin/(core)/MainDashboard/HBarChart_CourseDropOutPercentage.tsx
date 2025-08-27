"use client";

import { useEffect, useState } from "react";
import { BarChart } from "@mantine/charts";
import { Group, Paper, Text, useMantineColorScheme } from "@mantine/core";
import baseAxios from "@/api/baseAxios";

interface LowStockProduct {
  variant_id: number;
  product_name: string;
  variant_values: string;
  quantity: number;
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
        <Text key={item.name} c="black" fz="sm">
          Số lượng còn lại: {item.value}
        </Text>
      ))}
    </Paper>
  );
}

export default function HBarChart_LowStockProducts() {
  const colorTheme = useMantineColorScheme();
  const [data, setData] = useState<
    { id: number; label: string; quantity: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await baseAxios.get("/dashboard/statistics");
        const raw: LowStockProduct[] = res.data.data.low_stock_products;

        const formatted = raw.map((item) => ({
          id: item.variant_id,
          label: `${item.product_name} (${item.variant_values})`,
          quantity: item.quantity,
        }));

        setData(formatted);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm sắp hết hàng:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Group>
      <Text mb={20}>Danh sách sản phẩm sắp hết hàng</Text>
      <BarChart
        h={data.length * 50}
        w="96%"
        data={data}
        dataKey="label"
        orientation="vertical"
        yAxisProps={{ width: 260 }}
        xAxisProps={{ domain: [0, "auto"] }}
        tooltipProps={{
          content: ({ label, payload }) => (
            <ChartTooltip label={label} payload={payload} />
          ),
        }}
        series={[
          {
            name: "quantity",
            color: "orange.6",
            label: "Số lượng tồn",
          },
        ]}
        barProps={{
          label: {
            position: "right",
            value: "amount",
            fill: colorTheme.colorScheme === "dark" ? "gray" : "black",
          },
        }}
        maxBarWidth={20}
        tickLine="x"
        yAxisLabel="Sản phẩm"
        xAxisLabel="Số lượng còn lại"
      />
    </Group>
  );
}
