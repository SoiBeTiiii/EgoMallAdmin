"use client";
import baseAxios from '@/api/baseAxios';
import { LineChart } from '@mantine/charts';
import { Group, Paper, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

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
          : new Date(label.replace(/(\d{2})\/(\d{2})/, '20$2-$1')).toLocaleDateString('vi-VN', {
              month: 'long',
              year: 'numeric',
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

const formatCurrency = (value: number): string =>
  value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

const formatCurrencyShort = (value: number): string => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} tỷ`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} tr`;
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export default function LineChart_RevenueIn12Months() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const res = await baseAxios.get('/dashboard/statistics');
        const rawData = res.data.data.revenue_last_12_months;

        const formattedData = rawData.map((item: any) => ({
          month: item.month,
          revenue: item.total_revenue,
        }));

        setData(formattedData);
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu doanh thu:', err);
      }
    };

    fetchRevenueData();
  }, []);

  return (
    <Group w="100%" align="start">
      <Text mb="md" fw={600}>Doanh thu 12 tháng gần nhất</Text>
      <LineChart
        w="100%"
        h={250}
        data={data}
        dataKey="month"
        series={[{ name: 'revenue', color: 'indigo.6' }]}
        tooltipProps={{
          content: ({ label, payload }) => (
            <ChartTooltip label={label} payload={payload} />
          ),
        }}
        curveType="linear"
        yAxisLabel="Tổng doanh thu"
        tickLine="y"
        yAxisProps={{
          width: 64,
          tickFormatter: (value: number) => formatCurrencyShort(value),
        }}
      />
    </Group>
  );
}
