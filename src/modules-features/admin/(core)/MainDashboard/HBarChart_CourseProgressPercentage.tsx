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
        <Text key={item.name} c={"black"} fz="sm">
          Tỉ lệ sản phẩm đã bán (%): {item.value}%
        </Text>
      ))}
    </Paper>
  );
}

export default function HBarChart_CourseprogressPercentage() {
  const [data, setData] = useState([]);
  const colorTheme = useMantineColorScheme();

  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const res = await baseAxios.get("/dashboard/statistics");
        const rawData = res.data.data.top_selling_products_last_3_months;

        const totalSold = rawData.reduce(
          (sum: number, item: any) => sum + item.total_sold,
          0
        );

        const chartData = rawData.map((item: any) => ({
          courseName: item.product_name,
          progress: totalSold > 0 ? Math.round((item.total_sold / totalSold) * 100) : 0,
        }));

        setData(chartData);
      } catch (error) {
        console.error("Failed to load top selling products", error);
      }
    };

    fetchTopSelling();
  }, []);

  return (
    <Group w="100%" align="start">
      <Text mb="md" fw={600}>
        Top sản phẩm bán chạy nhất trong 3 tháng qua
      </Text>
      <BarChart
        h={400}
        w="96%"
        data={data}
        dataKey="courseName"
        orientation="vertical"
        yAxisProps={{ width: 220 }}
        xAxisProps={{ domain: [0, 100] }}
        tooltipProps={{
          content: ({ label, payload }) => (
            <ChartTooltip label={label} payload={payload} />
          ),
        }}
        series={[{ name: "progress", color: "blue.6", label: "courseName" }]}
        barProps={{
          label: {
            position: "right",
            value: "amount",
            fill: colorTheme.colorScheme === "dark" ? "gray" : "black",
          },
        }}
        maxBarWidth={20}
        tickLine="x"
        yAxisLabel="Tên sản phẩm"
        xAxisLabel="Tỉ lệ bán ra (%)"
      />
    </Group>
  );
}
