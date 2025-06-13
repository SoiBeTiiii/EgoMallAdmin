"use client"
import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
    { course_status: 'Đang mở', amount: 55, color: 'blue.6' },
    { course_status: 'Hoàn thành', amount: 20, color: 'green.6' },
    { course_status: 'Đã hủy', amount: 10, color: 'red.6' },
    { course_status: 'Đã cấp chứng chỉ', amount: 15, color: 'orange.6' }
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

export default function BarChart_ExamStatus() {
    const colorTheme = useMantineColorScheme()
    return (
        <>
            <Group>
                <Text mb={"50"}>Biểu đồ phân tích trạng thái khóa thi</Text>
                <BarChart
                    h={200}
                    w={"90%"}
                    data={data}
                    dataKey="course_status"
                    series={[
                        { name: 'amount', color: 'color', label: 'Số lượng' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    yAxisLabel="Số lượng"
                    yAxisProps={{ width: 64 }}
                    maxBarWidth={64}
                    tickLine="y"
                    barProps={{
                        label: {
                            position: 'top',
                            value: 'amount',
                            fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        }
                    }}
                />
            </Group>
        </>
    );
}
