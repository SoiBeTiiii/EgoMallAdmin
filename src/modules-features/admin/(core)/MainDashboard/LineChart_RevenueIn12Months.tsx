import { LineChart } from '@mantine/charts';
import { Group, Paper, Text } from '@mantine/core';

const data = [
    { month: '06/23', revenue: 79000000 },
    { month: '03/23', revenue: 106000000 },
    { month: '08/23', revenue: 70000000 },
    { month: '09/23', revenue: 86000000 },
    { month: '10/23', revenue: 93000000 },
    { month: '11/23', revenue: 79000000 },
    { month: '12/23', revenue: 106000000 },
    { month: '01/24', revenue: 170000000 },
    { month: '02/24', revenue: 135000000 },
    { month: '03/24', revenue: 70000000 },
    { month: '04/24', revenue: 86000000 },
    { month: '05/24', revenue: 93000000 },
];

interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;

    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            <Text fw={500} mb={5}>
                {isNaN(Date.parse(label)) ? label : new Date(label.replace(/(\d{2})\/(\d{2})/, '20$2-$1')).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
            </Text>
            {payload.map((item: any) => (
                <Text key={item.name} fz="sm">
                    Doanh thu: {formatCurrency(item.value)}
                </Text>
            ))}
        </Paper>
    );
}

let formatCurrency = (value: number): string => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

let formatCurrency2 = (value: number): string => {
    if (value >= 1000000000) {
        return `${(value / 1000000000).toFixed(1)} tỷ`;
    } else if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)} tr`;
    }
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export default function LineChart_RevenueIn12Months() {
    return (
        <>
            <Group>
                <Text mb={"50"}>Doanh thu 12 tháng gần nhất</Text>
                <LineChart
                    w={"100%"}
                    h={200}
                    data={data}
                    dataKey="month"
                    series={[
                        { name: 'revenue', color: 'indigo.6' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    curveType="linear"
                    yAxisLabel="Tổng doanh thu"
                    tickLine="y"
                    yAxisProps={{ width: 64, tickFormatter: (value: number) => formatCurrency2(value) }}
                />
            </Group>
        </>
    );
}